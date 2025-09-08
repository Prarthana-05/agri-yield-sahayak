import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, MapPin } from "lucide-react";

const PredictionHistory = () => {
  // Mock history data - in real app, this would come from database
  const mockHistory = [
    {
      id: 1,
      date: "2024-09-01",
      crop: "Wheat",
      location: "Pune, Maharashtra",
      prediction: "22.5 quintals/acre",
      status: "Good",
      recommendations: "Increase irrigation"
    },
    {
      id: 2,
      date: "2024-08-15", 
      crop: "Rice",
      location: "Nashik, Maharashtra",
      prediction: "35.2 quintals/acre",
      status: "Excellent",
      recommendations: "Continue current practices"
    },
    {
      id: 3,
      date: "2024-07-20",
      crop: "Maize",
      location: "Aurangabad, Maharashtra", 
      prediction: "28.1 quintals/acre",
      status: "Average",
      recommendations: "Apply NPK fertilizer"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'bg-primary text-primary-foreground';
      case 'Good': return 'bg-accent text-accent-foreground';
      case 'Average': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Prediction History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mockHistory.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No predictions yet. Create your first prediction!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Crop</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Prediction</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Key Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockHistory.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">🌾</span>
                          <span>{record.crop}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{record.location}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{record.prediction}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{record.recommendations}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{mockHistory.length}</div>
              <p className="text-sm text-muted-foreground">Total Predictions</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">26.3</div>
              <p className="text-sm text-muted-foreground">Avg. Yield (quintals/acre)</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">3</div>
              <p className="text-sm text-muted-foreground">Crops Analyzed</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictionHistory;