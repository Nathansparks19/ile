import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import styles from './Waitlist.module.css'

const SUPABASE_URL = 'https://ixgyblggumcpozewraro.supabase.co'
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const CITIES = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano', 'Other']
const ROLES = ['Tenant', 'Landlord', 'Both']

// The research questions. Field names and answer options match the existing
// Supabase 'waitlist' table, so old and new answers can be analysed together.
const SURVEY = [
  {
    group: 'Finding a home',
    questions: [
      { field: 'how_find', label: 'How do you usually find places to rent?', options: ['Through an agent', 'Online listings', 'Word of mouth', 'Social media', 'Other'] },
      { field: 'search_duration', label: 'How long does it usually take to find a place?', options: ['Less than 1 month', '1–3 months', '3–6 months', 'Over 6 months'] },
      { field: 'places_viewed', label: 'How many places did you view before your current home?', options: ['1–3', '4–7', '8–15', 'More than 15'] },
    ],
  },
  {
    group: 'Agents and scams',
    questions: [
      { field: 'scammed', label: 'Have you ever been scammed or shown a fake listing?', options: ['Yes, multiple times', 'Yes, once', 'Almost but caught it', 'No, never'] },
      { field: 'agent_fee', label: 'How much do you usually pay an agent?', options: ["Nothing, I don't use agents", '5–10% of rent', '10% or more', 'Not sure'] },
      { field: 'bad_experience', label: 'Have you had a bad experience with a landlord or agent?', options: ['Yes, with an agent', 'Yes, with a landlord', 'Yes, with both', 'No bad experiences'] },
    ],
  },
  {
    group: 'Paying rent',
    questions: [
      { field: 'payment_type', label: 'Do you pay rent yearly or monthly now?', options: ['Always annually', 'Sometimes monthly', 'Always monthly', 'Depends on landlord'] },
      { field: 'monthly_payment', label: 'Would you pay rent monthly if you could?', options: ['Definitely yes', 'Yes if affordable', 'Not sure', 'No preference'] },
    ],
  },
  {
    group: 'Trust',
    questions: [
      { field: 'trust_factor', label: 'What would make you trust an online rental platform?', options: ['Verified listings', 'Reviews from tenants', 'Physical inspection', 'Money-back guarantee', 'All of the above'] },
      { field: 'would_use', label: 'Would you use a platform with no agent fees and monthly rent?', options: ['Definitely', 'Most likely', 'Maybe', 'Unlikely'] },
    ],
  },
]

const EMPTY = {
  name: '', email: '', city: '', role: '',
  how_find: '', search_duration: '', scammed: '', payment_type: '', agent_fee: '',
  bad_experience: '', biggest_frustration: '', places_viewed: '', monthly_payment: '',
  trust_factor: '', would_use: '',
}

const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

