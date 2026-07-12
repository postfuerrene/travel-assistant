import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import BudgetSection from "@/components/BudgetSection";
import CitySection from "@/components/CitySection";
import Divider from "@/components/Divider";
import TipsSection from "@/components/TipsSection";
import Footer from "@/components/Footer";
import { trip } from "@/data/trip";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-cream text-ink">
      <Hero />
      <NavBar />
      <BudgetSection />
      <main className="mx-auto w-full max-w-[860px] px-6 pb-16">
        {trip.cities.map((city, i) => (
          <div key={city.id}>
            <CitySection city={city} />
            {i < trip.cities.length - 1 && (
              <Divider
                text={`Weiterfahrt ca. ${trip.cities[i + 1].driveFrom.time.replace(
                  "~",
                  ""
                )}`}
              />
            )}
          </div>
        ))}
        <TipsSection />
      </main>
      <Footer />
    </div>
  );
}
