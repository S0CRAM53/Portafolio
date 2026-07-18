import WordsPullUpMultiStyle from '../atoms/WordsPullUpMultiStyle';
import ScrollRevealText from '../atoms/ScrollRevealText';

const ProfileSection = () => {
  return (
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
  );
};

export default ProfileSection;