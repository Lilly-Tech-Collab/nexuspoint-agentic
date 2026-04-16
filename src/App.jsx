import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import Question1 from './pages/Question1.jsx'
import Question2 from './pages/Question2.jsx'
import Question3 from './pages/Question3.jsx'
import Question4 from './pages/Question4.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/01-outreach" element={<Question1 />} />
        <Route path="/02-support" element={<Question2 />} />
        <Route path="/03-va-replacement" element={<Question3 />} />
        <Route path="/04-privacy-ml" element={<Question4 />} />
      </Routes>
    </>
  )
}
