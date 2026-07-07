import Link from 'next/link';

export default function DestinationsPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '140px auto', padding: '0 24px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '64px', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.1 }}>
        <span style={{ background: 'linear-gradient(135deg, #f43f5e, #f9a8d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Destinations</span>
      </h1>
      <p style={{ opacity: 0.7, marginTop: '24px', fontSize: '22px', maxWidth: '600px', margin: '24px auto 0' }}>
        Find a BLR Cafe near you.
      </p>
      
      <div style={{ marginTop: '64px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass" style={{ padding: '32px', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '28px', letterSpacing: '-1px' }}>Indiranagar</h3>
            <p style={{ opacity: 0.7, marginTop: '8px', fontSize: '18px' }}>100 Feet Road, HAL 2nd Stage, Bangalore</p>
          </div>
          <Link href="/table?id=1"><button className="btn-primary" style={{ padding: '16px 32px' }}>Order Here</button></Link>
        </div>

        <div className="glass" style={{ padding: '32px', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '28px', letterSpacing: '-1px' }}>Koramangala</h3>
            <p style={{ opacity: 0.7, marginTop: '8px', fontSize: '18px' }}>80 Feet Road, 4th Block, Bangalore</p>
          </div>
          <Link href="/table?id=2"><button className="btn-primary" style={{ padding: '16px 32px' }}>Order Here</button></Link>
        </div>
      </div>
    </div>
  );
}
