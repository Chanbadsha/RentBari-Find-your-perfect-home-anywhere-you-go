import Footer from "@/Components/Shared/Footer";
import NavBar from "@/Components/Shared/NavBar";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-main-background">
      {/* NavBar */}
      <NavBar />
      <main> {children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
