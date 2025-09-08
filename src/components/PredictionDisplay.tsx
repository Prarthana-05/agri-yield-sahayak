import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Droplets, Zap, Bug, Calendar, BarChart3, TrendingDown, Lightbulb, Wheat } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

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

    const regionalAverage = {
      wheat: 20,
      rice: 32,
      maize: 25,
      cotton: 10,
      sugarcane: 400,
      pulses: 7
    };

    const crop = cropData.crop;
    let predictedYield = baseYield[crop as keyof typeof baseYield] || 20;
    const regionalAvg = regionalAverage[crop as keyof typeof regionalAverage] || 18;

    // Adjust based on soil conditions
    const ph = parseFloat(soilData.ph);
    if (ph >= 6.0 && ph <= 7.5) predictedYield *= 1.1;
    if (ph < 5.5 || ph > 8.0) predictedYield *= 0.8;

    const npkAvg = (parseFloat(soilData.nitrogen || 0) + parseFloat(soilData.phosphorus || 0) + parseFloat(soilData.potassium || 0)) / 3;
    if (npkAvg > 40) predictedYield *= 1.15;
    if (npkAvg < 20) predictedYield *= 0.85;

    const finalYield = Math.round(predictedYield * 100) / 100;
    const confidence = npkAvg > 30 && ph >= 6.0 && ph <= 7.5 ? 'High' : npkAvg > 20 ? 'Medium' : 'Low';
    const costPerAcre = crop === 'sugarcane' ? 25000 : 8000;
    const pricePerUnit = crop === 'sugarcane' ? 3000 : 2000;
    const expectedRevenue = finalYield * pricePerUnit;
    const expectedProfit = expectedRevenue - costPerAcre;

    return {
      yield: finalYield,
      regionalAverage: regionalAvg,
      confidence,
      costPerAcre,
      expectedRevenue,
      expectedProfit,
      improvement: ((finalYield - regionalAvg) / regionalAvg * 100).toFixed(1)
    };
  };

  const prediction = generatePrediction();

  // Mock chart data
  const yieldChartData = [
    { month: 'Jan', current: 18, average: 16 },
    { month: 'Feb', current: 20, average: 18 },
    { month: 'Mar', current: 22, average: 19 },
    { month: 'Apr', current: prediction?.yield || 25, average: prediction?.regionalAverage || 20 },
    { month: 'May', current: 26, average: 21 },
    { month: 'Jun', current: 24, average: 20 }
  ];

  const profitData = [
    { aspect: 'Cost', amount: prediction?.costPerAcre || 8000 },
    { aspect: 'Revenue', amount: prediction?.expectedRevenue || 20000 },
    { aspect: 'Profit', amount: prediction?.expectedProfit || 12000 }
  ];

  const alternativeCrops = [
    { crop: 'Maize', yield: '28 quintals/acre', suitability: 85 },
    { crop: 'Pulses', yield: '8 quintals/acre', suitability: 78 },
    { crop: 'Cotton', yield: '12 quintals/acre', suitability: 72 }
  ].filter(alt => alt.crop.toLowerCase() !== cropData.crop?.toLowerCase());

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
        ? "Increase irrigation frequency. Apply 25-30mm water twice weekly."
        : "Apply 20mm water weekly. Use drip irrigation for efficiency.",
      color: "text-water"
    },
    {
      icon: Zap,
      title: "Fertilizer Recommendation", 
      advice: (parseFloat(soilData.nitrogen || 0) + parseFloat(soilData.phosphorus || 0) + parseFloat(soilData.potassium || 0)) / 3 < 30
        ? `Apply NPK 12:32:16 @ 150kg/acre. Add ${cropData.crop === 'rice' ? 'Urea 100kg' : 'DAP 50kg'}/acre.`
        : `Maintain with NPK 10:26:26 @ 100kg/acre. Apply ${cropData.crop === 'wheat' ? 'Urea' : 'MOP'} as needed.`,
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
      {/* Enhanced Yield Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6" />
                <span>Yield Prediction</span>
              </div>
              <Badge className={`${prediction.confidence === 'High' ? 'bg-green-500' : prediction.confidence === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>
                {prediction.confidence} Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{prediction.yield}</div>
              <div className="text-lg opacity-90">
                {cropData.crop === 'sugarcane' ? 'tons/hectare' : 'quintals/acre'}
              </div>
              <p className="mt-4 opacity-90">
                Expected yield for {cropData.crop} in {cropData.location || 'your area'}
              </p>
              <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>{prediction.improvement}% vs regional avg</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Yield Comparison</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={yieldChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="current" fill="hsl(var(--primary))" name="Your Yield" />
                <Bar dataKey="average" fill="hsl(var(--muted))" name="Regional Avg" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Financial Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Cost vs Profit Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Investment Cost:</span>
                <span className="font-bold">₹{prediction.costPerAcre.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Expected Revenue:</span>
                <span className="font-bold text-primary">₹{prediction.expectedRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center border-t pt-2">
                <span className="font-semibold">Expected Profit:</span>
                <span className={`font-bold ${prediction.expectedProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{prediction.expectedProfit.toLocaleString()}
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="aspect" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Bar dataKey="amount" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((rec, index) => (
          <Card key={index} className="bg-card hover:shadow-lg transition-shadow">
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

      {/* Alternative Crops Suggestion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <span>Alternative Crop Suggestions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alternativeCrops.slice(0, 3).map((alt, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-2 mb-2">
                  <Wheat className="h-4 w-4 text-primary" />
                  <span className="font-semibold">{alt.crop}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Expected: {alt.yield}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs">Suitability:</span>
                  <Progress value={alt.suitability} className="flex-1" />
                  <span className="text-xs font-medium">{alt.suitability}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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