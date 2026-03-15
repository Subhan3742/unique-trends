import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import CategoriesCarousel from "@/components/categories-carousel";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoriesCarousel />
      <ContactSection />
      <Footer />
    </main>
  );
}
