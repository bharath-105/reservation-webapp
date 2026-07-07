import MenuItem from '@/components/menu/MenuItem';
import FloatingCart from '@/components/cart/FloatingCart';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function MenuPage({ searchParams }: { searchParams: Promise<{ sessionId?: string }> }) {
  await requireAuth();

  const resolvedParams = await searchParams;
  const sessionId = resolvedParams.sessionId;
  if (!sessionId) {
    return <div style={{ textAlign: 'center', marginTop: '140px' }}>No session provided. Please scan the QR code on your table.</div>;
  }

  const categories = await prisma.category.findMany({
    include: {
      items: {
        where: { isAvailable: true }
      }
    }
  });

  return (
    <div style={{ maxWidth: '900px', margin: '140px auto 120px', padding: '0 24px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1 style={{ fontSize: '64px', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.1 }}>
          <span style={{ background: 'linear-gradient(135deg, #f43f5e, #f9a8d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Digital Menu</span>
        </h1>
        <p style={{ opacity: 0.6, fontSize: '18px', marginTop: '16px' }}>Curated flavors for the ultimate BLR Cafe experience.</p>
      </div>

      {categories.map((category) => (
        category.items.length > 0 && (
          <div key={category.id} style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '40px', marginBottom: '32px', letterSpacing: '-1px', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
              {category.name}
            </h2>
            
            <div style={{ marginBottom: '32px' }}>
              {category.items.map(item => (
                <MenuItem 
                  key={item.id} 
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  description={item.description || ''}
                  image={item.image || ''}
                  calories={item.calories || 0}
                  protein={item.protein || 0}
                />
              ))}
            </div>
          </div>
        )
      ))}

      <FloatingCart sessionId={sessionId} />
    </div>
  );
}
