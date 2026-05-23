import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RajPortfolio from './RajPortfolio.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RajPortfolio />
  </StrictMode>,
)