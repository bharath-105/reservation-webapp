import Link from 'next/link';

export default function RestaurantPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '140px auto', padding: '0 24px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '64px', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.1 }}>
        Our <span style={{ background: 'linear-gradient(135deg, #f43f5e, #f9a8d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Restaurant</span>
      </h1>
      <p style={{ opacity: 0.7, marginTop: '24px', fontSize: '22px', maxWidth: '600px', margin: '24px auto 0' }}>
        A modern twist on classic Bangalore pub culture.
      </p>
      
      <div className="glass" style={{ marginTop: '64px', padding: '48px', borderRadius: '24px', textAlign: 'left' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '36px', letterSpacing: '-1px' }}>The Vibe</h2>
        <p style={{ opacity: 0.8, lineHeight: 1.8, fontSize: '18px' }}>
          BLR Cafe is designed to be your neighborhood hangout, elevated to premium standards. With lush green interiors, open-air seating, and a bustling atmosphere, it's the perfect place to unwind after a long day in the city. Our menu features a mix of local favorites and contemporary dishes, paired perfectly with our extensive craft beverage selection.
        </p>
      </div>
      
      <div style={{ marginTop: '80px' }}>
        <Link href="/menu">
          <button className="btn-primary" style={{ fontSize: '18px', padding: '16px 32px' }}>Explore the Menu</button>
        </Link>
      </div>
    </div>
  );
}
