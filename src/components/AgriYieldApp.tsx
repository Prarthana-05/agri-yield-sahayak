import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import Header from "./Header";
import WelcomeBanner from "./WelcomeBanner";
import CropSelection from "./CropSelection";
import SoilInput from "./SoilInput";
import PredictionDisplay from "./PredictionDisplay";
import PredictionHistory from "./PredictionHistory";

const AgriYieldApp = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [cropData, setCropData] = useState({});
  const [soilData, setSoilData] = useState({});
  const [showPrediction, setShowPrediction] = useState(false);

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    if (section === 'home') {
      setShowPrediction(false);
    }
  };

  const handleGetPrediction = () => {
    if (cropData && soilData && Object.keys(cropData).length > 0 && Object.keys(soilData).length > 0) {
      setShowPrediction(true);
      setCurrentSection('prediction');
    }
  };

  const renderMainContent = () => {
    if (currentSection === 'history') {
      return <PredictionHistory />;
    }

    if (currentSection === 'prediction' && showPrediction) {
      return <PredictionDisplay cropData={cropData} soilData={soilData} />;
    }

    // Home section with input forms
    return (
      <div className="space-y-8">
        <WelcomeBanner />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <CropSelection onDataChange={setCropData} />
          </div>
          
          <div className="space-y-6">
            <SoilInput onDataChange={setSoilData} />
          </div>
        </div>

        {/* Get Prediction Button */}
        {Object.keys(cropData).length > 0 && Object.keys(soilData).length > 0 && (
          <div className="text-center">
            <Button 
              size="lg" 
              onClick={handleGetPrediction}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg px-8 py-6 rounded-xl shadow-lg"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Get AI Prediction
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentSection={currentSection} onNavigate={handleNavigate} />
      
      <main className="container mx-auto px-4 py-8">
        {renderMainContent()}
      </main>

      {/* Bottom navigation for mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t md:hidden">
        <div className="grid grid-cols-3 gap-1 p-2">
          <Button
            variant={currentSection === 'home' ? 'default' : 'ghost'}
            onClick={() => handleNavigate('home')}
            className="flex-col h-auto py-2"
            size="sm"
          >
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant={currentSection === 'prediction' ? 'default' : 'ghost'}
            onClick={() => handleNavigate('prediction')}
            className="flex-col h-auto py-2"
            size="sm"
            disabled={!showPrediction}
          >
            <span className="text-xs">Prediction</span>
          </Button>
          <Button
            variant={currentSection === 'history' ? 'default' : 'ghost'}
            onClick={() => handleNavigate('history')}
            className="flex-col h-auto py-2"
            size="sm"
          >
            <span className="text-xs">History</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgriYieldApp;