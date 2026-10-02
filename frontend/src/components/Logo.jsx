import { Link } from 'react-router-dom'

// The ilé wordmark: the accent over the e is drawn as a roof.
export default function Logo({ to = '/' }) {
  return (
    <Link to={to} className="il-mark" aria-label="Ilé home">
      il<span className="roof">e</span>
    </Link>
  )
}
