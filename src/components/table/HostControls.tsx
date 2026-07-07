'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPendingRequests, resolveJoinRequest } from '@/actions/sessions';

export default function HostControls({ session }: { session: any }) {
  const [requests, setRequests] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Poll for pending join requests
    const interval = setInterval(async () => {
      const pending = await getPendingRequests(session.id);
      setRequests(pending);
    }, 2000);

    return () => clearInterval(interval);
  }, [session.id]);

  const handleResolve = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    await resolveJoinRequest(id, status);
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <div>
      <button className="btn-primary" style={{ marginBottom: '32px' }} onClick={() => router.push(`/menu?sessionId=${session.id}`)}>
        Open Menu
      </button>

      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '16px', textAlign: 'left' }}>
        <h3 style={{ marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
          Pending Join Requests {requests.length > 0 && <span style={{ background: 'var(--primary)', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', marginLeft: '8px' }}>{requests.length}</span>}
        </h3>
        
        {requests.length === 0 ? (
          <p style={{ opacity: 0.5, fontSize: '14px' }}>No pending requests.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {requests.map(req => (
              <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{req.user.name}</div>
                  <div style={{ fontSize: '12px', opacity: 0.6 }}>{req.user.phone || 'No phone'}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleResolve(req.id, 'APPROVED')} style={{ background: '#10b981', border: 'none', padding: '6px 12px', borderRadius: '6px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>Approve</button>
                  <button onClick={() => handleResolve(req.id, 'REJECTED')} style={{ background: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '6px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
