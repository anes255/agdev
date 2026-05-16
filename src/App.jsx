import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import Footer from './components/Footer'
import OrderModal from './components/OrderModal'
import AdminPage from './pages/AdminPage'
import { useState, useEffect } from 'react'

function MainSite() {
  const { i18n } = useTranslation()
  const [orderOpen, setOrderOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <div className="min-h-screen bg-dark-950 relative">
      <div className="mesh-gradient fixed inset-0 pointer-events-none" />
      <Navbar onOrder={() => setOrderOpen(true)} />
      <Hero onOrder={() => setOrderOpen(true)} />
      <Portfolio />
      <Services />
      <Footer />
      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />
    </div>
  )
}

export default function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ style: { background: '#1a1a2e', color: '#f8f9fa', border: '1px solid rgba(255,255,255,0.1)' } }} />
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin-portal-x7k9" element={<AdminPage />} />
      </Routes>
    </>
  )
}
