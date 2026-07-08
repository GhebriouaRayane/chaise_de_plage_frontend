import { motion } from "motion/react";
import { Shield, Sun, Truck, Leaf, Award, HeadphonesIcon } from "lucide-react";

const REASONS = [
  {
    icon: Award,
    title: "Matériaux Premium",
    description: "Nous utilisons exclusivement des matériaux de haute qualité : bois de teck certifié, aluminium marine grade, et tissus techniques UV.",
    color: "#0077B6",
    bg: "#CAF0F8",
  },
  {
    icon: Sun,
    title: "Résistance Totale",
    description: "Nos chaises sont testées pour résister aux conditions extrêmes : chaleur intense, soleil, eau salée et humidité algérienne.",
    color: "#FFB300",
    bg: "#FFF8E1",
  },
  {
    icon: Truck,
    title: "Livraison Rapide",
    description: "Livraison express dans les 48h pour Alger et région, et sous 72h pour les autres wilayas. Suivi en temps réel.",
    color: "#00B4D8",
    bg: "#E0F7FA",
  },
  {
    icon: Leaf,
    title: "Fabrication Durable",
    description: "Engagés pour l'environnement, nous utilisons des matériaux recyclables et des procédés de fabrication éco-responsables.",
    color: "#2E7D32",
    bg: "#E8F5E9",
  },
  {
    icon: Shield,
    title: "Garantie 2 Ans",
    description: "Chaque produit est couvert par une garantie complète de 24 mois. Nous remplaçons tout produit défectueux sans frais.",
    color: "#7B1FA2",
    bg: "#F3E5F5",
  },
  {
    icon: HeadphonesIcon,
    title: "Service Client 7j/7",
    description: "Notre équipe est disponible 7 jours sur 7 pour vous accompagner, répondre à vos questions et assurer votre satisfaction.",
    color: "#E64A19",
    bg: "#FBE9E7",
  },
];

export function WhyUs() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#F0F8FF] to-white overflow-hidden">
      {/* Top wave */}
      <div className="relative -mt-24 mb-12">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 0L60 10.7C120 21.3 240 42.7 360 48C480 53.3 600 42.7 720 37.3C840 32 960 32 1080 37.3C1200 42.7 1320 53.3 1380 58.7L1440 64V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z"
            fill="#F0F8FF"
          />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full bg-[#CAF0F8] text-[#0077B6] text-sm mb-4"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
          >
            Nos Engagements
          </span>
          <h2
            className="text-[#1A2E44] mb-4"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Pourquoi nous choisir ?
          </h2>
          <p
            className="text-[#4A6B8A] max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
          >
            Chez Azur Beach, chaque détail compte. Voici pourquoi des centaines de clients
            nous font confiance pour leurs moments de détente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, boxShadow: `0 20px 40px ${reason.color}20` }}
              className="bg-white rounded-3xl p-7 shadow-md shadow-gray-100 border border-gray-50 cursor-default transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: reason.bg }}
              >
                <reason.icon size={26} style={{ color: reason.color }} />
              </div>
              <h3
                className="text-[#1A2E44] mb-3"
                style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.2rem" }}
              >
                {reason.title}
              </h3>
              <p
                className="text-[#4A6B8A] text-sm"
                style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
              >
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
