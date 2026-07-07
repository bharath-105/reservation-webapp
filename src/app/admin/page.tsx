import { requireRole } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  await requireRole(['ADMIN']);

  const payments = await prisma.payment.findMany();
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  const activeSessions = await prisma.tableSession.count({ where: { status: 'ACTIVE' } });
  const completedSessions = await prisma.tableSession.count({ where: { status: 'COMPLETED' } });

  const categoriesCount = await prisma.category.count();
  const menuItemsCount = await prisma.menuItem.count();

  return (
    <div style={{ maxWidth: '1200px', margin: '140px auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-1px' }}>Admin Overview</h1>
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '8px 16px', borderRadius: '20px', fontWeight: 600, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          ● Master Admin
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <div className="glass" style={{ padding: '32px', borderRadius: '24px', textAlign: 'center' }}>
          <div style={{ opacity: 0.7, fontSize: '18px', marginBottom: '8px' }}>Total Revenue</div>
          <div style={{ fontSize: '48px', fontWeight: 900, color: 'var(--primary)' }}>₹{totalRevenue}</div>
        </div>

        <div className="glass" style={{ padding: '32px', borderRadius: '24px', textAlign: 'center' }}>
          <div style={{ opacity: 0.7, fontSize: '18px', marginBottom: '8px' }}>Active Tables</div>
          <div style={{ fontSize: '48px', fontWeight: 900, color: '#3b82f6' }}>{activeSessions}</div>
        </div>

        <div className="glass" style={{ padding: '32px', borderRadius: '24px', textAlign: 'center' }}>
          <div style={{ opacity: 0.7, fontSize: '18px', marginBottom: '8px' }}>Completed Tables</div>
          <div style={{ fontSize: '48px', fontWeight: 900, color: '#10b981' }}>{completedSessions}</div>
        </div>

        <div className="glass" style={{ padding: '32px', borderRadius: '24px', textAlign: 'center' }}>
          <div style={{ opacity: 0.7, fontSize: '18px', marginBottom: '8px' }}>Menu Items</div>
          <div style={{ fontSize: '48px', fontWeight: 900, color: '#a855f7' }}>{menuItemsCount}</div>
        </div>
      </div>

      <div className="glass" style={{ padding: '32px', borderRadius: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn-primary" style={{ padding: '16px 32px' }}>Manage Menu</button>
          <button className="btn-primary" style={{ padding: '16px 32px', background: 'transparent', border: '1px solid var(--primary)', color: 'white' }}>Manage Inventory</button>
          <button className="btn-primary" style={{ padding: '16px 32px', background: 'transparent', border: '1px solid var(--primary)', color: 'white' }}>View Audit Logs</button>
        </div>
      </div>
    </div>
  );
}
