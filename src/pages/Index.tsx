import AgriYieldApp from "../components/AgriYieldApp";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Welcome toast
    toast({
      title: "Welcome to AgriYield AI! 🌾", 
      description: "Your smart farming companion for better crop yields.",
    });
  }, []);

  return <AgriYieldApp />;
};

export default Index;
