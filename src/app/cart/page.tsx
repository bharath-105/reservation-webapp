'use client';
import { useCart } from '@/context/CartContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { createOrder } from '@/actions/orders';

function CartContent() {
  const { items, removeFromCart, total, clearCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPlacing, setIsPlacing] = useState(false);

  const handleCheckout = async () => {
    const sessionId = searchParams.get('sessionId');
    if (!sessionId) {
      alert("No active session found. Please scan the table QR code.");
      router.push('/');
      return;
    }
    
    setIsPlacing(true);
    try {
      const orderId = await createOrder(sessionId, items);
      clearCart();
      router.push(`/order/${orderId}?sessionId=${sessionId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
      setIsPlacing(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '140px auto', padding: '0 24px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-1px', marginBottom: '40px' }}>Your Order</h1>
      
      {items.length === 0 ? (
        <div className="glass" style={{ padding: '64px 32px', textAlign: 'center', borderRadius: '24px' }}>
          <p style={{ fontSize: '20px', opacity: 0.7, marginBottom: '32px' }}>Your cart is empty.</p>
          <button className="btn-primary" onClick={() => router.push('/menu')}>Browse Menu</button>
        </div>
      ) : (
        <>
          <div className="glass" style={{ padding: '32px', borderRadius: '24px', marginBottom: '32px' }}>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700 }}>{item.name}</h3>
                  <div style={{ color: 'var(--primary)', fontWeight: 600, marginTop: '4px' }}>₹{item.price} x {item.quantity}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 700 }}>₹{item.price * item.quantity}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--primary)', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="glass" style={{ padding: '32px', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ opacity: 0.7, fontSize: '18px', marginBottom: '4px' }}>Total Amount</p>
              <h2 style={{ fontSize: '36px', fontWeight: 900 }}>₹{total}</h2>
            </div>
            <button className="btn-primary" style={{ fontSize: '18px', padding: '16px 48px' }} onClick={handleCheckout} disabled={isPlacing}>
              {isPlacing ? 'Placing...' : 'Place Order'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '140px' }}>Loading Cart...</div>}>
      <CartContent />
    </Suspense>
  );
}
