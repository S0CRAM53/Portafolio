import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion, AnimatePresence, type MotionValue, type Variants } from 'framer-motion';
import { ArrowRight, Check, Mail, Phone, Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import heroVideo from './assets/hero_principal.mp4';

// --- ANIMATION COMPONENTS ---

const WordsPullUp = ({ text, className = "", showAsterisk = false }: { text: string, className?: string, showAsterisk?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 }
    }
  };

  const item: Variants = {
    hidden: { y: prefersReducedMotion ? 0 : 20, opacity: prefersReducedMotion ? 1 : 0 },
    show: { y: 0, opacity: 1, transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={item} className="inline-block mr-[0.2em] relative">
          {word}
          {showAsterisk && i === words.length - 1 && (
            <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]" aria-hidden="true">*</span>
          )}
        </motion.span>
      ))}
    </motion.div>
  );
};

const WordsPullUpMultiStyle = ({ segments }: { segments: { text: string, className?: string }[] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    show: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 } }
  };

  const item: Variants = {
    hidden: { y: prefersReducedMotion ? 0 : 20, opacity: prefersReducedMotion ? 1 : 0 },
    show: { y: 0, opacity: 1, transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="inline-flex flex-wrap justify-center"
    >
      {segments.map((segment, segIdx) => {
        const words = segment.text.split(" ");
        return words.map((word, wIdx) => (
          <motion.span
            key={`${segIdx}-${wIdx}`}
            variants={item}
            className={`inline-block mr-[0.2em] mb-[0.1em] ${segment.className || ""}`}
          >
            {word}
          </motion.span>
        ));
      })}
    </motion.div>
  );
};

const AnimatedLetter = ({ char, index, total, scrollYProgress }: { char: string, index: number, total: number, scrollYProgress: MotionValue<number> }) => {
  const charProgress = index / total;
  const opacity = useTransform(scrollYProgress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
};

const ScrollRevealText = ({ text, className = "" }: { text: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2']
  });
  
  const chars = text.split("");
  return (
    <p ref={ref} className={className}>
      {chars.map((char, i) => (
        <AnimatedLetter key={i} char={char} index={i} total={chars.length} scrollYProgress={scrollYProgress} />
      ))}
    </p>
  );
};

