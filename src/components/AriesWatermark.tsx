
import { Heart } from "lucide-react";

const AriesWatermark = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
      <div className="opacity-5 transform rotate-12 scale-150">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
            <Heart className="w-16 h-16 text-white" />
          </div>
          <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            ARIES
          </div>
          <div className="text-2xl font-medium text-gray-600">
            MEDICAL PARTNERS
          </div>
        </div>
      </div>
    </div>
  );
};

export default AriesWatermark;
