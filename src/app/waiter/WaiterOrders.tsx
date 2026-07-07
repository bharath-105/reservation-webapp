'use client';
import { useEffect, useState } from 'react';
import { getActiveOrders, updateOrderStatus } from '@/actions/orders';

export default function WaiterOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const data = await getActiveOrders();
    // Waiter only sees READY orders
    setOrders(data.filter(o => o.status === 'READY'));
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleServe = async (orderId: string) => {
    // Optimistic update
    setOrders(orders.filter(o => o.id !== orderId));
    await updateOrderStatus(orderId, 'SERVED');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
      {orders.length === 0 ? (
        <div style={{ opacity: 0.7, fontSize: '20px', gridColumn: '1 / -1' }}>No orders ready for pickup. Take a breather!</div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="glass" style={{ padding: '32px', borderRadius: '24px', borderTop: `4px solid #10b981` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 900 }}>Table {order.session.table.number}</h2>
            </div>
            
            <div style={{ fontSize: '16px', marginBottom: '24px', opacity: 0.8 }}>
              Ordered by: <span style={{ fontWeight: 'bold', opacity: 1 }}>{order.user.name}</span>
            </div>

            <ul style={{ listStyle: 'none', marginBottom: '32px', fontSize: '18px' }}>
              {order.items.map((item: any) => (
                <li key={item.id} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                  <span><strong style={{ color: 'var(--primary)' }}>{item.quantity}x</strong> {item.menuItem.name}</span>
                </li>
              ))}
            </ul>

            <button 
              className="btn-primary" 
              style={{ width: '100%', padding: '20px', fontSize: '20px', borderRadius: '16px' }}
              onClick={() => handleServe(order.id)}
            >
              ✅ Serve to Table
            </button>
          </div>
        ))
      )}
    </div>
  );
}
