import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    id: 1,
    question: "Quels sont les délais de livraison ?",
    answer: "Nous livrons sous 24 à 48h pour Alger, Blida, Tipaza et Boumerdès. Pour les autres wilayas du nord, comptez 48 à 72h. Pour le sud algérien, la livraison prend 3 à 5 jours ouvrables. Vous recevez un SMS de suivi dès l'expédition.",
  },
  {
    id: 2,
    question: "Quelle est la garantie sur les produits ?",
    answer: "Tous nos produits sont couverts par une garantie de 24 mois couvrant les défauts de fabrication et les matériaux. En cas de problème, nous remplaçons ou remboursons le produit sans frais supplémentaires. Il suffit de nous contacter avec une photo du défaut.",
  },
  {
    id: 3,
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Nous acceptons le paiement à la livraison (mode préféré), le virement bancaire CCP ou Barid Bank, et le paiement par chèque. Aucun paiement en ligne n'est requis — commandez en toute confiance.",
  },
  {
    id: 4,
    question: "Puis-je personnaliser ma chaise ?",
    answer: "Absolument ! Nous proposons une large gamme d'options : couleurs (8 coloris disponibles), tissus (4 matières), dimensions (Standard, Large, XL), structures (aluminium, bois de teck, acier inoxydable) et accessoires. Contactez-nous pour un devis personnalisé.",
  },
  {
    id: 5,
    question: "Comment entretenir ma chaise de plage ?",
    answer: "Rincez simplement à l'eau claire après chaque utilisation en bord de mer. Pour les taches, utilisez un savon doux et une brosse souple. Évitez les produits chimiques agressifs. En fin de saison, rangez la chaise dans un endroit sec et couvert. Nos tissus textilène ne nécessitent aucun traitement spécial.",
  },
  {
    id: 6,
    question: "Puis-je retourner un produit ?",
    answer: "Oui, vous disposez de 14 jours après réception pour retourner un produit non utilisé dans son emballage d'origine. Les frais de retour sont à votre charge, sauf en cas de défaut de fabrication. Le remboursement est effectué sous 5 jours ouvrables après réception du retour.",
  },
  {
    id: 7,
    question: "Les chaises résistent-elles à la chaleur algérienne ?",
    answer: "Nos chaises sont spécialement conçues pour le climat méditerranéen et saharien. Les tissus textilène résistent à plus de 80°C, les structures aluminium ne rouillent pas, et toutes les peintures et finitions sont traitées anti-UV. Elles sont testées pour une utilisation intensive sous le soleil algérien.",
  },
  {
    id: 8,
    question: "Livrez-vous dans toutes les wilayas ?",
    answer: "Oui ! Nous livrons dans les 58 wilayas d'Algérie. Les frais de livraison varient selon la distance : à partir de 350 DA pour la région d'Alger, jusqu'à 1500 DA pour les wilayas du grand sud. Le montant exact est calculé automatiquement lors de votre commande.",
  },
];

function FAQItem({ faq, isOpen, onToggle }: {
  faq: typeof FAQS[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`rounded-2xl border-2 overflow-hidden transition-colors ${isOpen ? "border-[#00B4D8] bg-[#CAF0F8]/20" : "border-[#F0F8FF] bg-white hover:border-[#CAF0F8]"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 p-6 text-left"
      >
        <span
          className="text-[#1A2E44] flex-1"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.5 }}
        >
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${isOpen ? "bg-[#0077B6] text-white" : "bg-[#F0F8FF] text-[#4A6B8A]"}`}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6">
              <p
                className="text-[#4A6B8A]"
                style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.75, fontSize: "0.9rem" }}
              >
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section id="faq" className="py-24 bg-[#F0F8FF]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full bg-[#CAF0F8] text-[#0077B6] text-sm mb-6"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
            >
              FAQ
            </span>
            <h2
              className="text-[#1A2E44] mb-6"
              style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.2 }}
            >
              Questions fréquentes
            </h2>
            <p
              className="text-[#4A6B8A] mb-8"
              style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
            >
              Vous ne trouvez pas votre réponse ? Notre équipe est disponible 7j/7 pour vous aider.
            </p>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white shadow-md shadow-[#0077B6]/20 hover:shadow-[#0077B6]/40 transition-shadow"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
            >
              Nous contacter
            </a>
          </motion.div>

          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3"
          >
            {FAQS.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
