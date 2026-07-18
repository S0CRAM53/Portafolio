import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactLenis } from 'lenis/react'
import App from './App.tsx'

import './index.css'
import 'lenis/dist/lenis.css' // Es crucial importar los estilos de Lenis

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* El prop 'root' le dice a Lenis que tome el control del scroll global (el <html>) */}
    <ReactLenis root>
      <App />
    </ReactLenis>
  </StrictMode>,
)