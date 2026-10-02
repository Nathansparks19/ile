import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

// Shown in place of features that need the Ilé API (listings, sign-in, dashboards)
// until the backend is deployed. Swap the routes in App.jsx back when it is live.
export default function ComingSoon() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF8', fontFamily: 'DM Sans, sans-serif' }}>
      <Navbar />
      <main style={{ maxWidth: '640px', margin: '0 auto', padding: '120px 24px 80px', textAlign: 'center' }}>
        <span style={{
          display: 'inline-block',
          padding: '6px 14px',
          borderRadius: '999px',
          backgroundColor: '#E8F5EE',
          color: '#0B4D2E',
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.02em',
        }}>
          Launching soon
        </span>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 700,
          color: '#0D1C12',
          lineHeight: 1.15,
          margin: '20px 0 16px',
        }}>
          This part of Ilé is almost ready
        </h1>
        <p style={{ color: '#78716c', fontSize: '17px', lineHeight: 1.6, marginBottom: '32px' }}>
          Verified listings, tenant accounts and landlord tools open soon.
          Join the waitlist and you will be among the first to get access.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/waitlist" style={{
            backgroundColor: '#0B4D2E',
            color: '#FFFFFF',
            padding: '14px 28px',
            borderRadius: '10px',
            fontWeight: 600,
            textDecoration: 'none',
          }}>
            Join the waitlist
          </Link>
          <Link to="/" style={{
            border: '1.5px solid #e7e5e4',
            color: '#0D1C12',
            padding: '14px 28px',
            borderRadius: '10px',
            fontWeight: 600,
            textDecoration: 'none',
          }}>
            Back to home
          </Link>
        </div>
      </main>
    </div>
  )
}
