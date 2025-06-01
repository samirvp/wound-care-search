import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, MapPin, Heart, Users, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [zipCode, setZipCode] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!zipCode || !facilityName) {
      toast({
        title: "Please fill in all fields",
        description: "We need both zip code and facility name to search effectively.",
        variant: "destructive"
      });
      return;
    }

    // Auto-login and save search data
    const searchData = {
      zipCode,
      facilityName,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };

    // Get existing searches from localStorage
    const existingSearches = JSON.parse(localStorage.getItem("woundcare-searches") || "[]");
    existingSearches.unshift(searchData);
    
    // Keep only last 50 searches
    const limitedSearches = existingSearches.slice(0, 50);
    localStorage.setItem("woundcare-searches", JSON.stringify(limitedSearches));

    toast({
      title: "Search initiated!",
      description: `Searching for wound care clinics near ${zipCode}...`,
    });

    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20 opacity-50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                  <Search className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-6">
              WoundCare Finder
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover specialized wound care clinics nationwide. Simply enter your zip code and facility name to begin your journey to better healing.
            </p>
          </div>

          {/* Search Card */}
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Start Your Search</h2>
                  <p className="text-gray-600">Find the best wound care facilities in your area</p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Enter your zip code (e.g., 90210)"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="pl-12 h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-400 transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Facility name (e.g., Healing Center)"
                      value={facilityName}
                      onChange={(e) => setFacilityName(e.target.value)}
                      className="pl-12 h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-green-400 transition-colors"
                    />
                  </div>

                  <Button
                    onClick={handleSearch}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-xl shadow-lg transform transition hover:scale-105"
                  >
                    Search Wound Care Clinics
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Feature Cards */}
          <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Nationwide Search</h3>
                <p className="text-gray-600">Find specialized wound care clinics across the entire United States with comprehensive coverage.</p>
              </div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Care</h3>
                <p className="text-gray-600">Connect with certified wound care specialists and facilities with proven track records.</p>
              </div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Progress</h3>
                <p className="text-gray-600">Monitor your search history and track facility research with detailed analytics.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
