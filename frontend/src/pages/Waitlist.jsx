import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

const SUPABASE_URL = 'https://ixgyblggumcpozewraro.supabase.co'
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export default function Waitlist() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    city: '',
    role: '',
    how_find: '',
    search_duration: '',
    scammed: '',
    payment_type: '',
    agent_fee: '',
    bad_experience: '',
    biggest_frustration: '',
    places_viewed: '',
    monthly_payment: '',
    trust_factor: '',
    would_use: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.city || !form.role) {
      setError('Please fill in all required fields')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch (e) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', border: '1.5px solid #e7e5e4', borderRadius: '12px',
    padding: '12px 16px', outline: 'none', fontSize: '15px', color: '#1A1A1A',
    fontFamily: 'DM Sans, sans-serif', boxSizing: 'border-box', backgroundColor: '#FAFAF8'
  }

  const selectStyle = { ...inputStyle, cursor: 'pointer' }

  const sectionTitle = (text) => (
    <div style={{ borderLeft: '3px solid #0B4D2E', paddingLeft: '12px', marginBottom: '24px', marginTop: '8px' }}>
      <p style={{ fontSize: '13px', fontWeight: 700, color: '#0B4D2E', textTransform: 'uppercase', letterSpacing: '1px' }}>{text}</p>
    </div>
  )

  const optionButtons = (field, options) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => setForm({ ...form, [field]: opt })}
          style={{
            padding: '10px 16px', borderRadius: '999px', cursor: 'pointer',
            fontSize: '14px', fontWeight: 500, fontFamily: 'DM Sans, sans-serif',
            backgroundColor: form[field] === opt ? '#0B4D2E' : '#FAFAF8',
            color: form[field] === opt ? 'white' : '#57534e',
            border: form[field] === opt ? '1.5px solid #0B4D2E' : '1.5px solid #e7e5e4',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF8', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Navbar */}
      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e7e5e4', padding: '0 40px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#0B4D2E', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#E8A020', fontWeight: 900, fontSize: '16px', fontFamily: 'Playfair Display, serif' }}>I</span>
          </div>
          <span style={{ color: '#0B4D2E', fontWeight: 800, fontSize: '20px', fontFamily: 'Playfair Display, serif' }}>Ilé</span>
        </Link>
        <Link to="/register" style={{ color: '#0B4D2E', fontWeight: 600, fontSize: '15px', textDecoration: 'none' }}>
          Create account →
        </Link>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 40px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', alignItems: 'start' }}>

        {/* Left */}
        <div style={{ position: 'sticky', top: '100px' }}>
          <span style={{ display: 'inline-block', backgroundColor: '#E8F5EE', color: '#0B4D2E', fontSize: '13px', fontWeight: 600, padding: '6px 14px', borderRadius: '999px', marginBottom: '24px', border: '1px solid #C3E0CE' }}>
            🚀 Coming Soon
          </span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '48px', fontWeight: 800, color: '#0D1C12', lineHeight: 1.1, marginBottom: '20px' }}>
            Help us build the future of renting in Nigeria
          </h1>
          <p style={{ fontSize: '16px', color: '#57534e', lineHeight: 1.7, marginBottom: '40px' }}>
            Tell us about your experience with renting and agents. Your answers will directly shape how Ilé works — and get you early access when we launch.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            {[
              'Get early access before public launch',
              'Help us solve the real problems',
              'First month free for waitlist members',
              'No spam — just one launch email',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: '#E8F5EE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle size={14} style={{ color: '#0B4D2E' }} />
                </div>
                <p style={{ color: '#57534e', fontSize: '15px' }}>{item}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Right — Form */}
        <div>
          {submitted ? (
            <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '60px 40px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #e7e5e4' }}>
              <div style={{ fontSize: '64px', marginBottom: '24px' }}>🏠</div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: 800, color: '#0D1C12', marginBottom: '12px' }}>
                You're on the list!
              </h2>
              <p style={{ color: '#78716c', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
                Thank you for sharing your experience. Your feedback will directly shape Ilé. We'll reach out when we launch.
              </p>
              <Link to="/" style={{ backgroundColor: '#0B4D2E', color: 'white', fontWeight: 700, padding: '14px 28px', borderRadius: '999px', textDecoration: 'none', fontSize: '15px' }}>
                Back to Homepage
              </Link>
            </div>
          ) : (
            <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #e7e5e4' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 800, color: '#0D1C12', marginBottom: '8px' }}>
                Join the waitlist
              </h2>
              <p style={{ color: '#78716c', fontSize: '15px', marginBottom: '32px' }}>Takes about 3 minutes — every answer helps</p>

              {error && (
                <div style={{ backgroundColor: '#FEF2F2', color: '#DC2626', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', marginBottom: '20px' }}>
                  {error}
                </div>
              )}

              {/* Section 1 — About You */}
              {sectionTitle('About You')}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0D1C12', marginBottom: '8px' }}>
                  Full Name <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="John Adeyemi"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#0B4D2E'}
                  onBlur={e => e.target.style.borderColor = '#e7e5e4'}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0D1C12', marginBottom: '8px' }}>
                  Email Address <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@email.com"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#0B4D2E'}
                  onBlur={e => e.target.style.borderColor = '#e7e5e4'}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0D1C12', marginBottom: '8px' }}>
                  City <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <select
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value })}
                  style={selectStyle}
                  onFocus={e => e.target.style.borderColor = '#0B4D2E'}
                  onBlur={e => e.target.style.borderColor = '#e7e5e4'}
                >
                  <option value="">Select your city</option>
                  <option>Lagos</option>
                  <option>Abuja</option>
                  <option>Port Harcourt</option>
                  <option>Ibadan</option>
                  <option>Kano</option>
                  <option>Other</option>
                </select>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0D1C12', marginBottom: '12px' }}>
                  I am a <span style={{ color: '#DC2626' }}>*</span>
                </label>
                {optionButtons('role', ['Tenant', 'Landlord', 'Both'])}
              </div>

              {/* Section 2 — Finding a Home */}
              {sectionTitle('Finding a Home')}

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0D1C12', marginBottom: '12px' }}>
                  How do you currently find rental properties?
                </label>
                {optionButtons('how_find', ['Through an agent', 'Online listings', 'Word of mouth', 'Social media', 'Other'])}
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0D1C12', marginBottom: '12px' }}>
                  How long does it usually take you to find a place?
                </label>
                {optionButtons('search_duration', ['Less than 1 month', '1–3 months', '3–6 months', 'Over 6 months'])}
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0D1C12', marginBottom: '12px' }}>
                  How many places did you view before finding your current home?
                </label>
                {optionButtons('places_viewed', ['1–3', '4–7', '8–15', 'More than 15'])}
              </div>

              {/* Section 3 — Agents & Scams */}
              {sectionTitle('Agents & Scams')}

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0D1C12', marginBottom: '12px' }}>
                  Have you ever been scammed or shown a fake listing?
                </label>
                {optionButtons('scammed', ['Yes, multiple times', 'Yes, once', 'Almost but caught it', 'No, never'])}
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0D1C12', marginBottom: '12px' }}>
                  How much do you typically pay an agent?
                </label>
                {optionButtons('agent_fee', ["Nothing, I don't use agents", '5–10% of rent', '10% or more', 'Not sure'])}
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0D1C12', marginBottom: '12px' }}>
                  Have you ever had a bad experience with a landlord or agent?
                </label>
                {optionButtons('bad_experience', ['Yes, with an agent', 'Yes, with a landlord', 'Yes, with both', 'No bad experiences'])}
              </div>

              {/* Section 4 — Payments */}
              {sectionTitle('Rent Payments')}

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0D1C12', marginBottom: '12px' }}>
                  Do you currently pay rent annually or monthly?
                </label>
                {optionButtons('payment_type', ['Always annually', 'Sometimes monthly', 'Always monthly', 'Depends on landlord'])}
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0D1C12', marginBottom: '12px' }}>
                  Would you pay rent monthly if you could?
                </label>
                {optionButtons('monthly_payment', ['Definitely yes', 'Yes if affordable', 'Not sure', 'No preference'])}
              </div>

              {/* Section 5 — Trust & Product */}
              {sectionTitle('Trust & Product')}

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0D1C12', marginBottom: '12px' }}>
                  What would make you trust an online rental platform?
                </label>
                {optionButtons('trust_factor', ['Verified listings', 'Reviews from tenants', 'Physical inspection', 'Money-back guarantee', 'All of the above'])}
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0D1C12', marginBottom: '12px' }}>
                  Would you use a platform with zero agent fees and monthly rent payments?
                </label>
                {optionButtons('would_use', ['Definitely', 'Most likely', 'Maybe', 'Unlikely'])}
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#0D1C12', marginBottom: '8px' }}>
                  What's your biggest frustration when renting in Nigeria?
                </label>
                <textarea
                  value={form.biggest_frustration}
                  onChange={e => setForm({ ...form, biggest_frustration: e.target.value })}
                  placeholder="Tell us anything — fake listings, agent fees, paying full year upfront, bad landlords..."
                  rows={4}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#0B4D2E'}
                  onBlur={e => e.target.style.borderColor = '#e7e5e4'}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{ width: '100%', backgroundColor: '#0B4D2E', color: 'white', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 700, fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, fontFamily: 'DM Sans, sans-serif' }}
              >
                {loading ? 'Submitting...' : 'Submit & Join Waitlist →'}
              </button>

              <p style={{ textAlign: 'center', color: '#a8a29e', fontSize: '13px', marginTop: '16px' }}>
                Your responses are private and will only be used to improve Ilé.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}