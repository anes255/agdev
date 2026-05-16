import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer id="contact" className="relative py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <img src="/logo.svg" alt="AG DEV" className="w-10 h-10" />
            <div>
              <span className="font-display font-bold text-lg gradient-text">AG DEV</span>
              <p className="text-dark-500 text-sm">{t('footer.tagline')}</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-6 flex-wrap">
            <a href="tel:0779452212" className="text-dark-400 hover:text-white transition-colors text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              0779452212
            </a>
            <a href="mailto:agdevelopm@gmail.com" className="text-dark-400 hover:text-white transition-colors text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              agdevelopm@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-dark-600 text-sm">
            © {new Date().getFullYear()} AG DEV. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
