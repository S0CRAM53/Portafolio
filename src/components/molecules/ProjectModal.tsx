import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import type { ProjectCard } from '../../data/portfolioData';
import Lightbox from './Lightbox';
import ProjectVideo from './ProjectVideo';

interface ProjectModalProps {
  project: ProjectCard;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-xl"
    >
      <div className="absolute inset-0" onClick={onClose}></div>

      <motion.div
        data-lenis-prevent
        initial={{ y: 50, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-6xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-[2rem] overflow-y-auto shadow-2xl flex flex-col"
      >
        {/* Header Modal */}
        <div className="sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 p-6 md:px-12 flex justify-between items-center z-10">
          <div>
            <span className="text-gray-500 font-mono text-sm block mb-1">{project.id}</span>
            <h2 className="text-2xl md:text-3xl font-medium text-primary">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-[#151515] border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Cerrar detalles del proyecto"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Modal */}
        <div className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Columna Izquierda: Contexto y Detalles */}
          <div className="lg:col-span-7 space-y-12">
            {project.details?.demoVideo && (
              <ProjectVideo
                src={project.details.demoVideo}
                title={project.title}
              />
            )}

            {project.details?.problem && (
              <section>
                <h3 className="text-xl text-white mb-4 font-serif italic">El Desafío</h3>
                <p className="text-gray-400 leading-relaxed">{project.details.problem}</p>
              </section>
            )}

            {project.details?.solution && (
              <section>
                <h3 className="text-xl text-white mb-4 font-serif italic">La Solución</h3>
                <p className="text-gray-400 leading-relaxed">{project.details.solution}</p>
              </section>
            )}

            {project.details?.features && (
              <section>
                <h3 className="text-xl text-white mb-4 font-serif italic">Funcionalidades Clave</h3>
                <ul className="space-y-4">
                  {project.details.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary/70 shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Columna Derecha: Stack y Enlaces */}
          <div className="lg:col-span-5 space-y-10">
            <div className="bg-[#111111] border border-white/5 rounded-2xl p-8">
              <h3 className="text-lg text-white mb-6 font-serif italic">Stack Tecnológico</h3>
              <div className="flex flex-wrap gap-2">
                {project.details?.stack ? (
                  project.details.stack.map((tech: string, idx: number) => (
                    <span key={idx} className="px-3 py-1.5 bg-black border border-white/10 text-primary/80 text-xs sm:text-sm rounded-md">
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">Información en construcción...</span>
                )}
              </div>
            </div>

            {project.details?.repos && (
              <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 space-y-4">
                <h3 className="text-lg text-white mb-6 font-serif italic">Repositorios y Enlaces</h3>

                {project.details.repos.frontend && (
                  <a href={project.details.repos.frontend} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                    <span className="text-sm font-medium">Frontend (React/Vite)</span>
                  </a>
                )}
                {project.details.repos.backend && (
                  <a href={project.details.repos.backend} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                    <span className="text-sm font-medium">Backend (Spring Boot)</span>
                  </a>
                )}
                {project.details.repos.api && (
                  <a href={project.details.repos.api} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                    <span className="text-sm font-medium">Microservicio IA (Python)</span>
                  </a>
                )}
                {project.details?.demo && (
                  <a href={project.details.demo} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-primary hover:text-white transition-colors group mt-6 pt-6 border-t border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    <span className="text-sm font-medium">Ver Proyecto en Vivo</span>
                  </a>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Galería de Capturas */}
        {project.details?.screenshots && project.details.screenshots.length > 0 && (
          <div className="px-6 md:px-12 pb-10 md:pb-12">
            <h3 className="text-xl text-white mb-6 font-serif italic">Capturas del Proyecto</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.details.screenshots.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightbox(src)}
                  aria-label={`Ampliar captura ${idx + 1} de ${project.title}`}
                  className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <img
                    src={src}
                    alt={`Captura de pantalla ${idx + 1} de ${project.title}`}
                    loading="lazy"
                    className="w-full h-44 sm:h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </motion.div>
  );
};

export default ProjectModal;