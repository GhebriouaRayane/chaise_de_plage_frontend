import { motion } from "motion/react";
import { Target, Eye, Heart } from "lucide-react";

export function About() {
  return (
    <section id="apropos" className="py-24 bg-gradient-to-br from-[#1A2E44] to-[#0077B6] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#00B4D8]/10 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#90E0EF]/10 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden h-52 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1769566751860-f7fafe3049c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500&q=80"
                    alt="Notre histoire"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden h-36 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1770306924247-a6f94261688e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500&q=80"
                    alt="Savoir-faire"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-3xl overflow-hidden h-36 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1760943015321-361072c80d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500&q=80"
                    alt="Qualité"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden h-52 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1537160833943-1b610e77231c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500&q=80"
                    alt="Plage"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-5 text-center">
              <p className="text-[#0077B6]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "2rem" }}>5</p>
              <p className="text-[#1A2E44] text-xs" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>ans d'expérience</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white/80 text-sm mb-6"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
            >
              Notre Histoire
            </span>
            <h2
              className="text-white mb-6"
              style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.2 }}
            >
              Passionnés par l'art du confort balnéaire
            </h2>
            <p
              className="text-white/75 mb-6"
              style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.8 }}
            >
              Fondée en 2020 à Alger, Azur Beach est née d'une passion profonde pour les
              plages algériennes et le désir d'offrir aux familles algériennes un confort
              balnéaire digne des meilleurs resorts méditerranéens.
            </p>
            <p
              className="text-white/75 mb-10"
              style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.8 }}
            >
              Nos artisans sélectionnent minutieusement chaque matériau pour garantir une
              durabilité exceptionnelle sous le soleil algérien. Chaque chaise est testée
              pendant 200 heures avant d'être livrée.
            </p>

            {/* Mission, Vision, Values */}
            <div className="space-y-5">
              {[
                {
                  icon: Target,
                  title: "Notre Mission",
                  desc: "Démocratiser le luxe balnéaire en Algérie en rendant le confort premium accessible à tous.",
                },
                {
                  icon: Eye,
                  title: "Notre Vision",
                  desc: "Devenir la marque de référence en matière de mobilier de plage premium dans toute l'Algérie.",
                },
                {
                  icon: Heart,
                  title: "Nos Valeurs",
                  desc: "Qualité, durabilité, service client exceptionnel et respect de l'environnement.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon size={18} className="text-[#90E0EF]" />
                  </div>
                  <div>
                    <h4 className="text-white mb-1" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}>{item.title}</h4>
                    <p className="text-white/65 text-sm" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
