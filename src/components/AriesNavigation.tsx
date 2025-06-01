
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Home } from "lucide-react";

const AriesNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-4">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/")}
        className="flex items-center space-x-2 hover:bg-blue-50 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
          <Heart className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Aries Medical Partners
        </span>
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => navigate("/")}
        className="flex items-center space-x-1"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Button>
    </div>
  );
};

export default AriesNavigation;
