import { motion } from "motion/react";
import { useState } from "react";
import { X } from "lucide-react";

const CATEGORIES = ["Tout", "Plages", "Hôtels", "Piscines", "Resorts", "Terrasses", "Jardins"];

const GALLERY_ITEMS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1537160833943-1b610e77231c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    title: "Plage de rêve",
    category: "Plages",
    cols: 2,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1770306924247-a6f94261688e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    title: "Terrasse en bois",
    category: "Terrasses",
    cols: 1,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1503003378590-66f89f543bc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    title: "Piscine resort 5★",
    category: "Piscines",
    cols: 1,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1762778487706-9835a21b5c45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    title: "Coucher de soleil",
    category: "Resorts",
    cols: 1,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1760943015321-361072c80d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    title: "Sous les palmiers",
    category: "Hôtels",
    cols: 1,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1779566751860-f7fafe3049c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    title: "Eau turquoise",
    category: "Plages",
    cols: 2,
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1759442048163-ac6eb0156f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    title: "Espace piscine",
    category: "Piscines",
    cols: 1,
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1670100375932-e160bd3e11af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    title: "Jardin élégant",
    category: "Jardins",
    cols: 1,
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1773333643165-2cadaf6d1bcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    title: "Hôtel de luxe",
    category: "Hôtels",
    cols: 1,
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1768737676967-5d340e2f86cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    title: "Vue panoramique",
    category: "Resorts",
    cols: 1,
  },
];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [lightbox, setLightbox] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  const filtered = activeCategory === "Tout"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="galerie" className="py-24 bg-[#F0F8FF]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full bg-[#CAF0F8] text-[#0077B6] text-sm mb-4"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
          >
            Inspirations
          </span>
          <h2
            className="text-[#1A2E44] mb-4"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Galerie
          </h2>
          <p
            className="text-[#4A6B8A] max-w-lg mx-auto mb-8"
            style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
          >
            Découvrez nos chaises dans leurs plus beaux environnements — plages, hôtels,
            piscines et espaces verts.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white shadow-md shadow-[#0077B6]/25"
                    : "bg-white text-[#4A6B8A] hover:bg-[#CAF0F8]/50 border border-[#CAF0F8]"
                }`}
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry-style Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="break-inside-avoid cursor-pointer group relative rounded-2xl overflow-hidden shadow-md"
              onClick={() => setLightbox(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E44]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <div>
                  <span
                    className="inline-block px-2.5 py-1 rounded-full bg-white/20 text-white/80 text-xs mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.category}
                  </span>
                  <p className="text-white" style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: "1rem" }}>
                    {item.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={20} className="text-white" />
          </button>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.image}
              alt={lightbox.title}
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="text-center mt-4">
              <span className="text-white/60 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                {lightbox.category}
              </span>
              <p className="text-white" style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: "1.25rem" }}>
                {lightbox.title}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
