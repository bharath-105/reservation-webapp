import { requireRole } from '@/lib/auth';
import { redirect } from 'next/navigation';
import CashierPOS from './CashierPOS';

export const dynamic = 'force-dynamic';

export default async function CashierDashboard() {
  await requireRole(['CASHIER', 'ADMIN']);

  return (
    <div style={{ maxWidth: '1200px', margin: '140px auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-1px' }}>Cashier POS</h1>
        <div style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', padding: '8px 16px', borderRadius: '20px', fontWeight: 600, border: '1px solid rgba(168, 85, 247, 0.2)' }}>
          ● Billing Online
        </div>
      </div>
      
      <CashierPOS />
    </div>
  );
}
