import FeaturedSection from "@/Components/Homepage/FeaturedSection";
import HomePageHero from "@/Components/Homepage/HomePageHero";
import PopularLocations from "@/Components/Homepage/PopularLocations";
import RecentlyAdded from "@/Components/Homepage/RecentlyAdded";
import WhyChooseUs from "@/Components/Homepage/WhyChooseUs";

const HomePage = () => {
  return (
    <div>
      <HomePageHero />
      <FeaturedSection />
      <PopularLocations />
      <RecentlyAdded />
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
