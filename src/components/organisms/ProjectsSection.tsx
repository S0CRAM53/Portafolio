import { ArrowRight, Check } from 'lucide-react';
import WordsPullUpMultiStyle from '../atoms/WordsPullUpMultiStyle';
import FeatureCard from '../molecules/FeatureCard';
import type { ProjectCard } from '../../data/portfolioData';

interface ProjectsSectionProps {
  featureCards: ProjectCard[];
  onSelectProject: (project: ProjectCard) => void;
}

const ProjectsSection = ({ featureCards, onSelectProject }: ProjectsSectionProps) => {
  return (
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

                <button
                  onClick={() => {
                    if(card.details) onSelectProject(card);
                    else alert("Los detalles de este proyecto se actualizarán pronto.");
                  }}
                  aria-label={`Ver detalles del proyecto ${card.title}`}
                  className="inline-flex items-center gap-2 text-primary/80 text-sm font-medium mt-10 group w-max hover:text-primary transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Ver detalles
                  <ArrowRight className="w-4 h-4 -rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </button>
              </div>
            </FeatureCard>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;