function Choice({ label, options, value, onChange, name }) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.label}>{label}</legend>
      <div className={styles.choices}>
        {options.map(opt => (
          <label key={opt} className={`${styles.choice} ${value === opt ? styles.choiceOn : ''}`}>
            <input type="radio" name={name} value={opt} checked={value === opt} onChange={() => onChange(opt)} />
            {opt}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default function Waitlist() {
  const [params] = useSearchParams()
  const presetRole = ROLES.includes(params.get('role')) ? params.get('role') : ''
  const [form, setForm] = useState({ ...EMPTY, role: presetRole })
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }))
  const answered = SURVEY.flatMap(g => g.questions).filter(q => form[q.field]).length
  const total = SURVEY.flatMap(g => g.questions).length

  const goToSurvey = () => {
    if (!form.name.trim()) return setError('Enter your name.')
    if (!isEmail(form.email)) return setError('Enter a valid email address, like ada@gmail.com.')
    if (!form.city) return setError('Choose your city.')
    if (!form.role) return setError('Choose whether you’re a tenant, a landlord or both.')
    setError('')
    setStep(2)
    window.scrollTo({ top: 0 })
  }

  const submit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ ...form, name: form.name.trim(), email: form.email.trim().toLowerCase() }),
      })
      if (res.ok) {
        setDone(true)
        window.scrollTo({ top: 0 })
      } else {
        const data = await res.json().catch(() => ({}))
        const duplicate = res.status === 409 || /duplicate|unique/i.test(data.message || '')
        setError(duplicate
          ? 'This email is already on the waitlist. You don’t need to join again.'
          : 'Your details weren’t saved. Check your connection and try again.')
      }
    } catch {
      setError('Your details weren’t saved. Check your connection and try again.')
    }
    setLoading(false)
  }

  return (
    <>
      <Navbar showCta={false} />
      <main className={`il-wrap ${styles.page}`}>
        <aside className={styles.side}>
          <h1 className={`il-display ${styles.title}`}>
            {done ? 'You’re on the list' : 'Join the Ilé waitlist'}
          </h1>
          {done ? (
            <p className={styles.lead}>
              Thank you, {form.name.trim().split(' ')[0]}. We’ll email {form.email.trim()} when Ilé launches
              {answered > 0 ? ', and your answers will shape what we build first.' : '.'}
            </p>
          ) : (
            <>
              <p className={styles.lead}>Be first to know when Ilé launches, and help decide what we build.</p>
              <ul className={styles.perks}>
                <li>Early access before the public launch</li>
                <li>One email when we launch. No spam</li>
                <li>Your answers stay private and are only used to improve Ilé</li>
              </ul>
            </>
          )}
        </aside>

        <section className={styles.card} aria-live="polite">
          {done ? (
            <div className={styles.done}>
              <p>Know someone who’s tired of paying a year upfront? Send them this page.</p>
              <Link to="/" className="il-btn il-btn-ghost">Back to the homepage</Link>
            </div>
          ) : step === 1 ? (
            <>
              <p className={styles.stepText}>Step 1 of 2 · About 30 seconds</p>
              <h2 className={styles.cardTitle}>Your details</h2>
              {error && <p className={styles.error} role="alert">{error}</p>}

              <label className={styles.label} htmlFor="name">Full name</label>
              <input id="name" className={styles.input} value={form.name} onChange={e => set('name', e.target.value)} autoComplete="name" placeholder="Ada Okafor" />

              <label className={styles.label} htmlFor="email">Email address</label>
              <input id="email" type="email" className={styles.input} value={form.email} onChange={e => set('email', e.target.value)} autoComplete="email" placeholder="ada@gmail.com" />

              <label className={styles.label} htmlFor="city">City</label>
              <select id="city" className={styles.input} value={form.city} onChange={e => set('city', e.target.value)}>
                <option value="">Choose your city</option>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>

              <Choice name="role" label="I am a" options={ROLES} value={form.role} onChange={v => set('role', v)} />

              <button type="button" className="il-btn il-btn-primary il-btn-block" onClick={goToSurvey}>Continue</button>
            </>
          ) : (
            <>
              <p className={styles.stepText}>Step 2 of 2 · Optional · About 3 minutes</p>
              <h2 className={styles.cardTitle}>Tell us about renting</h2>
              <p className={styles.cardLead}>Answer as many as you like. Every answer helps us build the right thing.</p>
              {error && <p className={styles.error} role="alert">{error}</p>}

              {SURVEY.map(g => (
                <div key={g.group} className={styles.group}>
                  <h3 className={styles.groupTitle}>{g.group}</h3>
                  {g.questions.map(q => (
                    <Choice key={q.field} name={q.field} label={q.label} options={q.options} value={form[q.field]} onChange={v => set(q.field, v)} />
                  ))}
                </div>
              ))}

              <label className={styles.label} htmlFor="frustration">What’s your biggest frustration when renting in Nigeria?</label>
              <textarea id="frustration" rows={4} className={styles.input} value={form.biggest_frustration}
                onChange={e => set('biggest_frustration', e.target.value)}
                placeholder="Anything at all: fake listings, agent fees, paying a year upfront, landlords…" />

              <div className={styles.submitRow}>
                <button type="button" className="il-btn il-btn-primary il-btn-block" onClick={submit} disabled={loading}>
                  {loading ? 'Joining…' : 'Join the waitlist'}
                </button>
                <button type="button" className={styles.skip} onClick={submit} disabled={loading}>
                  {answered === 0 ? 'Skip the questions and join' : `Join with ${answered} of ${total} answered`}
                </button>
                <button type="button" className={styles.back} onClick={() => { setStep(1); setError('') }} disabled={loading}>
                  Back to your details
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  )
}
