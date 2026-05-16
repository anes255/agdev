import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const languages = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'ar', label: 'عر', flag: '🇩🇿' }
]

export default function Navbar({ onOrder }) {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-2xl shadow-primary-900/10' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="/"
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <img src="/logo.svg" alt="AG DEV" className="w-10 h-10" />
          <span className="font-display font-bold text-xl gradient-text">AG DEV</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {['home', 'portfolio', 'services', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-dark-400 hover:text-white transition-colors duration-300 text-sm font-medium"
            >
              {t(`nav.${item}`)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 glass rounded-full px-2 py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => i18n.changeLanguage(lang.code)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  i18n.language === lang.code
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                    : 'text-dark-400 hover:text-white'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOrder}
            className="hidden md:block btn-primary text-sm !px-6 !py-2.5"
          >
            {t('nav.order')}
          </motion.button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {['home', 'portfolio', 'services', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-dark-300 hover:text-white transition-colors py-2"
                >
                  {t(`nav.${item}`)}
                </a>
              ))}
              <button onClick={() => { onOrder(); setMobileOpen(false) }} className="btn-primary text-sm mt-2">
                {t('nav.order')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
