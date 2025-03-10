
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Settings, 
  Bell, 
  HelpCircle,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  className?: string;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  className, 
  isMobileOpen = false,
  onMobileClose
}) => {
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/" },
    { icon: <BookOpen size={20} />, label: "Learn", href: "/learn" },
    { icon: <Award size={20} />, label: "Progress", href: "/progress" },
    { icon: <TrendingUp size={20} />, label: "Invest", href: "/invest" },
  ];

  const secondaryNavItems = [
    { icon: <Bell size={20} />, label: "Notifications", href: "/notifications" },
    { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
    { icon: <HelpCircle size={20} />, label: "Help", href: "/help" },
  ];

  // Close sidebar on navigation for mobile
  const handleNavClick = () => {
    if (isMobileOpen && onMobileClose) {
      onMobileClose();
    }
  };

  // Handle ESC key to close mobile sidebar
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileOpen && onMobileClose) {
        onMobileClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isMobileOpen, onMobileClose]);

  // Prevent scroll on body when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    }
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}
      
      <aside 
        className={cn(
          "flex flex-col h-full bg-white border-r border-border px-3 py-6 select-none",
          "fixed top-0 left-0 z-50 w-64 h-screen transition-transform duration-300",
          "lg:relative lg:translate-x-0 lg:z-0",
          !isMobileOpen && "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">FinWise</h1>
          <button 
            onClick={onMobileClose}
            className="lg:hidden text-muted-foreground hover:text-foreground"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-1 flex-1">
          {navItems.map((item, index) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={handleNavClick}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground"
              )}
              style={({ isActive }) => ({
                animationDelay: `${index * 50}ms`,
              })}
            >
              <div className={cn(
                "transition-colors",
                "group-hover:text-primary"
              )}>
                {item.icon}
              </div>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="space-y-1 pt-4 border-t border-border">
          {secondaryNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={handleNavClick}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive 
                  ? "bg-muted text-foreground" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <div className={cn(
                "transition-colors",
                "group-hover:text-foreground"
              )}>
                {item.icon}
              </div>
              <span>{item.label}</span>
            </NavLink>
          ))}

          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors mt-4">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
