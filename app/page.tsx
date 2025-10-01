'use client';

import Header from './components/Header';
import ProductRow from './components/ProductRow';
import useProducts from './hooks/useProducts';
import useMutateOrders from './hooks/useMutateOrders';
import { Order } from './types';
import styles from './page.module.css';

export default function Home() {
  const { products, loading, error } = useProducts();
  const { createOrder } = useMutateOrders();

  const handleOnChangeCartCounter = async (productId: number, count: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    const tableNumber = searchParams.get('tableNumber') || '';

    console.log(`Product ${productId} count changed to: ${count}`);
    console.log('Table Number:', tableNumber);

    if (tableNumber) {
      const newOrder: Order = {
        customerName: tableNumber,
        customerEmail: tableNumber,
        items: [
          {
            productId: productId,
            quantity: count
          }
        ]
      };

      console.log('Order object created:', newOrder);

      const result = await createOrder(newOrder);
      if (result) {
        console.log('Order created successfully:', result);
      } else {
        console.log('Order creation failed');
      }
    } else {
      console.log('No table number provided, skipping order creation');
    }
  };

  const getCheckoutUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const tableNumber = searchParams.get('tableNumber');
    return tableNumber ? `/order-summary?tableNumber=${tableNumber}` : '/order-summary';
  };

  return (
    <div className={styles.homeContainer}>
      <Header currentPage="home" />

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
              <ProductRow
                key={product.id}
                product={product}
                onChangeCartCounter={handleOnChangeCartCounter}
              />
            ))}
          </div>
        )}
      </main>

      <div className={styles.stickyCheckout}>
        <div className={styles.checkoutContent}>
          <a href={getCheckoutUrl()} className={styles.checkoutButton}>
            Checkout
          </a>
        </div>
      </div>

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