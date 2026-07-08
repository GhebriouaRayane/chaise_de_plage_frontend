import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Star, ShoppingBag } from "lucide-react";
import { Product } from "./Products";

interface ProductDetailModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
  onOrder: (p: Product) => void;
}

export function ProductDetailModal({ product, open, onClose, onOrder }: ProductDetailModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden rounded-t-3xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
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
                    <Dialog.Close asChild>
                      <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md">
                        <X size={18} className="text-[#1A2E44]" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2
                          className="text-[#1A2E44] mb-1"
                          style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem" }}
                        >
                          {product.name}
                        </h2>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-[#FFD700] text-[#FFD700]" : "text-gray-200 fill-gray-200"} />
                            ))}
                          </div>
                          <span className="text-sm text-[#4A6B8A]" style={{ fontFamily: "Inter, sans-serif" }}>
                            {product.rating} ({product.reviews} avis)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className="text-[#0077B6]"
                          style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "2rem" }}
                        >
                          {product.price.toLocaleString("fr-DZ")} DA
                        </div>
                        <div className="flex items-center gap-1.5 justify-end mt-1">
                          <div className={`w-2 h-2 rounded-full ${product.available ? "bg-green-500" : "bg-red-400"}`} />
                          <span className="text-sm text-[#4A6B8A]" style={{ fontFamily: "Inter, sans-serif" }}>
                            {product.available ? "En stock" : "Indisponible"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p
                      className="text-[#4A6B8A] mb-6"
                      style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
                    >
                      {product.description}
                    </p>

                    <div className="mb-8">
                      <h4
                        className="text-[#1A2E44] mb-3"
                        style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
                      >
                        Caractéristiques
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {product.features.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-sm text-[#4A6B8A]" style={{ fontFamily: "Inter, sans-serif" }}>
                            <Check size={14} className="text-[#00B4D8] flex-shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={onClose}
                        className="flex-1 py-3.5 rounded-xl border-2 border-[#0077B6] text-[#0077B6] hover:bg-[#0077B6]/5 transition-colors"
                        style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
                      >
                        Fermer
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { onClose(); onOrder(product); }}
                        className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white flex items-center justify-center gap-2 shadow-md shadow-[#0077B6]/20"
                        style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
                      >
                        <ShoppingBag size={16} />
                        Commander
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
