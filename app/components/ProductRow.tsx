import styles from './ProductRow.module.css';
import CartCounter from './CartCounter';
import { Product } from '../types';

interface ProductRowProps {
  product: Product;
  onChangeCartCounter?: (productId: number, count: number) => void;
  counter?: number;
}

export default function ProductRow({ product, onChangeCartCounter, counter }: ProductRowProps) {
  return (
    <div key={product.id} className={styles.productCard}>
      <div
        className={styles.productImage}
        style={{
          backgroundImage: `url(${product.image})`
        }}
      />

      <div className={styles.productInfo}>
        <h3 className={styles.productName}>
          {product.name}
        </h3>
        <p className={styles.productDescription}>
          {product.description}
        </p>
      </div>

      <div className={styles.ratingSection}>
        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`${styles.star} ${i < Math.floor(product.rating) ? styles.starFilled : styles.starEmpty}`}>
              ★
            </span>
          ))}
        </div>
        <span className={styles.ratingText}>
          {product.rating} ({product.reviews} reviews)
        </span>
      </div>

      <div className={styles.priceSection}>
        <div className={styles.priceContainer}>
          <span className={styles.currentPrice}>
            ${product.price}
          </span>
          <span className={styles.originalPrice}>
            ${product.originalPrice}
          </span>
        </div>
        <span className={styles.discountBadge}>
          {product.discount}% OFF
        </span>
      </div>

      <CartCounter
        initialCount={counter}
        onCountChange={(count) => {
          onChangeCartCounter?.(product.id, count);
        }}
      />
    </div>
  );
}