'use client';

import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import useOrders from '../hooks/useOrders';
import useProducts from '../hooks/useProducts';
import styles from './page.module.css';

export default function OrderSummary() {
  const searchParams = useSearchParams();
  const tableNumber = searchParams.get('tableNumber') || '';

  const { orders, loading: ordersLoading, error: ordersError } = useOrders(tableNumber);
  const { products, loading: productsLoading } = useProducts();

  const loading = ordersLoading || productsLoading;
  const latestOrder = orders.length > 0 ? orders[orders.length - 1] : null;

  // Calculate totals
  const subtotal = latestOrder?.items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0) || 0;

  const total = subtotal;

  return (
    <div className={styles.orderSummaryContainer}>
      <Header currentPage="home" />

      <main className={styles.main}>
        {loading ? (
          <div className={styles.loadingSection}>
            Loading order summary...
          </div>
        ) : ordersError ? (
          <div className={styles.errorSection}>
            Error: {ordersError}
          </div>
        ) : (
          <div className={styles.summaryCard}>
            <h1 className={styles.title}>Order Summary</h1>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Customer Information</h2>
              <div className={styles.infoRow}>
                <span className={styles.label}>Name:</span>
                <span className={styles.value}>{latestOrder?.customerName || 'N/A'}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Email:</span>
                <span className={styles.value}>{latestOrder?.customerEmail || 'N/A'}</span>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Order Items</h2>
              <div className={styles.itemsList}>
                {latestOrder && latestOrder.items.length > 0 ? (
                  latestOrder.items.map((item, index) => {
                    const product = products.find(p => p.id === item.productId);
                    return (
                      <div key={index} className={styles.item}>
                        <div className={styles.itemDetails}>
                          <span className={styles.itemName}>{product?.name || `Product ${item.productId}`}</span>
                          <span className={styles.itemQuantity}>Qty: {item.quantity}</span>
                        </div>
                        <span className={styles.itemPrice}>
                          ${((product?.price || 0) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className={styles.item}>
                    <span className={styles.itemName}>No items in cart</span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Order Total</h2>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Subtotal:</span>
                <span className={styles.totalValue}>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Shipping:</span>
                <span className={styles.totalValue}>Free</span>
              </div>
              <div className={styles.totalRow + ' ' + styles.grandTotal}>
                <span className={styles.totalLabel}>Total:</span>
                <span className={styles.totalValue}>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.actions}>
              <a href="/" className={styles.backButton}>
                Continue Shopping
              </a>
              <button className={styles.placeOrderButton}>
                Place Order
              </button>
            </div>
          </div>
        )}
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