
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Setup for placeholder pages
import DashboardLayout from "./components/layout/DashboardLayout";

const PlaceholderPage = ({ title }: { title: string }) => (
  <DashboardLayout>
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/learn" element={<PlaceholderPage title="Learning Center" />} />
          <Route path="/progress" element={<PlaceholderPage title="Progress & Achievements" />} />
          <Route path="/invest" element={<PlaceholderPage title="Investment Recommendations" />} />
          <Route path="/notifications" element={<PlaceholderPage title="Notifications" />} />
          <Route path="/settings" element={<PlaceholderPage title="Account Settings" />} />
          <Route path="/help" element={<PlaceholderPage title="Help & Support" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
