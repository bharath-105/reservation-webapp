import Link from "next/link";

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '140px 24px', textAlign: 'center' }}>
      
      <div style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '20px', color: 'var(--primary)', fontWeight: 600, fontSize: '14px', marginBottom: '24px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
        ✨ The New Era of Dining
      </div>

      <h1 style={{ fontSize: '72px', fontWeight: 900, marginBottom: '24px', letterSpacing: '-2px', lineHeight: 1.1 }}>
        Welcome to <br />
        <span style={{ background: 'linear-gradient(135deg, #f43f5e, #f9a8d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>BLR Cafe</span>
      </h1>
      
      <p style={{ fontSize: '22px', opacity: 0.7, maxWidth: '650px', margin: '0 auto', fontWeight: 400, lineHeight: 1.6 }}>
        The ultimate destination for craft beer, authentic local cuisine, and unforgettable nightlife experiences.
      </p>
      
      <div style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', width: '100%', maxWidth: '1100px' }}>
        
        <div className="glass" style={{ padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px', marginBottom: '24px', fontSize: '24px' }}>📱</div>
          <h2 style={{ fontSize: '28px', marginBottom: '12px' }}>Dine-In Ordering</h2>
          <p style={{ opacity: 0.7, marginBottom: '32px', flex: 1 }}>Scan the QR code at your table or click here to order food directly to your seat without waiting for a waiter.</p>
          <Link href="/table?id=1" style={{ width: '100%' }}>
            <button className="btn-primary" style={{ width: '100%' }}>Open Table Menu</button>
          </Link>
        </div>

        <div className="glass" style={{ padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px', marginBottom: '24px', fontSize: '24px' }}>🎸</div>
          <h2 style={{ fontSize: '28px', marginBottom: '12px' }}>Experiences</h2>
          <p style={{ opacity: 0.7, marginBottom: '32px', flex: 1 }}>Discover live jazz music, exclusive brewery tours, and VIP rooftop events happening every weekend.</p>
          <Link href="#" style={{ width: '100%' }}>
            <button className="btn-primary" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', boxShadow: 'none' }}>Explore Events</button>
          </Link>
        </div>

        <div className="glass" style={{ padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px', marginBottom: '24px', fontSize: '24px' }}>📍</div>
          <h2 style={{ fontSize: '28px', marginBottom: '12px' }}>Locations</h2>
          <p style={{ opacity: 0.7, marginBottom: '32px', flex: 1 }}>Find a BLR Cafe destination near you. Currently pouring in Indiranagar and Koramangala.</p>
          <Link href="#" style={{ width: '100%' }}>
            <button className="btn-primary" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', boxShadow: 'none' }}>View Destinations</button>
          </Link>
        </div>

      </div>
    </main>
  );
}
