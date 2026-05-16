import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

const projects = [
  {
    id: 1,
    titleKey: 'portfolio.project1_title',
    descKey: 'portfolio.project1_desc',
    url: 'https://mamanalgerienne.com/',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB'],
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 2,
    titleKey: 'portfolio.project2_title',
    descKey: 'portfolio.project2_desc',
    url: 'https://parapharmacie-frontend.vercel.app/',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&h=500&fit=crop',
    tags: ['Next.js', 'Tailwind', 'Stripe'],
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 3,
    titleKey: 'portfolio.project3_title',
    descKey: 'portfolio.project3_desc',
    url: 'https://stupendous-pothos-cab613.netlify.app/',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop',
    tags: ['React', 'GSAP', 'Three.js'],
    color: 'from-violet-500 to-purple-500'
  }
]

function ProjectCard({ project, index }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group"
    >
      <div className="relative glass rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary-900/20">
        <div className="relative h-64 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
          <img
            src={project.image}
            alt={t(project.titleKey)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !px-6 !py-3 text-sm"
            >
              {t('portfolio.visit')} ↗
            </a>
          </motion.div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full glass text-dark-300">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-display text-xl font-bold text-white mb-2">
            {t(project.titleKey)}
          </h3>
          <p className="text-dark-400 text-sm leading-relaxed">
            {t(project.descKey)}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="portfolio" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('portfolio.title')}</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
