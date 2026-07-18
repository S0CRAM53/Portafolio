import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import WordsPullUp from '../atoms/WordsPullUp';
import heroVideo from '../../assets/hero_principal.mp4';

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const HeroSection = () => {
  return (
    <section className="h-screen w-full p-4 md:p-6 pt-20 md:pt-6">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black">

        <video
          src={heroVideo}
          autoPlay loop muted playsInline
          aria-hidden="true"
          poster="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 lg:col-span-8">
              <WordsPullUp
                text="Full-Stack"
                showAsterisk={true}
                className="text-[24vw] sm:text-[22vw] md:text-[20vw] lg:text-[16vw] xl:text-[15vw] font-medium leading-[0.85] tracking-[-0.07em]"
              />
            </div>
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 md:gap-8 pb-4 md:pb-6">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: customEase }}
                className="text-primary/80 text-sm md:text-base leading-relaxed"
              >
                Analista Programador Computacional especializado en la creación de APIs RESTful, arquitecturas escalables y soluciones digitales que impulsan el futuro tecnológico.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8, ease: customEase }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  
                  <a
                    href="/Marco_orellana_CV.pdf"
                    download
                    aria-label="Descargar currículum de Marcos Orellana en PDF"
                    className="group flex items-center justify-between bg-primary text-black rounded-full pl-6 pr-2 py-2 w-max gap-8 transition-all hover:gap-12 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    <span className="font-medium text-sm sm:text-base">Descargar CV</span>
                    <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#1a1a1a]">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" aria-hidden="true" />
                    </div>
                  </a>

                  <a
                    href="https://github.com/S0CRAM53"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Visitar perfil de GitHub"
                    className="group flex items-center justify-center bg-[#151515] border border-white/10 text-white rounded-full px-6 py-2.5 w-max gap-3 transition-all hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform group-hover:scale-110" aria-hidden="true">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                    <span className="font-medium text-sm sm:text-base">Ver GitHub</span>
                  </a>
                </div>
                <p className="text-primary/50 text-xs mt-1">* Disponible para nuevos proyectos y oportunidades laborales.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;