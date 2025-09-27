import Header from './components/Header';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Header currentPage="home" />

      <main className={styles.main}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Welcome to Shop
          </h1>
          <p className={styles.heroDescription}>
            Discover premium products with exceptional quality and style
          </p>
          <a href="/products" className={styles.heroButton}>
            Browse Products
          </a>
        </div>
      </main>
    </div>
  )
}