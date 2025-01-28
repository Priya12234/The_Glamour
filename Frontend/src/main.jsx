import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LandingPage from './Landing_page.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LandingPage/>
  </StrictMode>,
)
