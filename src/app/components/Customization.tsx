import { motion } from "motion/react";
import { useState } from "react";
import { Palette, Layers, Ruler, Frame, Package2 } from "lucide-react";

const COLORS = [
  { name: "Bleu Océan", hex: "#0077B6" },
  { name: "Turquoise", hex: "#00B4D8" },
  { name: "Blanc Pur", hex: "#FFFFFF", border: true },
  { name: "Beige Sable", hex: "#C9A96E" },
  { name: "Vert Palme", hex: "#2E7D32" },
  { name: "Corail", hex: "#FF6B6B" },
  { name: "Marine", hex: "#1A2E44" },
  { name: "Citron", hex: "#FFD700" },
];

const FABRICS = [
  { name: "Textilène Pro", desc: "Respirant, anti-UV, séchage rapide", badge: "Recommandé" },
  { name: "Polyester Premium", desc: "Doux, lavable, coloris vifs" },
  { name: "Toile de Teck", desc: "Naturel, ecofriendly, élégant" },
  { name: "Mousse Mémoire", desc: "Confort maximal, soutien optimal", badge: "Luxe" },
];

const DIMENSIONS = [
  { label: "Standard", size: "60 × 190 cm", note: "Usage quotidien" },
  { label: "Large", size: "70 × 200 cm", note: "Grand confort" },
  { label: "XL", size: "80 × 210 cm", note: "Taille XXL" },
];

const STRUCTURES = [
  { name: "Aluminium Anodisé", desc: "Ultra-léger, anti-rouille" },
  { name: "Bois de Teck", desc: "Naturel, chaleureux, durable" },
  { name: "Acier Inoxydable", desc: "Robuste, haut de gamme" },
];

const ACCESSORIES = [
  { name: "Parasol assorti", icon: "☂️" },
  { name: "Table latérale", icon: "🪑" },
  { name: "Porte-boisson", icon: "🥤" },
  { name: "Housse de transport", icon: "👜" },
  { name: "Coussin de tête", icon: "🛏️" },
  { name: "Accroche serviette", icon: "🏖️" },
];

const TABS = [
  { id: "couleurs", label: "Couleurs", icon: Palette },
  { id: "tissus", label: "Tissus", icon: Layers },
  { id: "dimensions", label: "Dimensions", icon: Ruler },
  { id: "structure", label: "Structure", icon: Frame },
  { id: "accessoires", label: "Accessoires", icon: Package2 },
];

export function Customization() {
  const [activeTab, setActiveTab] = useState("couleurs");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[0]);
  const [selectedDim, setSelectedDim] = useState(DIMENSIONS[0]);

  return (
    <section id="personnalisation" className="py-24 bg-white">
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
            Sur Mesure
          </span>
          <h2
            className="text-[#1A2E44] mb-4"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Personnalisez votre chaise
          </h2>
          <p
            className="text-[#4A6B8A] max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
          >
            Créez la chaise de plage de vos rêves. Choisissez les couleurs, les matériaux
            et les accessoires qui vous correspondent.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-xl shadow-[#0077B6]/10">
              <img
                src="https://images.unsplash.com/photo-1569335468885-d7d1a41e570c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
                alt="Personnalisation"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 transition-colors duration-500 mix-blend-multiply opacity-30"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E44]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl border-2 border-white shadow-md" style={{ backgroundColor: selectedColor.hex }} />
                  <div>
                    <p className="text-[#1A2E44]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.9rem" }}>
                      {selectedColor.name}
                    </p>
                    <p className="text-[#4A6B8A] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                      {selectedFabric.name} • {selectedDim.size}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Options */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white shadow-md shadow-[#0077B6]/20"
                      : "bg-[#F0F8FF] text-[#4A6B8A] hover:bg-[#CAF0F8]/50"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === "couleurs" && (
                <div>
                  <p className="text-[#1A2E44] mb-4" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Choisissez votre couleur</p>
                  <div className="grid grid-cols-4 gap-3">
                    {COLORS.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                          selectedColor.name === c.name ? "border-[#0077B6] bg-[#CAF0F8]/30" : "border-transparent hover:border-[#CAF0F8]"
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-xl shadow-md"
                          style={{ backgroundColor: c.hex, border: c.border ? "1.5px solid #e2e8f0" : "none" }}
                        />
                        <span className="text-[#4A6B8A] text-xs text-center" style={{ fontFamily: "Inter, sans-serif" }}>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "tissus" && (
                <div className="space-y-3">
                  <p className="text-[#1A2E44] mb-4" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Sélectionnez votre tissu</p>
                  {FABRICS.map((f) => (
                    <button
                      key={f.name}
                      onClick={() => setSelectedFabric(f)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                        selectedFabric.name === f.name ? "border-[#0077B6] bg-[#CAF0F8]/30" : "border-[#F0F8FF] hover:border-[#CAF0F8]"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${selectedFabric.name === f.name ? "border-[#0077B6] bg-[#0077B6]" : "border-gray-300"}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[#1A2E44]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.9rem" }}>{f.name}</span>
                          {f.badge && <span className="text-xs px-2 py-0.5 rounded-full bg-[#0077B6] text-white" style={{ fontFamily: "Inter, sans-serif" }}>{f.badge}</span>}
                        </div>
                        <p className="text-[#4A6B8A] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{f.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === "dimensions" && (
                <div className="space-y-3">
                  <p className="text-[#1A2E44] mb-4" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Choisissez la taille</p>
                  {DIMENSIONS.map((d) => (
                    <button
                      key={d.label}
                      onClick={() => setSelectedDim(d)}
                      className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 text-left transition-all ${
                        selectedDim.label === d.label ? "border-[#0077B6] bg-[#CAF0F8]/30" : "border-[#F0F8FF] hover:border-[#CAF0F8]"
                      }`}
                    >
                      <div>
                        <span className="text-[#1A2E44]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1rem" }}>{d.label}</span>
                        <p className="text-[#4A6B8A] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{d.note}</p>
                      </div>
                      <span className="text-[#0077B6]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>{d.size}</span>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === "structure" && (
                <div className="space-y-3">
                  <p className="text-[#1A2E44] mb-4" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Choisissez la structure</p>
                  {STRUCTURES.map((s) => (
                    <div key={s.name} className="flex items-center gap-4 p-5 rounded-2xl border-2 border-[#F0F8FF] hover:border-[#CAF0F8] transition-colors cursor-pointer">
                      <Frame size={24} className="text-[#00B4D8] flex-shrink-0" />
                      <div>
                        <p className="text-[#1A2E44]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{s.name}</p>
                        <p className="text-[#4A6B8A] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "accessoires" && (
                <div>
                  <p className="text-[#1A2E44] mb-4" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Accessoires disponibles</p>
                  <div className="grid grid-cols-2 gap-3">
                    {ACCESSORIES.map((a) => (
                      <div key={a.name} className="flex items-center gap-3 p-4 rounded-2xl bg-[#F0F8FF] hover:bg-[#CAF0F8]/50 transition-colors cursor-pointer">
                        <span className="text-2xl">{a.icon}</span>
                        <span className="text-[#1A2E44] text-sm" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{a.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8"
            >
              <button
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white shadow-lg shadow-[#0077B6]/25"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1rem" }}
              >
                Demander un devis personnalisé
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
