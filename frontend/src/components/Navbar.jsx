import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import styles from './Navbar.module.css'

const links = [
  { label: 'How it works', to: '/#how' },
  { label: 'For landlords', to: '/#landlords' },
  { label: 'Questions', to: '/#faq' },
]

export default function Navbar({ showCta = true }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className={styles.bar}>
      <nav className={`il-wrap ${styles.inner}`} aria-label="Main">
        <span onClick={close}><Logo /></span>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="ile-menu"
          onClick={() => setOpen(o => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <ul id="ile-menu" className={`${styles.links} ${open ? styles.open : ''}`}>
          {links.map(l => (
            <li key={l.label}><Link to={l.to} className={styles.link} onClick={close}>{l.label}</Link></li>
          ))}
          {showCta && (
            <li><Link to="/waitlist" className={`il-btn il-btn-primary ${styles.cta}`} onClick={close}>Join the waitlist</Link></li>
          )}
        </ul>
      </nav>
    </header>
  )
}
