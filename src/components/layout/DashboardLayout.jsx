import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children, theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Add class to body when mobile menu is open to prevent scroll
  if (typeof document !== 'undefined') {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-background">
      <Sidebar 
        isMobileOpen={isMobileMenuOpen} 
        onMobileClose={closeMobileMenu}
        theme={theme}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          onMenuToggle={toggleMobileMenu} 
          isMobileMenuOpen={isMobileMenuOpen} 
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout; 