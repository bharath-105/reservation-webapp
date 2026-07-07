'use client';
import { useEffect, useState } from 'react';
import { getActiveSessionsWithOrders, closeSessionAndBill } from '@/actions/billing';

export default function CashierPOS() {
  const [sessions, setSessions] = useState<any[]>([]);

  const fetchSessions = async () => {
    const data = await getActiveSessionsWithOrders();
    setSessions(data);
  };

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckout = async (sessionId: string, method: string) => {
    if (confirm(`Close session and bill via ${method}?`)) {
      await closeSessionAndBill(sessionId, method);
      setSessions(sessions.filter(s => s.id !== sessionId));
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
      {sessions.length === 0 ? (
        <div style={{ opacity: 0.7, fontSize: '20px', gridColumn: '1 / -1' }}>No active tables.</div>
      ) : (
        sessions.map((session) => {
          const totalBill = session.orders.reduce((sum: number, o: any) => sum + o.totalAmount, 0);

          return (
            <div key={session.id} className="glass" style={{ padding: '32px', borderRadius: '24px', borderTop: `4px solid #a855f7` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 900 }}>Table {session.table.number}</h2>
                <span style={{ fontWeight: 'bold', fontSize: '24px', color: 'var(--primary)' }}>₹{totalBill}</span>
              </div>
              
              <div style={{ fontSize: '14px', marginBottom: '24px', opacity: 0.8 }}>
                Host: {session.host.name} <br/>
                Joined Guests: {session.orders.map((o: any) => o.user.name).filter((v: any, i: any, a: any) => a.indexOf(v) === i).length}
              </div>

              <div style={{ marginBottom: '24px', maxHeight: '200px', overflowY: 'auto' }}>
                {session.orders.map((order: any) => (
                  <div key={order.id} style={{ marginBottom: '12px', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '8px' }}>Order by {order.user.name}</div>
                    {order.items.map((item: any) => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span>{item.quantity}x {item.menuItem.name}</span>
                        <span>₹{item.menuItem.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  className="btn-primary" 
                  style={{ flex: 1, padding: '16px', fontSize: '16px', borderRadius: '12px', background: '#3b82f6' }}
                  onClick={() => handleCheckout(session.id, 'UPI')}
                >
                  Pay UPI
                </button>
                <button 
                  className="btn-primary" 
                  style={{ flex: 1, padding: '16px', fontSize: '16px', borderRadius: '12px', background: '#10b981' }}
                  onClick={() => handleCheckout(session.id, 'CARD')}
                >
                  Pay Card
                </button>
                <button 
                  className="btn-primary" 
                  style={{ flex: 1, padding: '16px', fontSize: '16px', borderRadius: '12px', background: '#f59e0b' }}
                  onClick={() => handleCheckout(session.id, 'CASH')}
                >
                  Pay Cash
                </button>
              </div>
            </div>
          )
        })
      )}
    </div>
  );
}
