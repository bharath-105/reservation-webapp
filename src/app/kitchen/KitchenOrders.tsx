'use client';
import { useEffect, useState } from 'react';
import { getActiveOrders, updateOrderStatus } from '@/actions/orders';

export default function KitchenOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const data = await getActiveOrders();
    // Filter out READY and SERVED orders for the kitchen view
    setOrders(data.filter(o => ['PENDING', 'ACCEPTED', 'PREPARING'].includes(o.status)));
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    // Optimistic update
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    await updateOrderStatus(orderId, newStatus);
    
    // Remove if it's READY, since kitchen doesn't need to see ready orders (waiter handles them)
    if (newStatus === 'READY') {
      setTimeout(() => setOrders(prev => prev.filter(o => o.id !== orderId)), 1000);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
      {orders.length === 0 ? (
        <div style={{ opacity: 0.7, fontSize: '20px', gridColumn: '1 / -1' }}>No active orders. Kitchen is quiet!</div>
      ) : (
        orders.map((order, index) => (
          <div key={order.id} className="glass" style={{ padding: '32px', borderRadius: '24px', borderTop: `4px solid ${order.status === 'PREPARING' ? 'var(--primary)' : '#eab308'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800 }}>Table {order.session.table.number}</h2>
              <span style={{ opacity: 0.7, fontSize: '16px', alignSelf: 'center' }}>
                {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            
            <div style={{ fontSize: '14px', marginBottom: '24px', opacity: 0.8 }}>
              Ordered by: {order.user.name}
            </div>

            <ul style={{ listStyle: 'none', marginBottom: '32px', fontSize: '18px' }}>
              {order.items.map((item: any) => (
                <li key={item.id} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item.quantity}x {item.menuItem.name}</span>
                </li>
              ))}
            </ul>

            {order.status === 'PENDING' || order.status === 'ACCEPTED' ? (
              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '16px', background: '#eab308' }}
                onClick={() => handleStatusChange(order.id, 'PREPARING')}
              >
                Start Preparing
              </button>
            ) : (
              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '16px', background: '#10b981' }}
                onClick={() => handleStatusChange(order.id, 'READY')}
              >
                Mark as Ready
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
