import DashBoardNavBar from "@/Components/DashBoard/DashBoardNavBar";
import React from "react";

const DashBoardLayout = ({ children }) => {
  return (
    <main>
      {" "}
      <div className=" container mx-auto min-h-screen grid grid-cols-6 bg-background">
        <aside>
          <DashBoardNavBar />
        </aside>
        <main>{children}</main>
      </div>
    </main>
  );
};

export default DashBoardLayout;
