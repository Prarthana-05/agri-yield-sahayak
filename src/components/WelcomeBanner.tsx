import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Sun, CloudRain } from "lucide-react";
import heroImage from "@/assets/agricultural-hero.jpg";

const WelcomeBanner = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <CardContent className="relative p-8">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 mb-4">
            <Sprout className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-bold">AgriYield AI</h1>
          </div>
          
          <h2 className="text-2xl font-semibold mb-2">
            {greeting}, Farmer! 🌾
          </h2>
          
          <p className="text-lg opacity-90 mb-6">
            Welcome to your smart farming companion. Get AI-powered crop yield predictions 
            and expert farming recommendations to maximize your harvest.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-2">
              <Sun className="h-5 w-5 text-accent" />
              <span className="text-sm">28°C Today</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-2">
              <CloudRain className="h-5 w-5 text-water" />
              <span className="text-sm">65% Humidity</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-2">
              <Sprout className="h-5 w-5 text-crop" />
              <span className="text-sm">Optimal Growing</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;