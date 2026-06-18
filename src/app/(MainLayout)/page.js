import ClientExperiences from "@/Components/Homepage/ClientExperiences";
import FeaturedSection from "@/Components/Homepage/FeaturedSection";
import HomePageHero from "@/Components/Homepage/HomePageHero";
import PopularLocations from "@/Components/Homepage/PopularLocations";
import RecentlyAdded from "@/Components/Homepage/RecentlyAdded";
import WhyChooseUs from "@/Components/Homepage/WhyChooseUs";

const HomePage = async () => {
  return (
    <div>
      <HomePageHero />
      <FeaturedSection />
      <PopularLocations />
      <RecentlyAdded />
      <WhyChooseUs />
      <ClientExperiences />
    </div>
  );
};

export default HomePage;
