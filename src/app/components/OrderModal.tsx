import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, ChevronDown, CheckCircle, Package } from "lucide-react";
import { WILAYAS } from "../data/wilayas";
import { Product, PRODUCTS } from "./Products";

interface OrderModalProps {
  open: boolean;
  product?: Product;
  onClose: () => void;
}

type Step = "form" | "summary" | "confirmed";

interface FormData {
  nom: string;
  prenom: string;
  telephone: string;
  wilayaCode: number | null;
  commune: string;
  adresse: string;
  quantite: number;
  remarque: string;
}

const INITIAL_FORM: FormData = {
  nom: "",
  prenom: "",
  telephone: "",
  wilayaCode: null,
  commune: "",
  adresse: "",
  quantite: 1,
  remarque: "",
};

const API_BASE_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.PROD ? "https://beach-chair-backend.onrender.com/api/v1" : "http://127.0.0.1:8000/api/v1");

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-[#1A2E44]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full appearance-none px-4 py-3 rounded-xl border text-[#1A2E44] bg-white outline-none transition-colors pr-10 ${
            error
              ? "border-red-400 bg-red-50/50"
              : "border-[#CAF0F8] focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20"
          } ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A6B8A] pointer-events-none" />
      </div>
      {error && <p className="text-red-500 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{error}</p>}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  optional,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  error?: string;
  optional?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-[#1A2E44] flex items-center gap-1.5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
        {label}
        {optional && <span className="text-xs text-[#4A6B8A] font-normal">(facultatif)</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`px-4 py-3 rounded-xl border text-[#1A2E44] outline-none transition-colors ${
          error
            ? "border-red-400 bg-red-50/50"
            : "border-[#CAF0F8] focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20"
        }`}
        style={{ fontFamily: "Inter, sans-serif" }}
      />
      {error && <p className="text-red-500 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{error}</p>}
    </div>
  );
}

export function OrderModal({ open, product, onClose }: OrderModalProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product>(product ?? PRODUCTS[0]);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [step, setStep] = useState<Step>("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (product) setSelectedProduct(product);
  }, [product]);

  useEffect(() => {
    if (!open) {
      setForm(INITIAL_FORM);
      setErrors({});
      setStep("form");
      setIsSubmitting(false);
      setSubmitError(null);
    }
  }, [open]);

  const selectedWilaya = WILAYAS.find((w) => w.code === form.wilayaCode);
  const shipping = selectedWilaya?.shipping ?? 0;
  const subtotal = selectedProduct.price * form.quantite;
  const total = subtotal + shipping;

  const setField = <K extends keyof FormData>(key: K, val: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.nom.trim()) errs.nom = "Le nom est requis";
    if (!form.prenom.trim()) errs.prenom = "Le prénom est requis";
    if (!form.telephone.trim()) errs.telephone = "Le numéro est requis";
    else if (!/^(05|06|07)\d{8}$/.test(form.telephone.replace(/\s/g, "")))
      errs.telephone = "Format invalide (ex: 0555123456)";
    if (!form.wilayaCode) errs.wilayaCode = "Veuillez sélectionner une wilaya" as any;
    if (!form.commune) errs.commune = "Veuillez sélectionner une commune";
    if (!form.adresse.trim()) errs.adresse = "L'adresse est requise";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) setStep("summary");
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: form.nom.trim(),
          prenom: form.prenom.trim(),
          telephone: form.telephone.trim(),
          wilaya_code: form.wilayaCode,
          commune: form.commune,
          adresse: form.adresse.trim(),
          remarque: form.remarque.trim() || null,
          product_id: selectedProduct.id,
          quantity: form.quantite,
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        const message = payload?.detail || "Impossible d'envoyer la commande";
        throw new Error(Array.isArray(message) ? message.join(", ") : message);
      }

      setStep("confirmed");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur inconnue";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const communeOptions = selectedWilaya
    ? selectedWilaya.communes.map((c) => ({ value: c, label: c }))
    : [];

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
                className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={(e) => e.target === e.currentTarget && onClose()}
              >
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between px-8 py-6 border-b border-[#CAF0F8]/60 bg-gradient-to-r from-[#CAF0F8]/30 to-white flex-shrink-0">
                    <div>
                      <h2
                        className="text-[#1A2E44]"
                        style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem" }}
                      >
                        {step === "confirmed" ? "Commande confirmée !" : step === "summary" ? "Récapitulatif" : "Passer commande"}
                      </h2>
                      {step === "form" && (
                        <p className="text-[#4A6B8A] text-sm mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                          {selectedProduct.name} — {selectedProduct.price.toLocaleString("fr-DZ")} DA
                        </p>
                      )}
                    </div>
                    <button
                      onClick={onClose}
                      className="w-9 h-9 rounded-full bg-[#F0F8FF] flex items-center justify-center hover:bg-[#CAF0F8] transition-colors"
                    >
                      <X size={18} className="text-[#1A2E44]" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="overflow-y-auto flex-1">
                    <AnimatePresence mode="wait">
                      {/* FORM STEP */}
                      {step === "form" && (
                        <motion.div
                          key="form"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="p-8 space-y-5"
                        >
                          {/* Product Selection */}
                          <div>
                            <label className="text-sm text-[#1A2E44] mb-2 block" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                              Produit sélectionné
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {PRODUCTS.map((p) => (
                                <button
                                  key={p.id}
                                  onClick={() => setSelectedProduct(p)}
                                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-colors text-left ${
                                    selectedProduct.id === p.id
                                      ? "border-[#0077B6] bg-[#CAF0F8]/30"
                                      : "border-[#CAF0F8] hover:border-[#90E0EF]"
                                  }`}
                                >
                                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-[#1A2E44] text-xs truncate" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{p.name}</p>
                                    <p className="text-[#0077B6] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{p.price.toLocaleString("fr-DZ")} DA</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <InputField label="Nom" value={form.nom} onChange={(v) => setField("nom", v)} placeholder="Votre nom" error={errors.nom} />
                            <InputField label="Prénom" value={form.prenom} onChange={(v) => setField("prenom", v)} placeholder="Votre prénom" error={errors.prenom} />
                          </div>
                          <InputField label="Téléphone" type="tel" value={form.telephone} onChange={(v) => setField("telephone", v)} placeholder="0555 123 456" error={errors.telephone} />

                          <div className="grid grid-cols-2 gap-4">
                            <SelectField
                              label="Wilaya"
                              value={form.wilayaCode ? String(form.wilayaCode) : ""}
                              onChange={(v) => {
                                setField("wilayaCode", v ? Number(v) : null);
                                setField("commune", "");
                              }}
                              options={WILAYAS.map((w) => ({ value: String(w.code), label: `${w.code}. ${w.name}` }))}
                              placeholder="Sélectionner..."
                              error={errors.wilayaCode as string}
                            />
                            <SelectField
                              label="Commune"
                              value={form.commune}
                              onChange={(v) => setField("commune", v)}
                              options={communeOptions}
                              placeholder={form.wilayaCode ? "Sélectionner..." : "Choisir wilaya d'abord"}
                              disabled={!form.wilayaCode}
                              error={errors.commune}
                            />
                          </div>

                          <InputField label="Adresse complète" value={form.adresse} onChange={(v) => setField("adresse", v)} placeholder="Rue, quartier, numéro..." error={errors.adresse} />

                          {/* Quantity */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm text-[#1A2E44]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                              Quantité
                            </label>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-0 border-2 border-[#CAF0F8] rounded-xl overflow-hidden">
                                <button
                                  onClick={() => setField("quantite", Math.max(1, form.quantite - 1))}
                                  className="w-11 h-11 flex items-center justify-center text-[#0077B6] hover:bg-[#CAF0F8]/50 transition-colors"
                                >
                                  <Minus size={16} />
                                </button>
                                <span
                                  className="w-12 text-center text-[#1A2E44]"
                                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.1rem" }}
                                >
                                  {form.quantite}
                                </span>
                                <button
                                  onClick={() => setField("quantite", Math.min(20, form.quantite + 1))}
                                  className="w-11 h-11 flex items-center justify-center text-[#0077B6] hover:bg-[#CAF0F8]/50 transition-colors"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>

                              {/* Auto-calc preview */}
                              <div className="flex-1 bg-[#CAF0F8]/30 rounded-xl p-3 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                                <div className="flex justify-between text-[#4A6B8A]">
                                  <span>{selectedProduct.price.toLocaleString("fr-DZ")} DA × {form.quantite}</span>
                                  <span>{subtotal.toLocaleString("fr-DZ")} DA</span>
                                </div>
                                <div className="flex justify-between text-[#4A6B8A] mt-0.5">
                                  <span>Livraison</span>
                                  <span>{shipping > 0 ? `${shipping.toLocaleString("fr-DZ")} DA` : "—"}</span>
                                </div>
                                <div className="flex justify-between text-[#0077B6] mt-1.5 pt-1.5 border-t border-[#CAF0F8]" style={{ fontWeight: 700 }}>
                                  <span>Total</span>
                                  <span>{total > 0 ? `${total.toLocaleString("fr-DZ")} DA` : "—"}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Remarque */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm text-[#1A2E44] flex items-center gap-1.5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                              Remarque <span className="text-xs text-[#4A6B8A] font-normal">(facultatif)</span>
                            </label>
                            <textarea
                              value={form.remarque}
                              onChange={(e) => setField("remarque", e.target.value)}
                              placeholder="Instructions spéciales, couleur préférée..."
                              rows={3}
                              className="px-4 py-3 rounded-xl border border-[#CAF0F8] focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none text-[#1A2E44] resize-none"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* SUMMARY STEP */}
                      {step === "summary" && (
                        <motion.div
                          key="summary"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="p-8"
                        >
                          <div className="bg-[#CAF0F8]/20 rounded-2xl p-6 space-y-4 mb-6">
                            <div className="flex items-center gap-4 pb-4 border-b border-[#CAF0F8]">
                              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-16 h-16 rounded-xl object-cover" />
                              <div>
                                <p className="text-[#1A2E44]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{selectedProduct.name}</p>
                                <p className="text-[#0077B6] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{selectedProduct.price.toLocaleString("fr-DZ")} DA / unité</p>
                              </div>
                            </div>
                            {[
                              ["Client", `${form.prenom} ${form.nom}`],
                              ["Téléphone", form.telephone],
                              ["Wilaya", `${form.wilayaCode}. ${selectedWilaya?.name}`],
                              ["Commune", form.commune],
                              ["Adresse", form.adresse],
                              form.remarque ? ["Remarque", form.remarque] : null,
                            ].filter(Boolean).map(([k, v]) => (
                              <div key={k as string} className="flex justify-between text-sm">
                                <span className="text-[#4A6B8A]" style={{ fontFamily: "Inter, sans-serif" }}>{k}</span>
                                <span className="text-[#1A2E44] text-right max-w-xs" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{v}</span>
                              </div>
                            ))}
                            <div className="pt-4 border-t border-[#CAF0F8] space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-[#4A6B8A]" style={{ fontFamily: "Inter, sans-serif" }}>Prix × Quantité</span>
                                <span className="text-[#1A2E44]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{subtotal.toLocaleString("fr-DZ")} DA</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-[#4A6B8A]" style={{ fontFamily: "Inter, sans-serif" }}>Livraison ({selectedWilaya?.name})</span>
                                <span className="text-[#1A2E44]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{shipping.toLocaleString("fr-DZ")} DA</span>
                              </div>
                              <div className="flex justify-between pt-2 border-t border-[#90E0EF]">
                                <span className="text-[#1A2E44]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}>Total à payer</span>
                                <span className="text-[#0077B6]" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.25rem" }}>
                                  {total.toLocaleString("fr-DZ")} DA
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {submitError && step === "summary" && (
                        <div className="px-8 pb-4">
                          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {submitError}
                          </div>
                        </div>
                      )}

                      {/* CONFIRMED STEP */}
                      {step === "confirmed" && (
                        <motion.div
                          key="confirmed"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-12 flex flex-col items-center text-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                            className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0077B6] to-[#00B4D8] flex items-center justify-center mb-6 shadow-xl shadow-[#0077B6]/30"
                          >
                            <CheckCircle size={48} className="text-white" />
                          </motion.div>
                          <h3
                            className="text-[#1A2E44] mb-4"
                            style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem" }}
                          >
                            Merci pour votre commande !
                          </h3>
                          <p
                            className="text-[#4A6B8A] mb-8 max-w-sm"
                            style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
                          >
                            Nous vous contacterons prochainement afin de confirmer votre achat
                            et organiser la livraison à{" "}
                            <strong className="text-[#0077B6]">{form.commune}, {selectedWilaya?.name}</strong>.
                          </p>
                          <div className="flex items-center gap-3 bg-[#CAF0F8]/30 rounded-2xl px-6 py-4 mb-8">
                            <Package size={20} className="text-[#0077B6]" />
                            <div className="text-left">
                              <p className="text-[#1A2E44] text-sm" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                                {selectedProduct.name} × {form.quantite}
                              </p>
                              <p className="text-[#0077B6] text-sm" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
                                {total.toLocaleString("fr-DZ")} DA
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={onClose}
                            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white shadow-md shadow-[#0077B6]/20"
                            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
                          >
                            Fermer
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Footer Buttons */}
                  {step !== "confirmed" && (
                    <div className="px-8 py-6 border-t border-[#CAF0F8]/60 flex gap-3 flex-shrink-0 bg-white">
                      {step === "summary" && (
                        <button
                          onClick={() => setStep("form")}
                          className="flex-1 py-3.5 rounded-xl border-2 border-[#CAF0F8] text-[#4A6B8A] hover:border-[#90E0EF] transition-colors"
                          style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
                        >
                          ← Modifier
                        </button>
                      )}
                      {step === "form" && (
                        <button
                          onClick={onClose}
                          className="flex-1 py-3.5 rounded-xl border-2 border-[#CAF0F8] text-[#4A6B8A] hover:border-[#90E0EF] transition-colors"
                          style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
                        >
                          Annuler
                        </button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={step === "form" ? handleSubmit : handleConfirm}
                        disabled={isSubmitting}
                        className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white shadow-md shadow-[#0077B6]/20"
                        style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, opacity: isSubmitting ? 0.7 : 1 }}
                      >
                        {isSubmitting ? "Envoi..." : step === "form" ? "Voir le récapitulatif →" : "Confirmer la commande ✓"}
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
