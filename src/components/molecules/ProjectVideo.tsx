interface ProjectVideoProps {
  src: string;
  poster?: string;
  title: string;
}

const ProjectVideo = ({ src, poster, title }: ProjectVideoProps) => {
  return (
    <section>
      <h3 className="text-xl text-white mb-4 font-serif italic">Demo en Video</h3>
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
        <video
          controls
          preload="none"
          poster={poster}
          className="w-full aspect-video"
          aria-label={`Video demo del proyecto ${title}`}
        >
          <source src={src} type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>
      </div>
    </section>
  );
};

export default ProjectVideo;