import { motion } from "motion/react";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, Youtube, CheckCircle } from "lucide-react";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-white">
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
            Contact
          </span>
          <h2
            className="text-[#1A2E44] mb-4"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Contactez-nous
          </h2>
          <p
            className="text-[#4A6B8A] max-w-lg mx-auto"
            style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
          >
            Une question, un devis ou besoin d'assistance ? Notre équipe est là pour vous accompagner.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[2fr_3fr] gap-12">
          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {[
              { icon: Phone, title: "Téléphone", value: "0555 123 456", sub: "Disponible 7j/7 de 8h à 20h", color: "#0077B6" },
              { icon: Mail, title: "Email", value: "contact@azurbeach.dz", sub: "Réponse sous 2h en moyenne", color: "#00B4D8" },
              { icon: MapPin, title: "Adresse", value: "12 Rue des Oliviers, Hydra", sub: "Alger, Algérie", color: "#2E7D32" },
              { icon: Clock, title: "Horaires", value: "Lun–Sam : 8h00 – 20h00", sub: "Dimanche : 10h00 – 18h00", color: "#7B1FA2" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-5 rounded-2xl bg-[#F0F8FF] hover:bg-[#CAF0F8]/30 transition-colors">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-[#1A2E44] mb-0.5" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "0.875rem" }}>{item.title}</p>
                  <p className="text-[#1A2E44] text-sm" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{item.value}</p>
                  <p className="text-[#4A6B8A] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{item.sub}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1A2E44] to-[#0077B6]">
              <p className="text-white mb-4" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Suivez-nous</p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Youtube, label: "YouTube" },
                ].map((s) => (
                  <button key={s.label} className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors" title={s.label}>
                    <s.icon size={18} className="text-white" />
                  </button>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden h-44 bg-gradient-to-br from-[#CAF0F8] to-[#90E0EF] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-[#0077B6] mx-auto mb-2" />
                  <p className="text-[#1A2E44]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.875rem" }}>Hydra, Alger</p>
                  <p className="text-[#4A6B8A] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>Voir sur la carte</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl shadow-xl shadow-[#0077B6]/8 border border-[#F0F8FF] p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0077B6] to-[#00B4D8] flex items-center justify-center mb-6 shadow-xl shadow-[#0077B6]/30">
                  <CheckCircle size={40} className="text-white" />
                </div>
                <h3 className="text-[#1A2E44] mb-3" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem" }}>
                  Message envoyé !
                </h3>
                <p className="text-[#4A6B8A]" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
                  Merci pour votre message. Nous vous répondrons sous 2 heures.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                  className="mt-6 px-6 py-3 rounded-xl border-2 border-[#0077B6] text-[#0077B6] hover:bg-[#0077B6]/5 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { key: "name", label: "Nom complet", placeholder: "Votre nom", type: "text" },
                    { key: "email", label: "Email", placeholder: "votre@email.com", type: "email" },
                  ].map((f) => (
                    <div key={f.key} className="flex flex-col gap-1.5">
                      <label className="text-sm text-[#1A2E44]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{f.label}</label>
                      <input
                        type={f.type}
                        value={form[f.key as keyof typeof form]}
                        onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        required
                        className="px-4 py-3 rounded-xl border border-[#CAF0F8] focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none text-[#1A2E44] transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      />
                    </div>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-[#1A2E44]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Téléphone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="0555 123 456"
                      className="px-4 py-3 rounded-xl border border-[#CAF0F8] focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none text-[#1A2E44] transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-[#1A2E44]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Sujet</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                      required
                      className="px-4 py-3 rounded-xl border border-[#CAF0F8] focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none text-[#1A2E44] transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <option value="">Choisissez...</option>
                      <option>Commande</option>
                      <option>Devis personnalisé</option>
                      <option>Service après-vente</option>
                      <option>Partenariat</option>
                      <option>Autre</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-[#1A2E44]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Décrivez votre demande..."
                    rows={5}
                    required
                    className="px-4 py-3 rounded-xl border border-[#CAF0F8] focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none text-[#1A2E44] resize-none transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white flex items-center justify-center gap-2 shadow-lg shadow-[#0077B6]/25 disabled:opacity-70"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1rem" }}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      Envoyer le message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
