import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './Landing.module.css'

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

const problems = [
  {
    title: 'A year’s rent, all at once',
    text: 'Most landlords ask for one or two years upfront. Saving that much while still paying your current rent can take years.',
  },
  {
    title: 'Fees on top of fees',
    text: 'Agent fees, legal fees and inspection fees add a large amount to what you pay before you even get the keys.',
  },
  {
    title: 'Homes that don’t exist',
    text: 'Fake listings, and agents who disappear after collecting an inspection fee, are common enough that everyone knows someone it happened to.',
  },
]

const steps = [
  {
    title: 'Find a home we’ve checked',
    text: 'Every listing is inspected in person before it goes live, so the photos match the place and the landlord is real.',
  },
  {
    title: 'Apply online',
    text: 'Send your application on Ilé. No agent in the middle and no fee to apply.',
  },
  {
    title: 'Move in and pay monthly',
    text: 'Once you’re approved, Ilé pays your landlord the year upfront and you pay Ilé month by month.',
  },
]

const faqs = [
  {
    q: 'When does Ilé launch?',
    a: 'We don’t have a date yet. People on the waitlist will hear first, before anyone else.',
  },
  {
    q: 'Can I pay my rent monthly today?',
    a: 'Not yet. Monthly rent is the core of what we’re building. When it launches, it will depend on the property and a simple approval check.',
  },
  {
    q: 'Which cities will you start in?',
    a: 'We’ll start where the waitlist shows the most demand, so tell us your city when you join.',
  },
  {
    q: 'How will homes be verified?',
    a: 'Our plan is to inspect every home in person and confirm the landlord’s identity before a listing goes live.',
  },
  {
    q: 'Does it cost anything to join?',
    a: 'No. Joining the waitlist is free.',
  },
  {
    q: 'What do you do with my details?',
    a: 'We use your email only to tell you about the launch, and your answers only to decide what to build. We don’t sell or share them.',
  },
]

function RentSplit() {
  return (
    <figure className={styles.split} aria-labelledby="split-caption">
      <div className={styles.splitRow}>
        <p className={styles.splitLabel}>The usual way</p>
        <p className={styles.splitAmount}>₦1,800,000</p>
        <p className={styles.splitNote}>due before you move in, plus agent and legal fees</p>
      </div>

      <div className={styles.bar} aria-hidden="true">
        {MONTHS.map((m, i) => (
          <span key={i} className={styles.seg} style={{ '--i': i }}>
            <span className={styles.segLetter}>{m}</span>
          </span>
        ))}
      </div>

      <div className={styles.splitRow}>
        <p className={styles.splitLabel}>With Ilé</p>
        <p className={`${styles.splitAmount} ${styles.splitAmountIle}`}>₦150,000 <span>a month</span></p>
      </div>

      <figcaption id="split-caption" className={styles.splitCaption}>
        Example for a flat that costs ₦1.8m a year. Monthly plans will depend on the property and an approval check.
      </figcaption>
    </figure>
  )
}

export default function Landing() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ─────────────────────────────── */}
        <section className={`il-wrap ${styles.hero}`}>
          <div className={styles.heroText}>
            <p className={styles.status}><span className={styles.dot} aria-hidden="true" /> Launching soon</p>
            <h1 className={`il-display ${styles.title}`}>Verified homes. Rent you pay monthly.</h1>
            <p className={styles.lead}>
              Ilé is a new way to rent in Nigeria. Every home is checked in person before it’s listed,
              there are no agent fees, and you pay your rent month by month instead of a year upfront.
            </p>
            <div className={styles.actions}>
              <Link to="/waitlist" className="il-btn il-btn-primary">Join the waitlist</Link>
              <a href="#how" className="il-btn il-btn-ghost">See how it works</a>
            </div>
            <p className={styles.small}>Free to join. We’ll only email you about the launch.</p>
          </div>
          <RentSplit />
        </section>

        {/* ── Problems ─────────────────────────── */}
        <section className={styles.problems}>
          <div className="il-wrap">
            <h2 className={`il-display ${styles.h2}`}>Renting here shouldn’t be this hard</h2>
            <div className={styles.problemList}>
              {problems.map(p => (
                <article key={p.title} className={styles.problem}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ─────────────────────── */}
        <section id="how" className={`il-wrap ${styles.section}`}>
          <div className={styles.sectionHead}>
            <h2 className={`il-display ${styles.h2}`}>How Ilé will work</h2>
            <p>We’re building this now. The waitlist tells us where to launch first and what matters most to you.</p>
          </div>
          <ol className={styles.steps}>
            {steps.map((s, i) => (
              <li key={s.title} className={styles.step}>
                <span className={styles.stepNum} aria-hidden="true">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Landlords ────────────────────────── */}
        <section id="landlords" className={styles.landlords}>
          <div className={`il-wrap ${styles.landlordsInner}`}>
            <div>
              <h2 className={`il-display ${styles.h2}`}>For landlords</h2>
              <p className={styles.landlordLead}>
                Get your full year’s rent upfront, from tenants who’ve been checked, without going through an agent.
              </p>
              <Link to="/waitlist?role=Landlord" className={`il-btn ${styles.goldBtn}`}>Join as a landlord</Link>
            </div>
            <ul className={styles.landlordList}>
              <li><strong>Paid upfront.</strong> You receive the year’s rent at the start, even when your tenant pays Ilé monthly.</li>
              <li><strong>Tenants checked first.</strong> Applicants are verified before they reach you.</li>
              <li><strong>Less chasing.</strong> Ilé handles the monthly collection, so you’re not left following up.</li>
            </ul>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────── */}
        <section id="faq" className={`il-wrap ${styles.section}`}>
          <div className={styles.sectionHead}>
            <h2 className={`il-display ${styles.h2}`}>Questions</h2>
          </div>
          <div className={styles.faq}>
            {faqs.map(f => (
              <details key={f.q} className={styles.faqItem}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Final call ───────────────────────── */}
        <section className={styles.final}>
          <div className={`il-wrap ${styles.finalInner}`}>
            <h2 className={`il-display ${styles.finalTitle}`}>Help shape Ilé</h2>
            <p>
              Joining takes 30 seconds. If you have three more minutes, tell us about your renting experience.
              Your answers decide what we build first.
            </p>
            <Link to="/waitlist" className="il-btn il-btn-primary">Join the waitlist</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
