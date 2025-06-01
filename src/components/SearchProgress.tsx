
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Zap, Search, Brain, Target, CheckCircle } from "lucide-react";

interface SearchProgressProps {
  onComplete: () => void;
}

const SearchProgress = ({ onComplete }: SearchProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Search, text: "Scanning facility databases...", duration: 1000 },
    { icon: Brain, text: "AI analyzing website content...", duration: 1000 },
    { icon: Target, text: "Gathering physician profiles...", duration: 1000 },
    { icon: Zap, text: "Processing ownership data...", duration: 1000 },
    { icon: CheckCircle, text: "Research complete!", duration: 1000 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepTimer);
        return prev;
      });
    }, 1000);

    return () => clearInterval(stepTimer);
  }, []);

  const CurrentIcon = steps[currentStep]?.icon || Search;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="p-8 bg-white rounded-xl border border-gray-200 shadow-2xl max-w-md w-full mx-4">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto">
            <CurrentIcon className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              AI-Powered Research in Progress
            </h3>
            <p className="text-gray-600 min-h-[20px]">
              {steps[currentStep]?.text || "Initializing..."}
            </p>
          </div>

          <div className="space-y-2">
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-gray-500">{progress}% Complete</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SearchProgress;
