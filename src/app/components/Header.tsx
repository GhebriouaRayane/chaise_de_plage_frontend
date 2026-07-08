import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ShoppingBag, Waves } from "lucide-react";

const NAV_ITEMS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Produits", href: "#produits" },
  { label: "Personnalisation", href: "#personnalisation" },
  { label: "Galerie", href: "#galerie" },
  { label: "Avis", href: "#avis" },
  { label: "À propos", href: "#apropos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

interface HeaderProps {
  onOrder: () => void;
}

export function Header({ onOrder }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "bg-white/96 backdrop-blur-xl shadow-lg shadow-[#0077B6]/8 border-b border-[#90E0EF]/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav("#accueil")}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0077B6] to-[#00B4D8] flex items-center justify-center shadow-md shadow-[#0077B6]/30 group-hover:shadow-[#0077B6]/50 transition-shadow">
              <Waves size={20} className="text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className={`font-['Playfair_Display'] text-lg transition-colors ${
                  scrolled ? "text-[#1A2E44]" : "text-white"
                }`}
                style={{ fontWeight: 700, lineHeight: 1.1 }}
              >
                Azur Beach
              </span>
              <span
                className={`text-[10px] tracking-[0.15em] uppercase transition-colors ${
                  scrolled ? "text-[#00B4D8]" : "text-[#90E0EF]"
                }`}
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              >
                Chaises de Plage
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-[#00B4D8]/10 ${
                  scrolled
                    ? "text-[#1A2E44] hover:text-[#0077B6]"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOrder}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white shadow-md shadow-[#0077B6]/30 hover:shadow-[#0077B6]/50 transition-shadow"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.875rem" }}
            >
              <ShoppingBag size={16} />
              Commander
            </motion.button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-[#1A2E44] hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-20 left-0 right-0 z-40 bg-white/98 backdrop-blur-xl border-b border-[#90E0EF]/30 shadow-xl shadow-[#0077B6]/10 overflow-hidden"
          >
            <nav className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="text-left px-4 py-3 rounded-lg text-[#1A2E44] hover:bg-[#CAF0F8]/50 hover:text-[#0077B6] transition-colors"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { setMobileOpen(false); onOrder(); }}
                className="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
              >
                <ShoppingBag size={16} />
                Commander
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
