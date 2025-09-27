'use client';

import Header from '../components/Header';
import ProductRow from '../components/ProductRow';
import useProducts from '../hooks/useProducts';
import styles from './page.module.css';

export default function ProductsPage() {
  const { products, loading, error } = useProducts();

  const handleOnChangeCartCounter = () => {
    return '';
  };

  return (
    <div className={styles.productsContainer}>
      <Header currentPage="products" />

      <main className={styles.main}>
        
        {loading ? (
          <div className={styles.loadingSection}>
            Loading products...
          </div>
        ) : error ? (
          <div className={styles.errorSection}>
            Error: {error}
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className={styles.promotionSection}>
          <h3 className={styles.promotionTitle}>
            Free Shipping on Orders Over $50
          </h3>
          <p className={styles.promotionDescription}>
            Get your products delivered to your doorstep with no extra cost
          </p>
          <button className={styles.promotionButton}>
            Shop Now
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>
            © 2024 Shop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}