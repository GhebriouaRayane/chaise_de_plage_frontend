import { motion } from "motion/react";
import { ArrowDown, ChevronRight, Star } from "lucide-react";

interface HeroProps {
  onOrder: () => void;
}

export function Hero({ onOrder }: HeroProps) {
  const scrollToProducts = () => {
    document.querySelector("#produits")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1770306924247-a6f94261688e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=85"
          alt="Chaises de plage luxueuses"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2E44]/85 via-[#0077B6]/60 to-[#00B4D8]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E44]/60 via-transparent to-transparent" />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#90E0EF]/40"
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full pt-24 pb-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 mb-8"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-[#FFD700] text-[#FFD700]" />
              ))}
            </div>
            <span
              className="text-white/90 text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              +500 clients satisfaits en Algérie
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-white mb-6 leading-[1.1]"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            }}
          >
            Profitez de l'été avec{" "}
            <span className="relative">
              <span className="text-[#90E0EF]">un confort absolu.</span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#90E0EF] to-transparent origin-left"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/80 mb-10 max-w-xl"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "1.125rem",
              lineHeight: 1.7,
            }}
          >
            Découvrez notre collection exclusive de chaises de plage premium, conçues pour
            transformer chaque moment au soleil en une expérience inoubliable. Livraison
            partout en Algérie.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 20px 40px rgba(0,119,182,0.5)" }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToProducts}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white shadow-xl shadow-[#0077B6]/30"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1rem" }}
            >
              Découvrir nos modèles
              <ChevronRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.97 }}
              onClick={onOrder}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/30 text-white transition-colors"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1rem" }}
            >
              Commander maintenant
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-8"
          >
            {[
              { value: "500+", label: "Clients satisfaits" },
              { value: "58", label: "Wilayas livrées" },
              { value: "5 ans", label: "D'expérience" },
              { value: "100%", label: "Qualité garantie" },
            ].map((stat) => (
              <div key={stat.value} className="flex flex-col">
                <span
                  className="text-white"
                  style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-white/60 text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToProducts}
      >
        <span
          className="text-white/50 text-xs tracking-widest uppercase"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={20} className="text-white/50" />
        </motion.div>
      </motion.div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 80L60 68.7C120 57.3 240 34.7 360 29.3C480 24 600 36 720 42.7C840 49.3 960 50.7 1080 46.7C1200 42.7 1320 33.3 1380 28.7L1440 24V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
