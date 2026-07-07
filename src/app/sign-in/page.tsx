'use client';
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
  }, []);

  const sendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Format phone number to E.164 (Assuming India +91 for this demo if no country code provided)
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;

    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(confirmation);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to send OTP.');
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.render().then((widgetId: any) => {
          (window as any).grecaptcha.reset(widgetId);
        });
      }
    }
    setLoading(false);
  };

  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult) return;
    setLoading(true);
    setError('');

    try {
      const result = await confirmationResult.confirm(otp);
      const idToken = await result.user.getIdToken();
      
      // Send token to our server action to create a session cookie
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      });

      if (!res.ok) throw new Error('Failed to create session');

      const redirectUrl = new URLSearchParams(window.location.search).get('redirect_url') || '/table?id=1';
      router.push(redirectUrl);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Invalid OTP.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '140px auto', padding: '32px', textAlign: 'center' }} className="glass">
      <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px' }}>Sign In</h1>
      <p style={{ opacity: 0.7, marginBottom: '32px' }}>Enter your phone number to continue.</p>

      {error && <div style={{ color: '#ef4444', marginBottom: '16px' }}>{error}</div>}
      <div id="recaptcha-container"></div>

      {!confirmationResult ? (
        <form onSubmit={sendOTP}>
          <input 
            type="tel"
            placeholder="Phone Number (e.g. 9876543210)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', marginBottom: '16px', fontSize: '18px' }}
            required
          />
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px' }} disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={verifyOTP}>
          <input 
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', marginBottom: '16px', fontSize: '18px', letterSpacing: '4px', textAlign: 'center' }}
            maxLength={6}
            required
          />
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px' }} disabled={loading}>
            {loading ? 'Verifying...' : 'Verify & Login'}
          </button>
        </form>
      )}
    </div>
  );
}
