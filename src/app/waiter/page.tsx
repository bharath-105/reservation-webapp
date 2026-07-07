import { requireRole } from '@/lib/auth';
import WaiterOrders from './WaiterOrders';

export const dynamic = 'force-dynamic';

export default async function WaiterDashboard() {
  await requireRole(['WAITER', 'ADMIN']);

  return (
    <div style={{ maxWidth: '1200px', margin: '140px auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-1px' }}>Waiter Dashboard</h1>
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '8px 16px', borderRadius: '20px', fontWeight: 600, border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          ● Service Online
        </div>
      </div>
      
      <WaiterOrders />
    </div>
  );
}
