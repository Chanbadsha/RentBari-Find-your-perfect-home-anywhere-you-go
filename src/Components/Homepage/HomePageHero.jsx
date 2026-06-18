import PropertySearchBar from "@/Utils/PropertySearchBar";

const HomePageHero = () => {
  return (
    <div className="container mx-auto">
      <h1>
        Find your perfect home in <span>Bangladesh</span> and beyond
      </h1>
      <p>Search, book, and rent trusted properties with ease and security.</p>

      <PropertySearchBar />
    </div>
  );
};

export default HomePageHero;
