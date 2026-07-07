'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { requestToJoin, getMyJoinStatus } from '@/actions/sessions';

export default function JoinRequestUI({ session }: { session: any }) {
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Poll for status
    const interval = setInterval(async () => {
      const currentStatus = await getMyJoinStatus(session.id);
      setStatus(currentStatus);
      
      if (currentStatus === 'APPROVED') {
        router.push(`/menu?sessionId=${session.id}`);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [session.id, router]);

  const handleRequest = async () => {
    setStatus('PENDING');
    await requestToJoin(session.id);
  };

  if (status === 'PENDING') {
    return (
      <div>
        <div style={{ marginBottom: '16px' }} className="spinner"></div>
        <p>Waiting for the host to approve your request...</p>
      </div>
    );
  }

  if (status === 'APPROVED') {
    return (
      <div>
        <p style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '16px' }}>Request Approved!</p>
        <button className="btn-primary" onClick={() => router.push(`/menu?sessionId=${session.id}`)}>
          Open Menu
        </button>
      </div>
    );
  }

  if (status === 'REJECTED') {
    return (
      <div>
        <p style={{ color: '#ef4444', fontWeight: 'bold' }}>The host declined your request.</p>
      </div>
    );
  }

  return (
    <div>
      <button className="btn-primary" onClick={handleRequest}>
        Request to Join Table
      </button>
    </div>
  );
}
