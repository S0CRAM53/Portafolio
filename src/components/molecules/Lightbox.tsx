import { X } from 'lucide-react';

interface LightboxProps {
  src: string;
  onClose: () => void;
}

const Lightbox = ({ src, onClose }: LightboxProps) => {
  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-8 bg-black/95"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Cerrar vista ampliada"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-white/10 border border-white/10 rounded-full text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <X className="w-6 h-6" />
      </button>
      <img
        src={src}
        alt="Vista ampliada de la captura"
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-full rounded-lg shadow-2xl"
      />
    </div>
  );
};

export default Lightbox;