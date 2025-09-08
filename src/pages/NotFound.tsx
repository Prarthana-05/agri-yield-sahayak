import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto p-8">
        <AlertTriangle className="mx-auto h-16 w-16 text-destructive mb-6" />
        <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">
          Oops! This page doesn't exist in our fields
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <a href="/">
            <Home className="mr-2 h-4 w-4" />
            Return to AgriYield AI
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
