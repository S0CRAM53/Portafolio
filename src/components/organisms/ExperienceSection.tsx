import { Check } from 'lucide-react';
import FeatureCard from '../molecules/FeatureCard';

const ExperienceSection = () => {
  return (
    <section id="experiencia" className="bg-[#0a0a0a] py-32 px-4 border-y border-white/5 relative scroll-mt-24">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-normal text-primary mb-2">Trayectoria.</h2>
          <p className="text-gray-500 font-serif italic text-xl md:text-2xl">Experiencia Laboral & Formación Académica</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
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
  );
};

export default ExperienceSection;