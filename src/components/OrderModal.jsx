import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function OrderModal({ isOpen, onClose }) {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [projectType, setProjectType] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    description: '', timeline: ''
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, { ...form, projectType })
      toast.success(t('order.success'))
      onClose()
      setStep(1)
      setProjectType('')
      setForm({ name: '', email: '', phone: '', company: '', description: '', timeline: '' })
    } catch {
      toast.error(t('order.error'))
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    setStep(1)
    setProjectType('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="relative glass-strong rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-dark-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="font-display text-2xl font-bold gradient-text mb-6">
              {t('order.title')}
            </h2>

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <p className="text-dark-300 mb-6">{t('order.type_question')}</p>
                <div className="grid grid-cols-2 gap-4">
                  {['website', 'application'].map((type) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setProjectType(type); setStep(2) }}
                      className="glass rounded-2xl p-6 text-center hover:border-primary-500/50 transition-all duration-300 group"
                    >
                      <div className="text-4xl mb-3">
                        {type === 'website' ? '🌐' : '📱'}
                      </div>
                      <span className="font-medium text-dark-200 group-hover:text-white transition-colors">
                        {t(`order.${type}`)}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <p className="text-dark-400 text-sm mb-4">
                  {t('order.form_title')} — {t(`order.${projectType}`)}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('order.name')}
                    required
                    className="col-span-2 glass rounded-xl px-4 py-3 bg-transparent text-white placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t('order.email')}
                    required
                    className="glass rounded-xl px-4 py-3 bg-transparent text-white placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={t('order.phone')}
                    required
                    className="glass rounded-xl px-4 py-3 bg-transparent text-white placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  />
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder={t('order.company')}
                    className="col-span-2 glass rounded-xl px-4 py-3 bg-transparent text-white placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  />
                </div>


                <select
                  name="timeline"
                  value={form.timeline}
                  onChange={handleChange}
                  required
                  className="w-full glass rounded-xl px-4 py-3 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 [&>option]:bg-dark-900"
                >
                  <option value="" disabled>{t('order.timeline')}</option>
                  <option value="urgent">{t('order.timeline_urgent')}</option>
                  <option value="normal">{t('order.timeline_normal')}</option>
                  <option value="relaxed">{t('order.timeline_relaxed')}</option>
                </select>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder={t('order.description')}
                  required
                  rows={4}
                  className="w-full glass rounded-xl px-4 py-3 bg-transparent text-white placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
                />

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="glass px-6 py-3 rounded-xl text-dark-300 hover:text-white transition-colors"
                  >
                    ←
                  </button>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 btn-primary !py-3 disabled:opacity-50"
                  >
                    {loading ? '...' : t('order.submit')}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
