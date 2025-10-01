import styles from './Header.module.css';

interface HeaderProps {
  currentPage?: 'home';
}

export default function Header({ currentPage = 'home' }: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <h1 className={styles.logo}>
          Kawakibi Cafe
        </h1>
      </nav>
    </header>
  );
}