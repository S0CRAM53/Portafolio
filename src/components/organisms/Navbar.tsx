import type { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  navItems: string[];
  activeTab: string;
  menuOpen: boolean;
  setMenuOpen: (updater: (value: boolean) => boolean) => void;
  handleNavClick: (e: MouseEvent<HTMLAnchorElement>, item: string) => void;
}

const Navbar = ({ navItems, activeTab, menuOpen, setMenuOpen, handleNavClick }: NavbarProps) => {
  return (
    <>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center px-4 md:px-0 pt-4 md:pt-6">
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
    </>
  );
};

export default Navbar;