import NavBar from "@/Components/Shared/NavBar";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-main-background">
      {/* NavBar */}
      <NavBar />
      {children}
    </div>
  );
};

export default MainLayout;
