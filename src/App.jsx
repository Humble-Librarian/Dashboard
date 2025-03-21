import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/DashboardLayout";

// Theme management
function App() {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    // Check for user preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Placeholder component for routes that are not yet implemented
  const PlaceholderPage = ({ title }) => (
    <DashboardLayout theme={theme} toggleTheme={toggleTheme}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-medium mb-6">{title}</h1>
        <div className="p-8 bg-muted/30 border border-border rounded-xl text-center animate-fade-in">
          <h2 className="text-lg font-medium text-muted-foreground">This page is under construction</h2>
          <p className="text-sm text-muted-foreground mt-2">Check back soon for updates!</p>
        </div>
      </div>
    </DashboardLayout>
  );

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="antialiased min-h-screen">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/learn" element={<PlaceholderPage title="Learning Center" />} />
            <Route path="/progress" element={<PlaceholderPage title="Progress & Achievements" />} />
            <Route path="/invest" element={<PlaceholderPage title="Investment Recommendations" />} />
            <Route path="/budget" element={<PlaceholderPage title="Budget Planner" />} />
            <Route path="/goals" element={<PlaceholderPage title="Financial Goals" />} />
            <Route path="/notifications" element={<PlaceholderPage title="Notifications" />} />
            <Route path="/settings" element={<PlaceholderPage title="Account Settings" />} />
            <Route path="/help" element={<PlaceholderPage title="Help & Support" />} />
            {/* Catch-all for undefined routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App; 