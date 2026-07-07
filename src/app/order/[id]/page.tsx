'use client';

import { useEffect, useState, use } from 'react';
import { getOrder, submitRatings } from '@/actions/orders';
import { useRouter } from 'next/navigation';

export default function OrderStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchOrder = async () => {
      const data = await getOrder(resolvedParams.id);
      if (data) {
        setOrder(data);
        if (data.status === 'SERVED') {
          clearInterval(interval);
        }
      }
    };

    fetchOrder();
    interval = setInterval(fetchOrder, 3000);

    return () => clearInterval(interval);
  }, [resolvedParams.id]);

  const handleRatingSubmit = async () => {
    setIsSubmitting(true);
    const ratingsArray = Object.entries(ratings).map(([itemId, rating]) => ({ itemId, rating }));
    await submitRatings(ratingsArray);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (!order) return <div style={{ textAlign: 'center', marginTop: '140px' }}>Loading order status...</div>;

  if (order.status === 'PENDING' || order.status === 'ACCEPTED' || order.status === 'PREPARING' || order.status === 'READY') {
    return (
      <div className="glass" style={{ maxWidth: '600px', margin: '140px auto', padding: '64px 32px', textAlign: 'center', borderRadius: '24px' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>👨‍🍳</div>
        <h1 style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-1px', marginBottom: '16px' }}>Order Placed!</h1>
        <p style={{ opacity: 0.7, fontSize: '20px', marginBottom: '40px' }}>
          Status: <strong style={{ color: 'var(--primary)' }}>{order.status}</strong><br/>
          Your food is being prepared.
        </p>
        <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="glass" style={{ maxWidth: '600px', margin: '140px auto', padding: '64px 32px', textAlign: 'center', borderRadius: '24px' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>💖</div>
        <h1 style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-1px', marginBottom: '16px' }}>Thank You!</h1>
        <p style={{ opacity: 0.7, fontSize: '20px', marginBottom: '40px' }}>Your feedback helps us serve you better.</p>
        <button className="btn-primary" onClick={() => router.push(`/menu?sessionId=${order.sessionId}`)}>Order More</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '140px auto', padding: '0 24px' }}>
      <div className="glass" style={{ padding: '48px 32px', borderRadius: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>🍽️</div>
        <h1 style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-1px', marginBottom: '16px' }}>Order Served!</h1>
        <p style={{ opacity: 0.7, fontSize: '20px', marginBottom: '40px' }}>How did you like your meal?</p>
        
        <div style={{ textAlign: 'left', marginBottom: '40px' }}>
          {order.items.map((item: any) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 700 }}>{item.menuItem.name}</h3>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    onClick={() => setRatings({ ...ratings, [item.id]: star })}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      fontSize: '32px', 
                      cursor: 'pointer',
                      opacity: ratings[item.id] >= star ? 1 : 0.3
                    }}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button 
          className="btn-primary" 
          style={{ fontSize: '18px', padding: '16px 48px', width: '100%' }} 
          onClick={handleRatingSubmit}
          disabled={isSubmitting || Object.keys(ratings).length === 0}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Ratings'}
        </button>
      </div>
    </div>
  );
}
