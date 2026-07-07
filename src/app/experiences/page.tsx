import Link from 'next/link';

export default function ExperiencesPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '140px auto', padding: '0 24px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '64px', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.1 }}>
        <span style={{ background: 'linear-gradient(135deg, #f43f5e, #f9a8d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>BLR Cafe Experiences</span>
      </h1>
      <p style={{ opacity: 0.7, marginTop: '24px', fontSize: '22px', maxWidth: '600px', margin: '24px auto 0' }}>
        Discover curated tasting menus, live music nights, and exclusive rooftop parties.
      </p>
      
      <div style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
        <div className="glass" style={{ padding: '40px', borderRadius: '24px', textAlign: 'left' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', display: 'inline-block', padding: '16px', borderRadius: '16px', marginBottom: '24px', fontSize: '32px' }}>🎷</div>
          <h2 style={{ fontSize: '32px', marginBottom: '16px', letterSpacing: '-1px' }}>Live Jazz Fridays</h2>
          <p style={{ opacity: 0.7, fontSize: '18px', lineHeight: 1.6 }}>Enjoy our signature cocktails while listening to the best local jazz bands every Friday night. A true premium BLR experience.</p>
        </div>
        
        <div className="glass" style={{ padding: '40px', borderRadius: '24px', textAlign: 'left' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', display: 'inline-block', padding: '16px', borderRadius: '16px', marginBottom: '24px', fontSize: '32px' }}>🍻</div>
          <h2 style={{ fontSize: '32px', marginBottom: '16px', letterSpacing: '-1px' }}>Brewery Tours</h2>
          <p style={{ opacity: 0.7, fontSize: '18px', lineHeight: 1.6 }}>Go behind the scenes and see how we brew our famous craft beers. Taste fresh pours directly from the source.</p>
        </div>
      </div>
      
      <div style={{ marginTop: '80px' }}>
        <Link href="/menu">
          <button className="btn-primary" style={{ fontSize: '18px', padding: '16px 32px' }}>Browse Menu & Order</button>
        </Link>
      </div>
    </div>
  );
}
