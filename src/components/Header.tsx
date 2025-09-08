import { Sprout, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

const Header = ({ currentSection, onNavigate }: HeaderProps) => {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-accent" />
            <div>
              <h1 className="text-xl font-bold">AgriYield AI</h1>
              <p className="text-sm opacity-90">Smart Farming Solutions</p>
            </div>
          </div>
          
          {/* Navigation for larger screens */}
          <nav className="hidden md:flex space-x-4">
            <Button
              variant={currentSection === 'home' ? 'default' : 'secondary'}
              onClick={() => onNavigate('home')}
              className="text-sm"
            >
              Home
            </Button>
            <Button
              variant={currentSection === 'prediction' ? 'default' : 'secondary'}
              onClick={() => onNavigate('prediction')}
              className="text-sm"
            >
              Prediction
            </Button>
            <Button
              variant={currentSection === 'history' ? 'default' : 'secondary'}
              onClick={() => onNavigate('history')}
              className="text-sm"
            >
              History
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <Button variant="secondary" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;