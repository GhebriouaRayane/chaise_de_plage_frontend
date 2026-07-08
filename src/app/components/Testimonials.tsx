import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Karim Benali",
    city: "Alger",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80&q=80",
    rating: 5,
    comment: "Qualité exceptionnelle ! La chaise Classique Azur est parfaite pour notre maison de plage à Tipaza. Livraison rapide et emballage soigné. Je recommande vivement.",
    date: "Juin 2025",
    product: "Classique Azur",
  },
  {
    id: 2,
    name: "Samira Hadj",
    city: "Oran",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80&q=80",
    rating: 5,
    comment: "J'ai commandé 4 chaises Premium Horizon pour notre piscine. Le résultat est magnifique, exactement comme sur les photos. Service client très réactif.",
    date: "Mai 2025",
    product: "Premium Horizon",
  },
  {
    id: 3,
    name: "Youcef Mansouri",
    city: "Annaba",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80&q=80",
    rating: 5,
    comment: "Produit de très haute qualité. La Luxe Sunset est un chef d'œuvre — mes invités sont toujours impressionnés. Investissement qui vaut vraiment le prix.",
    date: "Juillet 2025",
    product: "Luxe Sunset",
  },
  {
    id: 4,
    name: "Nadia Bouzid",
    city: "Constantine",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80&q=80",
    rating: 4,
    comment: "Très satisfaite de mon achat. Les chaises sont confortables et résistantes. La livraison à Constantine était rapide. Je commanderai à nouveau l'an prochain.",
    date: "Août 2025",
    product: "Tradition Sahel",
  },
  {
    id: 5,
    name: "Ahmed Rahmani",
    city: "Béjaïa",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80&q=80",
    rating: 5,
    comment: "Première commande et déjà conquis ! La qualité est au rendez-vous, les matériaux sont premium. Parfait pour notre villa face à la mer à Béjaïa.",
    date: "Juin 2025",
    product: "Classique Azur",
  },
  {
    id: 6,
    name: "Leila Chaouch",
    city: "Blida",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80&q=80",
    rating: 5,
    comment: "Service impeccable du début à la fin. Le formulaire de commande est simple, la livraison ponctuelle, et le produit dépasse toutes mes attentes. Merci !",
    date: "Juillet 2025",
    product: "Premium Horizon",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "fill-[#FFD700] text-[#FFD700]" : "fill-gray-200 text-gray-200"}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="avis" className="py-24 bg-white overflow-hidden">
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
            Témoignages
          </span>
          <h2
            className="text-[#1A2E44] mb-4"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Ce que disent nos clients
          </h2>
          <p
            className="text-[#4A6B8A] max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
          >
            La satisfaction de nos clients est notre plus grande fierté. Voici leurs
            retours authentiques.
          </p>

          {/* Overall rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} className="fill-[#FFD700] text-[#FFD700]" />
              ))}
            </div>
            <span
              className="text-[#1A2E44]"
              style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem" }}
            >
              4.9/5
            </span>
            <span className="text-[#4A6B8A]" style={{ fontFamily: "Inter, sans-serif" }}>
              basé sur 340+ avis
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-3xl p-7 shadow-md shadow-[#0077B6]/8 border border-[#F0F8FF] hover:shadow-lg hover:shadow-[#0077B6]/12 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="w-10 h-10 rounded-xl bg-[#CAF0F8]/50 flex items-center justify-center mb-5">
                <Quote size={18} className="text-[#0077B6]" />
              </div>

              <StarRating rating={review.rating} />

              <p
                className="text-[#4A6B8A] my-4"
                style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7, fontSize: "0.9rem" }}
              >
                "{review.comment}"
              </p>

              <div className="pt-4 border-t border-[#F0F8FF] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p
                      className="text-[#1A2E44]"
                      style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.875rem" }}
                    >
                      {review.name}
                    </p>
                    <p className="text-[#4A6B8A] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                      {review.city}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#0077B6] text-xs" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                    {review.product}
                  </p>
                  <p className="text-[#4A6B8A] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                    {review.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
