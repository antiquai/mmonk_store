import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import { CatalogSection } from "../../components/Catalog";
import SiteFooter from "../../components/Footer";
import { BrandInfoSection } from "../../components/Info";
import DonateCard from "../../components/DonateCard";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <Navbar/>
        <Hero />
      </div>
      <BrandInfoSection />
      <CatalogSection />
      <DonateCard />
      <SiteFooter />
    </main>
  );
}
