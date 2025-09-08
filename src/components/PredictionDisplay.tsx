import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Droplets, Zap, Bug, Calendar } from "lucide-react";

interface PredictionDisplayProps {
  cropData: any;
  soilData: any;
}

const PredictionDisplay = ({ cropData, soilData }: PredictionDisplayProps) => {
  // Mock prediction logic - in real app, this would call an AI API
  const generatePrediction = () => {
    if (!cropData?.crop || !soilData?.ph) {
      return null;
    }

    const baseYield = {
      wheat: 22,
      rice: 35,
      maize: 28,
      cotton: 12,
      sugarcane: 450,
      pulses: 8
    };

    const crop = cropData.crop;
    let predictedYield = baseYield[crop as keyof typeof baseYield] || 20;

    // Adjust based on soil conditions
    const ph = parseFloat(soilData.ph);
    if (ph >= 6.0 && ph <= 7.5) predictedYield *= 1.1;
    if (ph < 5.5 || ph > 8.0) predictedYield *= 0.8;

    const npkAvg = (parseFloat(soilData.nitrogen || 0) + parseFloat(soilData.phosphorus || 0) + parseFloat(soilData.potassium || 0)) / 3;
    if (npkAvg > 40) predictedYield *= 1.15;
    if (npkAvg < 20) predictedYield *= 0.85;

    return Math.round(predictedYield * 100) / 100;
  };

  const prediction = generatePrediction();

  if (!prediction) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Please select crop and fill soil data to get prediction</p>
        </CardContent>
      </Card>
    );
  }

  const recommendations = [
    {
      icon: Droplets,
      title: "Irrigation Advice",
      advice: soilData.rainfall < 100 
        ? "Increase irrigation frequency. Soil moisture seems low based on rainfall data."
        : "Current irrigation schedule looks good. Monitor soil moisture regularly.",
      color: "text-water"
    },
    {
      icon: Zap,
      title: "Fertilizer Recommendation", 
      advice: (parseFloat(soilData.nitrogen || 0) + parseFloat(soilData.phosphorus || 0) + parseFloat(soilData.potassium || 0)) / 3 < 30
        ? "Apply balanced NPK fertilizer. Consider organic compost to improve soil health."
        : "Soil nutrients look adequate. Apply maintenance fertilizer as per crop calendar.",
      color: "text-fertilizer"
    },
    {
      icon: Bug,
      title: "Pest Management",
      advice: soilData.temperature > 30
        ? "Monitor for heat-stress pests. Use integrated pest management practices."
        : "Maintain regular field inspection. Apply preventive organic pest control measures.",
      color: "text-destructive"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Yield Prediction */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl">
            <TrendingUp className="h-6 w-6" />
            <span>Yield Prediction</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{prediction}</div>
            <div className="text-lg opacity-90">
              {cropData.crop === 'sugarcane' ? 'tons/hectare' : 'quintals/acre'}
            </div>
            <p className="mt-4 opacity-90">
              Expected yield for {cropData.crop} in {cropData.location || 'your area'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((rec, index) => (
          <Card key={index} className="bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <rec.icon className={`h-5 w-5 ${rec.color}`} />
                <span>{rec.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {rec.advice}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Save Prediction Button */}
      <Card>
        <CardContent className="pt-6">
          <Button className="w-full" size="lg">
            <Calendar className="mr-2 h-4 w-4" />
            Save This Prediction to History
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionDisplay;