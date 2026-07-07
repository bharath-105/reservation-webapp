'use client';
import styles from './MenuItem.module.css';
import { useCart } from '@/context/CartContext';

interface Props {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  calories: number;
  protein: number;
}

export default function MenuItem({ id, name, price, description, image, calories, protein }: Props) {
  const { addToCart } = useCart();

  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.details}>
        <div className={styles.title}>{name}</div>
        <div className={styles.price}>₹{price}</div>
        <div className={styles.macros}>
          <span className={styles.macroBadge}>🔥 {calories} kcal</span>
          <span className={styles.macroBadge}>🥩 {protein}g Protein</span>
        </div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.actions}>
        <button className={styles.addBtn} onClick={() => addToCart({ id, name, price, quantity: 1 })}>
          Add +
        </button>
      </div>
    </div>
  );
}
