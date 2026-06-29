import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import './index.css'
import App from './App'

emailjs.init('TAc3O3TjZgNtm1Lg6')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
