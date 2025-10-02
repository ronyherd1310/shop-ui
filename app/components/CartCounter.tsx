'use client';

import { useState, useEffect } from 'react';
import styles from './CartCounter.module.css';

interface CartCounterProps {
  initialCount?: number;
  onCountChange?: (count: number) => void;
}

export default function CartCounter({ initialCount = 0, onCountChange }: CartCounterProps) {
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  const handleDecrement = () => {
    const newCount = Math.max(0, count - 1);
    setCount(newCount);
    onCountChange?.(newCount);
  };

  const handleAddToCart = () => {
    const newCount = 1;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  if (count === 0) {
    return (
      <button
        onClick={handleAddToCart}
        className={styles.addToCartButton}
      >
        Add to Cart
      </button>
    );
  }

  return (
    <div className={styles.counterContainer}>
      <button
        onClick={handleDecrement}
        className={styles.counterButton}
      >
        -
      </button>
      <span className={styles.counterValue}>
        {count}
      </span>
      <button
        onClick={handleIncrement}
        className={styles.counterButton}
      >
        +
      </button>
    </div>
  );
}