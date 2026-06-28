import DashBoardNavBar from "@/Components/DashBoard/DashBoardNavBar";
import RequiredRole from "@/MiddleWare/RequiredRole";

const DashBoardLayout = async ({ children }) => {
  await RequiredRole("");
  return (
    <main className="bg-mainBackground">
      <div className=" container mx-auto min-h-screen flex bg-background">
        <aside className="max-w-72 w-full hidden md:inline-block">
          <DashBoardNavBar />
        </aside>
        <main className=" pl-4 flex-1 w-full  selection:bg-blue-600 selection:text-white min-h-screen bg-background text-foreground">
          {children}
        </main>
      </div>
    </main>
  );
};

export default DashBoardLayout;
