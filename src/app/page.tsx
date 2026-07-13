import Hero from "@/components/Hero";
import DayNav from "@/components/DayNav";
import BottomTabBar from "@/components/BottomTabBar";
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
      <DayNav />
      <main className="mx-auto w-full max-w-[860px] px-5 pb-8 sm:px-8">
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
      <BudgetSection />
      <Footer />
      <div className="h-16 md:hidden" aria-hidden="true" />
      <BottomTabBar />
    </div>
  );
}
