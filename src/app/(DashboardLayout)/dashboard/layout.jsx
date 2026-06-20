import DashBoardNavBar from "@/Components/DashBoard/DashBoardNavBar";
import RequiredRole from "@/MiddleWare/RequiredRole";

const DashBoardLayout = async ({ children }) => {
  await RequiredRole();
  return (
    <main>
      <div className=" container mx-auto min-h-screen grid grid-cols-6 bg-background">
        <aside>
          <DashBoardNavBar />
        </aside>
        <main className="col-span-5">{children}</main>
      </div>
    </main>
  );
};

export default DashBoardLayout;
