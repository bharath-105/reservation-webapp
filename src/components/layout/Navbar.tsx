import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        BLR Cafe
      </Link>
      <div className={styles.links}>
        <Link href="/cashier" className={styles.link}>POS</Link>
        <Link href="/table?id=1" className="btn-primary" style={{ padding: '10px 20px', marginLeft: '16px', borderRadius: '10px', textDecoration: 'none' }}>
          Table Ordering
        </Link>
        <div style={{ marginLeft: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link href="/sign-in" className="btn-primary" style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', textDecoration: 'none' }}>
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
