import { useEffect, useRef, type ReactNode } from 'react';
import './index.css';

interface RevealProps {
  children: ReactNode;
  className?: string;
}

function Reveal({ children, className = "" }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function App() {
  return (
    <div className="portfolio-app">
      {/* NAVEGACIÓN (Entrada inmediata al cargar) */}
      <nav className="navbar">
        <div className="navbar-brand">MO.</div>
        <div>
          <a href="#experiencia" style={{ color: 'var(--text-light)', marginRight: '1.5rem', textDecoration: 'none', fontSize: '0.95rem' }}>Experiencia</a>
          <a href="#proyectos" style={{ color: 'var(--text-light)', marginRight: '1.5rem', textDecoration: 'none', fontSize: '0.95rem' }}>Proyectos</a>
          <a href="#habilidades" style={{ color: 'var(--text-light)', textDecoration: 'none', fontSize: '0.95rem' }}>Habilidades</a>
        </div>
      </nav>

      {/* HERO SECTION (Animaciones escalonadas nativas al cargar) */}
      <header className="hero-section">
        <h1 className="hero-title animate-fade-in-up delay-1">Marcos Orellana Aguirre</h1>
        <h2 className="hero-subtitle animate-fade-in-up delay-2">Desarrollador Full-Stack</h2>
        <p className="hero-description animate-fade-in-up delay-3">
          Analista Programador Computacional especializado en la creación de APIs RESTful, 
          desarrollo de aplicaciones móviles y construcción de dashboards analíticos. 
          Enfocado en entregar código robusto y soluciones estables.
        </p>
        <div className="hero-actions animate-fade-in-up delay-4">
          <a href="/Marco_orellana_CV.pdf" download className="btn-primary">Descargar CV</a>
          <a href="https://www.linkedin.com/in/marcos-orellana-428124241/" target="_blank" rel="noreferrer" className="btn-secondary">LinkedIn</a>
        </div>
      </header>

      {/* SECCIÓN EXPERIENCIA (Reveal al hacer scroll) */}
      <section id="experiencia" className="section-dark">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Mi <span>Experiencia</span></h2>
          </Reveal>
          
          <Reveal>
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h3>Desarrollador de Software en Práctica</h3>
              <span className="date">Permify Spa | Marzo 2026 - Mayo 2026</span>
              <p>
                Participación en el ciclo completo de desarrollo web (Frontend, Backend, APIs). 
                Diseño e implementación de modelos de bases de datos relacionales. Creación de dashboards interactivos 
                con KPIs para visualización de métricas. Integración de servicios con APIs externas y optimización de 
                infraestructura en la nube.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECCIÓN PROYECTOS (Reveal en grupo y escalonado) */}
      <section id="proyectos" className="section-base">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Proyectos <span>Destacados</span></h2>
          </Reveal>
          
          <div className="grid-cards">
            {/* Proyecto 1 */}
            <Reveal className="stagger-1">
              <div className="card">
                <h3>WebLanding Suite</h3>
                <p>Plataforma SaaS para generación de landing pages automatizadas integrando múltiples APIs de IA de vanguardia.</p>
                <div className="tags-container">
                  <span className="tag">SaaS</span>
                  <span className="tag">IA APIs</span>
                  <span className="tag">Full-Stack</span>
                </div>
              </div>
            </Reveal>

            {/* Proyecto 2 */}
            <Reveal className="stagger-2">
              <div className="card">
                <h3>Healflow Analytics / REM SJ</h3>
                <p>Sistema analítico hospitalario que unifica métricas médicas complejas a través de dashboards interactivos ágiles.</p>
                <div className="tags-container">
                  <span className="tag">Python</span>
                  <span className="tag">PostgreSQL</span>
                  <span className="tag">Chart.js</span>
                </div>
              </div>
            </Reveal>

            {/* Proyecto 3 */}
            <Reveal className="stagger-3">
              <div className="card">
                <h3>OnlyKick App</h3>
                <p>Aplicación móvil e-commerce nativa enfocada en la venta de calzado, con alto rendimiento en transiciones de UI.</p>
                <div className="tags-container">
                  <span className="tag">Kotlin</span>
                  <span className="tag">Android Studio</span>
                  <span className="tag">Jetpack Compose</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECCIÓN HABILIDADES (Reveal por categoría) */}
      <section id="habilidades" className="section-dark">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Stack <span>Tecnológico</span></h2>
          </Reveal>
          
          <div className="skills-flex">
            
            <Reveal className="stagger-1">
              <div className="skill-category">
                <h4>Lenguajes & Frameworks</h4>
                <div className="tags-container">
                  <span className="tag">Kotlin</span>
                  <span className="tag">Python (Django, FastAPI)</span>
                  <span className="tag">Java (Spring Boot)</span>
                  <span className="tag">JavaScript / TypeScript</span>
                  <span className="tag">React</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="stagger-2">
              <div className="skill-category">
                <h4>Bases de Datos</h4>
                <div className="tags-container">
                  <span className="tag">PostgreSQL</span>
                  <span className="tag">NeonDB</span>
                  <span className="tag">MongoDB</span>
                  <span className="tag">SQL Developer</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="stagger-3">
              <div className="skill-category">
                <h4>Herramientas & Despliegue</h4>
                <div className="tags-container">
                  <span className="tag">Git & GitHub</span>
                  <span className="tag">Android Studio</span>
                  <span className="tag">Render</span>
                  <span className="tag">REST APIs</span>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: 'var(--sable)', padding: '2.5rem 2rem', textAlign: 'center', borderTop: '1px solid var(--charcoal)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} Marcos Orellana. Desarrollado de manera nativa con React, TypeScript y Vite.
        </p>
      </footer>
    </div>
  );
}

export default App;