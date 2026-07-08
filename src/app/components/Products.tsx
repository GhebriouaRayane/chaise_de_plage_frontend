import { motion } from "motion/react";
import { ShoppingBag, Eye, Check, Star } from "lucide-react";
import { useState } from "react";
import { ProductDetailModal } from "./ProductDetailModal";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: "nouveau" | "bestseller";
  features: string[];
  available: boolean;
  rating: number;
  reviews: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Classique Azur",
    description: "Chaise de plage élégante en bois naturel avec coussin imperméable. Design intemporel, confort optimal.",
    price: 4500,
    image: "https://images.unsplash.com/photo-1569335468885-d7d1a41e570c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    badge: "bestseller",
    features: ["Structure en bois de teck", "Coussin imperméable", "Pliable et léger", "Résistant UV"],
    available: true,
    rating: 4.9,
    reviews: 128,
  },
  {
    id: 2,
    name: "Premium Horizon",
    description: "Transat de luxe à dossier réglable, idéal pour les longues journées au soleil. Matériaux premium.",
    price: 7200,
    image: "https://images.unsplash.com/photo-1503003378590-66f89f543bc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    badge: "nouveau",
    features: ["Aluminium anodisé", "5 positions réglables", "Repose-tête inclus", "Garantie 2 ans"],
    available: true,
    rating: 4.8,
    reviews: 94,
  },
  {
    id: 3,
    name: "Tradition Sahel",
    description: "Inspirée du style méditerranéen, cette chaise combine charme authentique et durabilité exceptionnelle.",
    price: 3800,
    image: "https://images.unsplash.com/photo-1760943015321-361072c80d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    features: ["Tissage artisanal", "Structure robuste", "Couleurs vives", "Facile d'entretien"],
    available: true,
    rating: 4.7,
    reviews: 76,
  },
  {
    id: 4,
    name: "Luxe Sunset",
    description: "Notre modèle haut de gamme — la quintessence du luxe balnéaire pour les amateurs de confort absolu.",
    price: 12500,
    image: "https://images.unsplash.com/photo-1762778487706-9835a21b5c45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    badge: "nouveau",
    features: ["Design exclusif", "Matériaux premium", "Personnalisable", "Livraison prioritaire"],
    available: true,
    rating: 5.0,
    reviews: 42,
  },
];

interface ProductsProps {
  onOrder: (product: Product) => void;
}

function ProductCard({ product, onOrder, index }: { product: Product; onOrder: (p: Product) => void; index: number }) {
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group bg-white rounded-3xl overflow-hidden shadow-md shadow-[#0077B6]/8 hover:shadow-xl hover:shadow-[#0077B6]/15 transition-all duration-400 flex flex-col"
      >
        {/* Image */}
        <div className="relative overflow-hidden h-64">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-107 transition-transform duration-500"
          />
          {/* Badges */}
          {product.badge && (
            <div
              className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold ${
                product.badge === "bestseller"
                  ? "bg-[#FFD700] text-[#1A2E44]"
                  : "bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {product.badge === "bestseller" ? "⭐ Meilleure vente" : "✨ Nouveau"}
            </div>
          )}
          {/* Availability */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm">
              <div className={`w-1.5 h-1.5 rounded-full ${product.available ? "bg-green-500" : "bg-red-400"}`} />
              <span
                className="text-xs text-[#1A2E44]"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              >
                {product.available ? "En stock" : "Indisponible"}
              </span>
            </div>
          </div>
          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-[#0077B6]/0 group-hover:bg-[#0077B6]/10 transition-colors duration-300 flex items-center justify-center">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setDetailOpen(true)}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 text-[#0077B6] shadow-lg"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.875rem" }}
            >
              <Eye size={15} />
              Voir le produit
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={i < Math.floor(product.rating) ? "fill-[#FFD700] text-[#FFD700]" : "text-gray-200 fill-gray-200"}
                />
              ))}
            </div>
            <span className="text-xs text-[#4A6B8A]" style={{ fontFamily: "Inter, sans-serif" }}>
              {product.rating} ({product.reviews} avis)
            </span>
          </div>

          <h3
            className="text-[#1A2E44] mb-2"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.25rem" }}
          >
            {product.name}
          </h3>
          <p
            className="text-[#4A6B8A] text-sm mb-4 flex-1"
            style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}
          >
            {product.description}
          </p>

          {/* Features */}
          <ul className="space-y-1.5 mb-5">
            {product.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-[#4A6B8A]" style={{ fontFamily: "Inter, sans-serif" }}>
                <Check size={14} className="text-[#00B4D8] flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {/* Price */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <span
                className="text-[#0077B6]"
                style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem" }}
              >
                {product.price.toLocaleString("fr-DZ")}
              </span>
              <span className="text-[#4A6B8A] text-sm ml-1" style={{ fontFamily: "Inter, sans-serif" }}>DA</span>
            </div>
            <span className="text-xs text-[#4A6B8A] bg-[#CAF0F8]/50 px-2 py-1 rounded-lg" style={{ fontFamily: "Inter, sans-serif" }}>
              Livraison offerte*
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setDetailOpen(true)}
              className="flex-1 py-3 rounded-xl border-2 border-[#0077B6] text-[#0077B6] hover:bg-[#0077B6]/5 transition-colors"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.875rem" }}
            >
              Voir détails
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOrder(product)}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white flex items-center justify-center gap-2 shadow-md shadow-[#0077B6]/20 hover:shadow-[#0077B6]/40 transition-shadow"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.875rem" }}
            >
              <ShoppingBag size={15} />
              Commander
            </motion.button>
          </div>
        </div>
      </motion.div>

      <ProductDetailModal
        product={product}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onOrder={onOrder}
      />
    </>
  );
}

export function Products({ onOrder }: ProductsProps) {
  return (
    <section id="produits" className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
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
            Notre Collection
          </span>
          <h2
            className="text-[#1A2E44] mb-4"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Nos Produits
          </h2>
          <p
            className="text-[#4A6B8A] max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
          >
            Chaque modèle est soigneusement conçu pour offrir le parfait équilibre entre
            élégance, durabilité et confort sous le soleil algérien.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} onOrder={onOrder} index={i} />
          ))}
        </div>

        <p
          className="text-center text-[#4A6B8A] text-sm mt-8"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          *Livraison gratuite pour les commandes de 2 chaises ou plus.
        </p>
      </div>
    </section>
  );
}
