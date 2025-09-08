import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FlaskConical, Zap, CloudRain, Thermometer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SoilInputProps {
  onDataChange: (data: any) => void;
}

const SoilInput = ({ onDataChange }: SoilInputProps) => {
  const { toast } = useToast();
  const [soilData, setSoilData] = useState({
    ph: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    soilType: "",
    temperature: "28",
    humidity: "65",
    rainfall: "120"
  });

  const soilTypes = [
    { value: "sandy", label: "Sandy Soil" },
    { value: "clay", label: "Clay Soil" },
    { value: "loamy", label: "Loamy Soil" },
    { value: "silt", label: "Silt Soil" },
    { value: "black", label: "Black Soil" },
    { value: "red", label: "Red Soil" },
  ];

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...soilData, [field]: value };
    setSoilData(newData);
    onDataChange(newData);
  };

  const autoFillSampleData = () => {
    const sampleData = {
      ph: "6.5",
      nitrogen: "45",
      phosphorus: "38",
      potassium: "42",
      soilType: "loamy",
      temperature: "28",
      humidity: "65",
      rainfall: "120"
    };
    setSoilData(sampleData);
    onDataChange(sampleData);
    toast({
      title: "Sample data filled!",
      description: "You can modify these values as needed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Soil & Weather Data</h2>
        <Button 
          variant="secondary" 
          onClick={autoFillSampleData}
          className="text-sm"
        >
          Auto-fill Sample Data
        </Button>
      </div>

      {/* Soil Properties */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FlaskConical className="h-5 w-5 text-soil" />
            <span>Soil Properties</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ph">Soil pH Level</Label>
              <Input
                id="ph"
                type="number"
                step="0.1"
                placeholder="6.0 - 8.0"
                value={soilData.ph}
                onChange={(e) => handleInputChange("ph", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="soilType">Soil Type</Label>
              <Select 
                onValueChange={(value) => handleInputChange("soilType", value)} 
                value={soilData.soilType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil.value} value={soil.value}>
                      {soil.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="nitrogen">Nitrogen (N) ppm</Label>
              <Input
                id="nitrogen"
                type="number"
                placeholder="0-100"
                value={soilData.nitrogen}
                onChange={(e) => handleInputChange("nitrogen", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phosphorus">Phosphorus (P) ppm</Label>
              <Input
                id="phosphorus"
                type="number"
                placeholder="0-100"
                value={soilData.phosphorus}
                onChange={(e) => handleInputChange("phosphorus", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="potassium">Potassium (K) ppm</Label>
              <Input
                id="potassium"
                type="number"
                placeholder="0-100"
                value={soilData.potassium}
                onChange={(e) => handleInputChange("potassium", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CloudRain className="h-5 w-5 text-water" />
            <span>Weather Conditions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="temperature" className="flex items-center space-x-2">
                <Thermometer className="h-4 w-4" />
                <span>Temperature (°C)</span>
              </Label>
              <Input
                id="temperature"
                type="number"
                value={soilData.temperature}
                onChange={(e) => handleInputChange("temperature", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="humidity">Humidity (%)</Label>
              <Input
                id="humidity"
                type="number"
                value={soilData.humidity}
                onChange={(e) => handleInputChange("humidity", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="rainfall">Rainfall (mm/month)</Label>
              <Input
                id="rainfall"
                type="number"
                value={soilData.rainfall}
                onChange={(e) => handleInputChange("rainfall", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SoilInput;