import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          <span className={styles.logo} aria-hidden>UT</span>
          <span className={styles.siteTitle}>UR Travel Expert</span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/packages" className={styles.navLink}>Packages</Link>
          <Link href="/destinations" className={styles.navLink}>Destinations</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
          <button className={styles.cta}>Book Now</button>
        </nav>

        {/* Mobile menu button (no JS here yet) */}
        <button className={styles.mobileMenuButton} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 7h16M4 12h16M4 17h16" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </header>
  );
}