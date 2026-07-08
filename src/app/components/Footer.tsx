import { motion } from "motion/react";
import { useState } from "react";
import { Waves, Facebook, Instagram, Youtube, Twitter, Send, ChevronRight } from "lucide-react";

const FOOTER_NAV = {
  "Navigation": ["Accueil", "Produits", "Personnalisation", "Galerie", "Avis", "À propos", "FAQ", "Contact"],
  "Produits": ["Classique Azur", "Premium Horizon", "Tradition Sahel", "Luxe Sunset", "Accessoires"],
  "Légal": ["Mentions légales", "Politique de confidentialité", "Conditions générales", "Politique de retour"],
};

const SOCIALS = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
  { icon: Twitter, label: "Twitter" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  const handleNavClick = (item: string) => {
    const map: Record<string, string> = {
      "Accueil": "#accueil", "Produits": "#produits", "Personnalisation": "#personnalisation",
      "Galerie": "#galerie", "Avis": "#avis", "À propos": "#apropos", "FAQ": "#faq", "Contact": "#contact",
    };
    const href = map[item];
    if (href) document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0D1F33] text-white">
      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-[#0077B6] to-[#00B4D8] py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3
                className="text-white mb-1"
                style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem" }}
              >
                Restez informé de nos offres exclusives
              </h3>
              <p className="text-white/70" style={{ fontFamily: "Inter, sans-serif" }}>
                Inscrivez-vous et recevez -10% sur votre première commande.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-0 min-w-[360px] max-w-sm w-full">
              {subscribed ? (
                <div className="flex items-center gap-2 bg-white/20 rounded-2xl px-5 py-3.5 flex-1">
                  <Send size={16} className="text-white" />
                  <span className="text-white text-sm" style={{ fontFamily: "Inter, sans-serif" }}>Merci ! Code : AZUR10</span>
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="flex-1 px-5 py-3.5 rounded-l-2xl bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 outline-none focus:bg-white/25 transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                  <button
                    type="submit"
                    className="px-5 py-3.5 rounded-r-2xl bg-white text-[#0077B6] hover:bg-white/90 transition-colors flex-shrink-0"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}
                  >
                    S'inscrire
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0077B6] to-[#00B4D8] flex items-center justify-center shadow-md shadow-[#0077B6]/30">
                <Waves size={20} className="text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.1rem" }}>Azur Beach</span>
                <span className="text-[#90E0EF] text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>Chaises de Plage</span>
              </div>
            </div>
            <p
              className="text-white/50 mb-6 max-w-xs"
              style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7, fontSize: "0.875rem" }}
            >
              Spécialiste algérien de la chaise de plage premium. Qualité, confort et livraison dans les 58 wilayas.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <button
                  key={s.label}
                  className="w-9 h-9 rounded-xl bg-white/8 hover:bg-[#0077B6]/60 flex items-center justify-center transition-colors"
                  title={s.label}
                >
                  <s.icon size={16} className="text-white/70" />
                </button>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(FOOTER_NAV).map(([section, items]) => (
            <div key={section}>
              <h4
                className="text-white mb-5"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "0.875rem", letterSpacing: "0.05em", textTransform: "uppercase" }}
              >
                {section}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => handleNavClick(item)}
                      className="text-white/50 hover:text-[#90E0EF] transition-colors flex items-center gap-1 group"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
                    >
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1 text-[#90E0EF]" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-white/35 text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            © 2025 Azur Beach. Tous droits réservés. Made in Algeria 🇩🇿
          </p>
          <p
            className="text-white/25 text-xs"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Livraison dans les 58 wilayas · Paiement à la livraison · Garantie 2 ans
          </p>
        </div>
      </div>
    </footer>
  );
}
