
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4">
      <div className="text-center max-w-md animate-fade-in">
        <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-foreground mb-6">We couldn't find the page you're looking for</p>
        <p className="text-muted-foreground mb-8">The page at <code className="bg-muted px-1.5 py-0.5 rounded text-sm">{location.pathname}</code> doesn't exist or was moved.</p>
        <Link to="/">
          <Button className="transition-all gap-2 hover:gap-3">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
