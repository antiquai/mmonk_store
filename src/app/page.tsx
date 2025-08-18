import Image from "next/image";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import { CatalogSection } from "../../components/Catalog";
import SiteFooter from "../../components/Footer";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <Navbar/>
        <Hero />
      </div>
      <CatalogSection />
      <SiteFooter />
      {/* Add more components or content here as needed */}
    </main>
  );
}
