'use client';
import { useCart } from '@/context/CartContext';
import styles from './FloatingCart.module.css';
import Link from 'next/link';

export default function FloatingCart({ sessionId }: { sessionId?: string }) {
  const { items, total } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (itemCount === 0) return null;

  return (
    <Link href={`/cart${sessionId ? `?sessionId=${sessionId}` : ''}`} className={styles.fab}>
      <div className={styles.badge}>{itemCount}</div>
      <div style={{ fontWeight: 600 }}>View Cart • ₹{total}</div>
    </Link>
  );
}
