import Image from 'next/image';
import styles from './Header.module.css';

interface HeaderProps {
  currentPage?: 'home';
}

export default function Header({ currentPage = 'home' }: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Image
            src="/images/Kawakibi_Logo_complex.png"
            alt="Kawakibi Cafe"
            width={250}
            height={250}
            priority
          />
        </div>
      </nav>
    </header>
  );
}