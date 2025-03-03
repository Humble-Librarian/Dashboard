
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar 
        isMobileOpen={isMobileMenuOpen} 
        onMobileClose={closeMobileMenu} 
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          onMenuToggle={toggleMobileMenu} 
          isMobileMenuOpen={isMobileMenuOpen} 
        />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
