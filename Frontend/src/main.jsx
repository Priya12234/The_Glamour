import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BookingForm from './appointment.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookingForm/>
  </StrictMode>,
)
