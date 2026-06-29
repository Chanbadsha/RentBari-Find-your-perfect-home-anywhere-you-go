"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import DashBoardNavBar from "@/Components/DashBoard/DashBoardNavBar";

export default function DashboardShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="bg-mainBackground">
      <div className="container mx-auto min-h-screen flex bg-background">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <DashBoardNavBar />
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={`
            fixed top-0 left-0 z-50 h-screen w-72 bg-background
            transform transition-transform duration-300 lg:hidden
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-bold text-xl">Dashboard</h2>

            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-foreground/5"
            >
              <X size={20} />
            </button>
          </div>

          <DashBoardNavBar />
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-h-screen bg-background">
          {/* Mobile Topbar */}
          <header className="sticky top-0 z-30 flex items-center gap-3 border-b bg-background px-4 py-4 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-foreground/5"
            >
              <Menu size={22} />
            </button>

            <h1 className="font-semibold">Dashboard</h1>
          </header>

          <main className="pl-4 w-full selection:bg-blue-600 selection:text-white text-foreground">
            {children}
          </main>
        </div>
      </div>
    </main>
  );
}
