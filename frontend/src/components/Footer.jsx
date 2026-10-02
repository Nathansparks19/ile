import { Link } from 'react-router-dom'
import Logo from './Logo'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`il-wrap ${styles.inner}`}>
        <div className={styles.brand}>
          <Logo />
          <p>Ilé means <em>home</em> in Yoruba. We're building a fairer way to rent in Nigeria.</p>
        </div>
        <ul className={styles.links}>
          <li><Link to="/#how">How it works</Link></li>
          <li><Link to="/#landlords">For landlords</Link></li>
          <li><Link to="/#faq">Questions</Link></li>
          <li><Link to="/waitlist">Join the waitlist</Link></li>
        </ul>
      </div>
      <div className={`il-wrap ${styles.base}`}>
        <p>© {new Date().getFullYear()} Ilé. Launching soon.</p>
        <p>Built by <a href="https://nathansparks.dev" target="_blank" rel="noopener noreferrer">Nwankwonta Chiemena</a></p>
      </div>
    </footer>
  )
}
