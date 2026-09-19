import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <div className="flex min-h-screen">

        {/* Sidebar */}

        <Sidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />

        {/* Main Content */}

        <div className="flex min-w-0 flex-1 flex-col">

          <DashboardHeader
            onMenuClick={toggleSidebar}
          />

          <main className="flex-1 p-5 sm:p-6 lg:p-8">
            <Outlet />
          </main>

        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;