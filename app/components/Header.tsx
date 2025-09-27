import styles from './Header.module.css';

interface HeaderProps {
  currentPage?: 'home' | 'products';
}

export default function Header({ currentPage = 'home' }: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <h1 className={styles.logo}>
          Shop
        </h1>
        <div className={styles.navLinks}>
          <a href="/" className={`${styles.navLink} ${currentPage === 'home' ? styles.navLinkActive : ''}`}>
            Home
          </a>
          <a href="/products" className={`${styles.navLink} ${currentPage === 'products' ? styles.navLinkActive : ''}`}>
            Products
          </a>
        </div>
      </nav>
    </header>
  );
}