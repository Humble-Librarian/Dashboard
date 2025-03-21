import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Settings, 
  Bell, 
  HelpCircle,
  LogOut,
  X,
  Target,
  BarChart3,
  Landmark
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = ({ 
  isMobileOpen = false,
  onMobileClose,
  theme = 'light'
}) => {
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/" },
    { icon: <BookOpen size={20} />, label: "Learn", href: "/learn" },
    { icon: <Award size={20} />, label: "Progress", href: "/progress" },
    { icon: <TrendingUp size={20} />, label: "Invest", href: "/invest" },
    { icon: <BarChart3 size={20} />, label: "Budget", href: "/budget" },
    { icon: <Target size={20} />, label: "Goals", href: "/goals" },
  ];

  const secondaryNavItems = [
    { icon: <Bell size={20} />, label: "Notifications", href: "/notifications" },
    { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
    { icon: <HelpCircle size={20} />, label: "Help", href: "/help" },
  ];

  // Handle ESC key to close mobile sidebar
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isMobileOpen && onMobileClose) {
        onMobileClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isMobileOpen, onMobileClose]);

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-border bg-background md:static md:z-0 transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Mobile close button */}
        <button 
          className="absolute right-2 top-2 rounded-sm p-1 text-muted-foreground md:hidden"
          onClick={onMobileClose}
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
        
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <Landmark className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FinWise
            </h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Financial Wellness Platform</p>
        </div>
        
        {/* Primary Navigation */}
        <div className="flex-1 overflow-auto px-4">
          <div className="mb-2">
            <p className="text-xs font-medium text-muted-foreground mb-2 px-2">MAIN MENU</p>
            <nav className="grid gap-1">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.href}
                  className={({ isActive }) => cn(
                    "group flex items-center rounded-md px-2.5 py-2 text-sm font-medium transition-all hover:bg-muted focus:bg-muted",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => {
                    if (isMobileOpen && onMobileClose) {
                      onMobileClose();
                    }
                  }}
                >
                  <span className={cn(
                    "mr-2 flex h-5 w-5 items-center justify-center rounded-md transition-all",
                    "group-hover:text-foreground"
                  )}>
                    {item.icon}
                  </span>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          
          {/* Secondary Navigation */}
          <div className="mb-2 mt-6">
            <p className="text-xs font-medium text-muted-foreground mb-2 px-2">PREFERENCES</p>
            <nav className="grid gap-1">
              {secondaryNavItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.href}
                  className={({ isActive }) => cn(
                    "group flex items-center rounded-md px-2.5 py-2 text-sm font-medium transition-all hover:bg-muted focus:bg-muted",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => {
                    if (isMobileOpen && onMobileClose) {
                      onMobileClose();
                    }
                  }}
                >
                  <span className={cn(
                    "mr-2 flex h-5 w-5 items-center justify-center rounded-md transition-all",
                    "group-hover:text-foreground"
                  )}>
                    {item.icon}
                  </span>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
        
        {/* User section at bottom */}
        <div className="mt-auto p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary-foreground">
              HL
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">HumbleLibrarian</p>
              <p className="text-xs text-muted-foreground truncate">humblelibrarian@gmail.com</p>
            </div>
          </div>
          <button 
            className="mt-3 w-full flex items-center justify-center gap-1.5 rounded-md bg-muted/50 px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 