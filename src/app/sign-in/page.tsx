'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleAuth = async (isSignUp: boolean) => {
    setLoading(true);
    setError('');
    
    try {
      let result;
      if (isSignUp) {
        result = await supabase.auth.signUp({
          email,
          password,
        });
      } else {
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      if (result.error) throw result.error;
      
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign In / Sign Up</h2>
      
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email address" 
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            onClick={() => handleAuth(false)} 
            disabled={loading}
            className="btn-primary"
            style={{ flex: 1, padding: '10px' }}
          >
            {loading ? 'Processing...' : 'Sign In'}
          </button>
          
          <button 
            onClick={() => handleAuth(true)} 
            disabled={loading}
            style={{ flex: 1, padding: '10px', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
