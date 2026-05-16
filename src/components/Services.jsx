import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

const services = [
  {
    titleKey: 'services.web_title',
    descKey: 'services.web_desc',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    titleKey: 'services.app_title',
    descKey: 'services.app_desc',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    titleKey: 'services.design_title',
    descKey: 'services.design_desc',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    titleKey: 'services.seo_title',
    descKey: 'services.seo_desc',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    gradient: 'from-amber-500 to-orange-500'
  }
]

function ServiceCard({ service, index }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div className="glass rounded-2xl p-8 h-full transition-all duration-500 hover:shadow-2xl hover:shadow-primary-900/10 relative overflow-hidden">
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} bg-opacity-10 text-white mb-6`}>
          {service.icon}
        </div>

        <h3 className="font-display text-xl font-bold text-white mb-3">
          {t(service.titleKey)}
        </h3>
        <p className="text-dark-400 leading-relaxed text-sm">
          {t(service.descKey)}
        </p>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="services" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('services.title')}</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
