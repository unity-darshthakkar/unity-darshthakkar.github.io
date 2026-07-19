import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.jsx'

// Always land at the top on (re)load — never restore a mid-page scroll position.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
// Strip any #hash so the browser doesn't auto-scroll to an anchor on reload.
if (window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname + window.location.search)
}
window.scrollTo(0, 0)
// Re-assert top after full load, in case late layout shifts nudge the position.
window.addEventListener('load', () => window.scrollTo(0, 0))

// NOTE: StrictMode is intentionally omitted. It double-invokes mount effects in
// dev, which fights imperative libraries (three.js, GSAP ScrollTrigger, Lenis)
// and caused particle/scroll race conditions.
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
)
