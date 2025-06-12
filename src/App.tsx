import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopOnNavigation from './components/ScrollToTopOnNavigation'
import useSmoothScroll from './hooks/useSmoothScroll'
import useDarkMode from './hooks/useDarkMode'
import './styles/DarkMode.css'
import './styles/LoadingSpinner.css'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const MenuPage = lazy(() => import('./pages/MenuPage'))
const ContactPageNew = lazy(() => import('./pages/ContactPageNew'))

function App() {
  // Aplicar efecto de scroll suave a toda la aplicación
  useSmoothScroll();
  
  // Aplicar tema claro u oscuro
  const [theme, toggleTheme] = useDarkMode();
  
  // Actualizar el atributo data-theme en el documento cuando cambia el tema
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  return (
    <Router>
      <div className="app">
        <ScrollToTopOnNavigation />
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Suspense fallback={<div className="loading-container"><div className="spinner"></div></div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/contacto" element={<ContactPageNew />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  )
}

export default App