// Wrapper for staggered card entrance
const FeatureCard = ({ children, delay, className = "h-full" }: { children: React.ReactNode, delay: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={isInView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.95, opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- MAIN APP ---

function App() {
  const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Perfil"); // Estado para la píldora activa
  const navItems = ["Perfil", "Experiencia", "Proyectos", "Habilidades", "Contacto"];

  // Inicializamos la instancia de Lenis
  const lenis = useLenis(); 

  // Función que intercepta el clic y hace el scroll suave
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    e.preventDefault(); 
    setActiveTab(item); 
    setMenuOpen(false); 

    const targetId = `#${item.toLowerCase()}`;
    
    if (lenis) {
      // offset: -96 compensa el espacio del navbar fijo para que no tape el título
      lenis.scrollTo(targetId, { offset: -96, duration: 1.2 });
    } else {
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll-spy: mantiene la píldora activa sincronizada con la sección
  // visible aunque el usuario no haga clic en el nav, sino que scrollee.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.toLowerCase()))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = navItems.find((item) => item.toLowerCase() === entry.target.id);
            if (match) setActiveTab(match);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const featureCards = [
    {
      id: "01",
      title: "WebLanding Suite.",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85",
      items: ["Plataforma SaaS para landing pages", "Integración de IA (Gemini, ChatGPT)", "Despliegue y arquitectura escalable", "Optimización de procesos"]
    },
    {
      id: "02",
      title: "Healflow Analytics.",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85",
      items: ["Gestión de métricas hospitalarias", "Dashboards interactivos con KPIs", "Python, PostgreSQL y Chart.js"]
    },
    {
      id: "03",
      title: "OnlyKick App.",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85",
      items: ["E-commerce nativo de zapatillas", "Desarrollo en Kotlin", "UI/UX con Jetpack Compose"]
    }
  ];

  const skills = [
    { category: "Lenguajes & Frameworks", tools: ["Kotlin", "Python (Django, FastAPI)", "Java (Spring Boot)", "JavaScript"] },
    { category: "Bases de Datos", tools: ["PostgreSQL", "NeonDB", "MongoDB", "SQL Developer"] },
    { category: "Herramientas & APIs", tools: ["Git", "GitHub", "Android Studio", "Render", "APIs REST"] },
  ];

  const languages = ["Español (Nativo)", "Inglés (Básico - Intermedio)"];

  return (
    <div className="bg-black min-h-screen text-[#E1E0CC] selection:bg-primary selection:text-black">
      
      {/* NAVBAR */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center px-4 md:px-0 pt-4 md:pt-6">
        
        {/* Desktop / tablet: Pill Navigation */}
        <nav
          aria-label="Navegación principal"
          className="hidden sm:flex bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 rounded-full p-1.5 items-center shadow-2xl"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item;
            
            return (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative px-5 py-2 md:px-6 md:py-2.5 text-sm font-medium transition-colors duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-[#1c1c1c] border border-white/10 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </a>
            );
          })}
        </nav>

        {/* Mobile: botón hamburguesa */}
        <div className="sm:hidden w-full flex justify-between items-center bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3 shadow-2xl">
          <span className="text-sm font-medium text-[#E1E0CC]">Marcos Orellana</span>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="text-[#E1E0CC] p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Navegación móvil"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden fixed top-[72px] left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] bg-black/95 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 shadow-2xl flex flex-col gap-1"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item)}
                className="text-sm font-medium text-[#E1E0CC]/85 hover:text-primary py-3 border-b border-white/5 last:border-b-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                {item}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO */}
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

      {/* SECTION 2: PERFIL */}
      <section id="perfil" className="bg-black py-32 px-4 flex justify-center items-center scroll-mt-24">
        <div className="bg-[#101010] border border-white/5 p-8 sm:p-12 md:p-20 rounded-2xl md:rounded-[2rem] text-center max-w-6xl w-full flex flex-col items-center">
          <span className="text-primary text-[10px] sm:text-xs tracking-wider uppercase mb-8 block">Full-Stack Developer</span>
          
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] mb-12">
            <WordsPullUpMultiStyle segments={[
              { text: "Soy Marcos Orellana, ", className: "font-normal" },
              { text: "Desarrollador Full-Stack. ", className: "font-serif italic text-primary" },
              { text: "Especializado en APIs, apps móviles y dashboards analíticos.", className: "font-normal" }
            ]} />
          </div>

          <div className="max-w-2xl mx-auto">
            <ScrollRevealText 
              text="Cuento con experiencia práctica en el despliegue de soluciones en la nube, gestión de bases de datos e integración de servicios de Inteligencia Artificial. Acostumbrado al trabajo colaborativo mediante metodologías ágiles, enfocándome en entregar código robusto utilizando entornos de desarrollo estables."
              className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: EXPERIENCIA & EDUCACIÓN */}
      <section id="experiencia" className="bg-[#0a0a0a] py-32 px-4 border-y border-white/5 relative scroll-mt-24">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-normal text-primary mb-2">Trayectoria.</h2>
            <p className="text-gray-500 font-serif italic text-xl md:text-2xl">Experiencia Laboral & Formación Académica</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Experiencia Columna (Solo TI) */}
            <div className="space-y-12">
              <FeatureCard delay={0.1} className="">
                <div className="border-l border-white/10 pl-6 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6px] top-1.5"></div>
                  <span className="text-primary/60 text-xs font-mono mb-2 block">Marzo 2026 - Mayo 2026</span>
                  <h3 className="text-xl font-medium text-primary mb-1">Desarrollador de Software en Práctica</h3>
                  <p className="text-gray-400 text-sm mb-4">Permify Spa</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-primary/50 shrink-0 mt-0.5"/> Ciclo completo de desarrollo web (Frontend, Backend, APIs).</li>
                    <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-primary/50 shrink-0 mt-0.5"/> Diseño e implementación de BBDD relacionales.</li>
                    <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-primary/50 shrink-0 mt-0.5"/> Creación de dashboards interactivos con KPIs.</li>
                    <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-primary/50 shrink-0 mt-0.5"/> Integración con APIs externas e infraestructura en la nube.</li>
                  </ul>
                </div>
              </FeatureCard>
            </div>

            {/* Educación Columna */}
            <div className="space-y-12">
              <FeatureCard delay={0.2} className="">
                <div className="border-l border-white/10 pl-6 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6px] top-1.5"></div>
                  <span className="text-primary/60 text-xs font-mono mb-2 block">Titulado, 2026</span>
                  <h3 className="text-xl font-medium text-primary mb-1">Analista Programador Computacional</h3>
                  <p className="text-gray-400 text-sm">Instituto Duoc UC</p>
                </div>
              </FeatureCard>

              <FeatureCard delay={0.3} className="">
                <div className="border-l border-white/10 pl-6 relative">
                  <div className="absolute w-3 h-3 bg-[#212121] border border-white/20 rounded-full -left-[6px] top-1.5"></div>
                  <span className="text-gray-500 text-xs font-mono mb-2 block">2018 - 2021</span>
                  <h3 className="text-lg font-medium text-gray-300 mb-1">Enseñanza Media</h3>
                  <p className="text-gray-400 text-sm">Liceo Teniente Francisco Mery Aguirre</p>
                </div>
              </FeatureCard>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: PROYECTOS */}
      <section id="proyectos" className="min-h-screen bg-black relative p-4 py-32 flex flex-col justify-center scroll-mt-24">
        <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none"></div>
        
        <div className="max-w-[1600px] mx-auto w-full relative z-10">
          <div className="mb-16 px-2">
            <div className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight">
              <WordsPullUpMultiStyle segments={[
                { text: "Proyectos Destacados.", className: "text-primary" }
              ]} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:h-[450px]">
            
            {/* Feature Cards 1-3: Projects */}
            {featureCards.map((card, idx) => (
              <FeatureCard key={card.id} delay={0.15 + (idx * 0.15)}>
                <div className="bg-[#111111] border border-white/5 hover:border-primary/20 transition-colors rounded-2xl p-8 h-full flex flex-col justify-between min-h-[350px]">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <img
                        src={card.icon}
                        alt={`Ícono del proyecto ${card.title}`}
                        loading="lazy"
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-lg object-cover grayscale opacity-80"
                      />
                      <span className="text-gray-500 font-mono text-sm">{card.id}</span>
                    </div>
                    <h3 className="text-primary text-2xl font-medium mb-6">{card.title}</h3>
                    <ul className="space-y-4">
                      {card.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-primary/70 mt-1 shrink-0" aria-hidden="true" />
                          <span className="text-gray-400 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <a
                    href="#"
                    aria-label={`Ver detalles del proyecto ${card.title}`}
                    className="inline-flex items-center gap-2 text-primary/80 text-sm font-medium mt-10 group w-max hover:text-primary transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Ver detalles
                    <ArrowRight className="w-4 h-4 -rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                  </a>
                </div>
              </FeatureCard>
            ))}

          </div>
        </div>
      </section>

      {/* SECTION 5: HABILIDADES */}
      <section id="habilidades" className="bg-[#0a0a0a] py-32 px-4 border-t border-white/5 relative overflow-hidden scroll-mt-24">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-6xl mx-auto w-full relative z-10">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-normal text-primary mb-4">Stack Tecnológico.</h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">Herramientas y lenguajes que utilizo para construir soluciones robustas, escalables y eficientes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {skills.map((skillGroup, idx) => (
              <FeatureCard key={idx} delay={0.1 * idx}>
                <div className="bg-[#151515] border border-white/5 p-8 rounded-2xl h-full">
                  <h3 className="text-lg text-primary font-serif italic mb-6">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {skillGroup.tools.map((tool, i) => (
                      <span key={i} className="px-4 py-2 bg-black border border-white/10 text-gray-300 text-xs sm:text-sm rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </FeatureCard>
            ))}
          </div>

          <FeatureCard delay={0.1 * skills.length} className="mt-4 md:mt-6">
            <div className="bg-[#151515] border border-white/5 p-8 rounded-2xl">
              <h3 className="text-lg text-primary font-serif italic mb-6">Idiomas</h3>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang, i) => (
                  <span key={i} className="px-4 py-2 bg-black border border-white/10 text-gray-300 text-xs sm:text-sm rounded-full">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </FeatureCard>
        </div>
      </section>

      {/* SECTION 6: CONTACTO (FOOTER) */}
      <section id="contacto" className="bg-black py-32 px-4 relative overflow-hidden flex justify-center items-center scroll-mt-24">
        <div className="absolute inset-0 bg-noise opacity-[0.2] pointer-events-none"></div>
        
        <div className="max-w-4xl w-full text-center relative z-10">
          <span className="text-primary/60 text-[10px] sm:text-xs tracking-wider uppercase mb-6 block font-mono">Hablemos</span>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-normal text-primary mb-12 tracking-tight">
            Contacto.
          </h2>
          
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-10 mb-20">
            
            <a
              href="mailto:orellanamarco389@gmail.com"
              aria-label="Enviar correo a orellanamarco389@gmail.com"
              className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <div className="w-10 h-10 rounded-full bg-[#151515] border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                <Mail className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-sm">orellanamarco389@gmail.com</span>
            </a>

            <a
              href="tel:+56938731296"
              aria-label="Llamar al +56 9 3873 1296"
              className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <div className="w-10 h-10 rounded-full bg-[#151515] border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                <Phone className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-sm">+569 3873 1296</span>
            </a>

            <a
              href="https://www.linkedin.com/in/marcos-orellana-428124241/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visitar perfil de LinkedIn de Marcos Orellana"
              className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <div className="w-10 h-10 rounded-full bg-[#151515] border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
              <span className="text-sm">Marcos Orellana</span>
            </a>

            <a
              href="https://github.com/S0CRAM53"
              target="_blank"
              rel="noreferrer"
              aria-label="Visitar perfil de GitHub de Marcos Orellana"
              className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <div className="w-10 h-10 rounded-full bg-[#151515] border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </div>
              <span className="text-sm">S0CRAM53</span>
            </a>

          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>© {new Date().getFullYear()} Marcos Orellana Aguirre. Todos los derechos reservados.</p>
            <p>Construido con React, Tailwind v4 & Framer Motion.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;