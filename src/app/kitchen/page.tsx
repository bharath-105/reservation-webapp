import { requireRole } from '@/lib/auth';
import KitchenOrders from './KitchenOrders';

export const dynamic = 'force-dynamic';

export default async function KitchenPage() {
  await requireRole(['KITCHEN', 'ADMIN']);

  return (
    <div style={{ maxWidth: '1200px', margin: '140px auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-1px' }}>Live Kitchen POS</h1>
        <div style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', padding: '8px 16px', borderRadius: '20px', fontWeight: 600, border: '1px solid rgba(34, 197, 94, 0.2)' }}>
          ● System Online
        </div>
      </div>
      
      <KitchenOrders />
    </div>
  );
}
