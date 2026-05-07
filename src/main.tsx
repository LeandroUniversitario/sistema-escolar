import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error(
    '[main.tsx] No se encontró el elemento #root en el DOM. ' +
    'Verifica que index.html contenga <div id="root"></div>.'
  )
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
