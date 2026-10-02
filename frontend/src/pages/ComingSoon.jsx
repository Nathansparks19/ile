import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Shown in place of listings, sign-in and dashboards until they launch.
export default function ComingSoon() {
  return (
    <>
      <Navbar />
      <main className="il-wrap" style={{ padding: 'clamp(72px, 12vw, 144px) var(--gutter)', maxWidth: 760, textAlign: 'center' }}>
        <h1 className="il-display" style={{ fontSize: 'clamp(34px, 5vw, 52px)', margin: 0 }}>This part of Ilé isn’t open yet</h1>
        <p style={{ margin: '20px auto 32px', fontSize: 19, color: 'var(--muted)', maxWidth: '46ch' }}>
          Verified listings, accounts and monthly rent are on the way. Join the waitlist to hear the moment they launch.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/waitlist" className="il-btn il-btn-primary">Join the waitlist</Link>
          <Link to="/" className="il-btn il-btn-ghost">Back to the homepage</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
