import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Waitlist from './pages/Waitlist'
import ComingSoon from './pages/ComingSoon'

// Listings, sign-in and dashboards need the Ilé API (FastAPI), which is not deployed yet.
// Until it is, those addresses show a "Launching soon" page that points to the waitlist.
// When the API is live, restore these imports and routes:
//   Listings, PropertyDetail, Login, Register, TenantDashboard, LandlordDashboard

// Makes links like /#faq scroll to the section, and resets scroll on page change.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) { el.scrollIntoView(); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/listings" element={<ComingSoon />} />
        <Route path="/listings/:id" element={<ComingSoon />} />
        <Route path="/login" element={<ComingSoon />} />
        <Route path="/register" element={<ComingSoon />} />
        <Route path="/tenant" element={<ComingSoon />} />
        <Route path="/landlord" element={<ComingSoon />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
