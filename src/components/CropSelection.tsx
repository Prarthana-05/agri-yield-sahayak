import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Wheat, Sprout } from "lucide-react";

interface CropSelectionProps {
  onDataChange: (data: any) => void;
}

const CropSelection = ({ onDataChange }: CropSelectionProps) => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [location, setLocation] = useState("");

  const crops = [
    { value: "wheat", label: "Wheat", icon: "🌾" },
    { value: "rice", label: "Rice", icon: "🌾" },
    { value: "maize", label: "Maize", icon: "🌽" },
    { value: "cotton", label: "Cotton", icon: "🌿" },
    { value: "sugarcane", label: "Sugarcane", icon: "🎋" },
    { value: "pulses", label: "Pulses", icon: "🫘" },
  ];

  const handleCropChange = (value: string) => {
    setSelectedCrop(value);
    onDataChange({ crop: value, location });
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    onDataChange({ crop: selectedCrop, location: value });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-secondary to-muted">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sprout className="h-5 w-5 text-primary" />
            <span>Select Your Crop</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleCropChange} value={selectedCrop}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Choose your crop type" />
            </SelectTrigger>
            <SelectContent>
              {crops.map((crop) => (
                <SelectItem key={crop.value} value={crop.value}>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{crop.icon}</span>
                    <span>{crop.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-secondary to-muted">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Your Location</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="location">Enter your city/district</Label>
            <Input
              id="location"
              placeholder="e.g., Pune, Maharashtra"
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="bg-background"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropSelection;