import { Mail, Phone } from 'lucide-react';

const ContactFooter = () => {
  return (
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
            <span className="text-sm">Marco Orellana</span>
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
          <p>© {new Date().getFullYear()} Marcos Orellana. Todos los derechos reservados.</p>
          <p>Construido con React, Tailwind v4 & Framer Motion.</p>
        </div>
      </div>
    </section>
  );
};

export default ContactFooter;