import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.col}>
          <div className={styles.brand}>UR Travel Expert</div>
          <div>Plan. Book. Travel.</div>
          <div style={{ marginTop: 8, fontSize: 13, color: '#64748b' }}>
            Email: hello@urtravelexpert.in
            <br />
            Phone: +91-XXXXXXXXXX
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.links}>
            <Link href="/packages" className={styles.link}>Packages</Link>
            <Link href="/destinations" className={styles.link}>Destinations</Link>
            <Link href="/about" className={styles.link}>About</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.links}>
            <a className={styles.link} href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a className={styles.link} href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a className={styles.link} href="/privacy" >Privacy Policy</a>
          </div>
        </div>

        <div className={styles.copy}>© {new Date().getFullYear()} UR Travel Expert. All rights reserved.</div>
      </div>
    </footer>
  );
}