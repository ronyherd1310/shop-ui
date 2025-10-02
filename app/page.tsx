'use client';

import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import ProductRow from './components/ProductRow';
import useProducts from './hooks/useProducts';
import useOrders from './hooks/useOrders';
import useMutateOrders from './hooks/useMutateOrders';
import { Order } from './types';
import styles from './page.module.css';

export default function Home() {
  const { products, loading, error } = useProducts();
  const { createOrder } = useMutateOrders();

  const [tableNumber, setTableNumber] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      return searchParams.get('tableNumber') || '';
    }
    return '';
  });

  const [checkoutUrl, setCheckoutUrl] = useState('/order-summary');
  const { orders } = useOrders(tableNumber);

  useEffect(() => {
    if (tableNumber) {
      setCheckoutUrl(`/order-summary?tableNumber=${tableNumber}`);
    }
  }, [tableNumber]);

  const productQuantities = useMemo(() => {
    if (orders.length === 0) return new Map<number, number>();

    const latestOrder = orders[orders.length - 1];
    return new Map(latestOrder.items.map(item => [item.productId, item.quantity]));
  }, [orders]);

  const handleOnChangeCartCounter = async (productId: number, count: number) => {
    if (typeof window === 'undefined') return;
    const searchParams = new URLSearchParams(window.location.search);
    const tableNumber = searchParams.get('tableNumber') || '';

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
            {
              products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  counter={productQuantities.get(product.id)}
                  onChangeCartCounter={handleOnChangeCartCounter}
                />
            ))}
          </div>
        )}
      </main>

      <div className={styles.stickyCheckout}>
        <div className={styles.checkoutContent}>
          <a href={checkoutUrl} className={styles.checkoutButton}>
            Checkout
          </a>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>
            © 2024 Kawakibi Cafe. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}