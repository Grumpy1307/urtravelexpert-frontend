import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>UR Travel Expert 🌍</h1>
      <p className={styles.subtitle}>
        Discover breathtaking destinations, plan perfect holidays, and book your next adventure with ease.
      </p>
      <button className={styles.cta}>Get Started</button>
    </section>
  );
}