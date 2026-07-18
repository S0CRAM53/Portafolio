import FeatureCard from '../molecules/FeatureCard';
import type { SkillGroup } from '../../data/portfolioData';

interface SkillsSectionProps {
  skills: SkillGroup[];
  languages: string[];
}

const SkillsSection = ({ skills, languages }: SkillsSectionProps) => {
  return (
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
  );
};

export default SkillsSection;