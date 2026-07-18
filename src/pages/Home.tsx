import { useEffect, useState, type MouseEvent } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';

import Navbar from '../components/organisms/Navbar';
import HeroSection from '../components/organisms/HeroSection';
import ProfileSection from '../components/organisms/ProfileSection';
import ExperienceSection from '../components/organisms/ExperienceSection';
import ProjectsSection from '../components/organisms/ProjectsSection';
import SkillsSection from '../components/organisms/SkillsSection';
import ContactFooter from '../components/organisms/ContactFooter';
import ProjectModal from '../components/molecules/ProjectModal';

import { navItems, featureCards, skills, languages, type ProjectCard } from '../data/portfolioData';

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Perfil");
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);

  const lenis = useLenis();

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, item: string) => {
    e.preventDefault();
    setActiveTab(item);
    setMenuOpen(false);

    const targetId = `#${item.toLowerCase()}`;

    if (lenis) {
      lenis.scrollTo(targetId, { offset: -96, duration: 1.2 });
    } else {
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
  }, []);

  return (
    <div className="bg-black min-h-screen text-[#E1E0CC] selection:bg-primary selection:text-black">

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <Navbar
        navItems={navItems}
        activeTab={activeTab}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        handleNavClick={handleNavClick}
      />

      {/* SECTION 1: HERO */}
      <HeroSection />

      {/* SECTION 2: PERFIL */}
      <ProfileSection />

      {/* SECTION 3: EXPERIENCIA & EDUCACIÓN */}
      <ExperienceSection />

      {/* SECTION 4: PROYECTOS */}
      <ProjectsSection featureCards={featureCards} onSelectProject={setSelectedProject} />

      {/* SECTION 5: HABILIDADES */}
      <SkillsSection skills={skills} languages={languages} />

      {/* SECTION 6: CONTACTO (FOOTER) */}
      <ContactFooter />

    </div>
  );
};

export default Home;