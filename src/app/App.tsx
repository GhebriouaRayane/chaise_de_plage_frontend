import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import type { Product } from "./components/Products";
import { OrderModal } from "./components/OrderModal";
import { WhyUs } from "./components/WhyUs";
import { Customization } from "./components/Customization";
import { Gallery } from "./components/Gallery";
import { Testimonials } from "./components/Testimonials";
import { About } from "./components/About";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  const [orderModal, setOrderModal] = useState<{ open: boolean; product?: Product }>({
    open: false,
  });

  const openOrder = (product?: Product) => setOrderModal({ open: true, product });
  const closeOrder = () => setOrderModal({ open: false });

  return (
    <div
      className="min-h-screen bg-white overflow-x-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <Header onOrder={() => openOrder()} />

      <main>
        <Hero onOrder={() => openOrder()} />
        <Products onOrder={(product) => openOrder(product)} />
        <WhyUs />
        <Customization />
        <Gallery />
        <Testimonials />
        <About />
        <FAQ />
        <Contact />
      </main>

      <Footer />

      <OrderModal
        open={orderModal.open}
        product={orderModal.product}
        onClose={closeOrder}
      />
    </div>
  );
}
