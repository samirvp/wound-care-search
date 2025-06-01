
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, MapPin, Heart, Users, TrendingUp, Clock, Zap, Target, Globe, Phone, Linkedin, Upload, FileSpreadsheet, ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [zipCode, setZipCode] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const [showUploadOptions, setShowUploadOptions] = useState(false);
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
      title: "Searching with AI Intelligence Powered by Data Maverick",
      description: `Unleashing AI power to discover everything about ${facilityName} near ${zipCode}...`
    });

    // Navigate to dashboard
    navigate("/dashboard");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File uploaded successfully!",
        description: `Processing ${file.name} for bulk facility search...`
      });
      // Here you would typically process the Excel file
      navigate("/dashboard");
    }
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
              Aries Medical Partners
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Your intelligent client discovery platform for wound care facilities. One search replaces hours of manual research - instantly uncover facility details, practice ownership, physician backgrounds, and professional networks.
            </p>
            
            {/* Value Proposition */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto mb-12 shadow-lg border border-blue-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Our Platform?</h2>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Manual Research Takes Hours</h3>
                      <p className="text-sm text-gray-600">Google Maps searches, phone calls, LinkedIn stalking, website digging</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Phone className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Endless Cold Calls</h3>
                      <p className="text-sm text-gray-600">Trying to determine if they're private practice or hospital-owned</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Instant Intelligence</h3>
                      <p className="text-sm text-gray-600">One click reveals everything: ownership, services, physician profiles</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Smart Targeting</h3>
                      <p className="text-sm text-gray-600">Focus on qualified prospects with complete background intel</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Card */}
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Start Your Intelligent Search</h2>
                  <p className="text-gray-600">Discover everything about your potential clients in seconds</p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
                    <Input 
                      type="text" 
                      placeholder="Enter your zip code (e.g., 90210)" 
                      value={zipCode} 
                      onChange={(e) => setZipCode(e.target.value)} 
                      className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-400 transition-colors rounded-full bg-slate-100" 
                    />
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                    <Input 
                      type="text" 
                      placeholder="Facility name (e.g., Healing Center)" 
                      value={facilityName} 
                      onChange={(e) => setFacilityName(e.target.value)} 
                      className="pl-12 h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-green-400 transition-colors bg-gray-200" 
                    />
                  </div>

                  <Button 
                    onClick={handleSearch} 
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-xl shadow-lg transform transition hover:scale-105"
                  >
                    Unleash AI-Powered Research
                  </Button>

                  {/* Upload Section */}
                  <div className="relative mt-6">
                    <div className="flex items-center justify-center">
                      <div className="flex-grow border-t border-gray-300"></div>
                      <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium">OR</span>
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    
                    <div className="mt-4 relative">
                      <Button
                        variant="outline"
                        onClick={() => setShowUploadOptions(!showUploadOptions)}
                        className="w-full h-12 border-2 border-dashed border-blue-300 hover:border-blue-400 bg-blue-50/50 hover:bg-blue-100/50 text-blue-700 rounded-xl transition-all duration-200"
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        Bulk Upload Facilities
                        <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${showUploadOptions ? 'rotate-180' : ''}`} />
                      </Button>

                      {showUploadOptions && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-10">
                          <div className="space-y-3">
                            <div className="text-center">
                              <p className="text-sm text-gray-600 mb-3">Upload multiple facilities at once</p>
                            </div>
                            
                            <label className="block">
                              <input
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                onChange={handleFileUpload}
                                className="hidden"
                              />
                              <div className="flex items-center justify-center p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-400 hover:bg-green-50/50 cursor-pointer transition-all">
                                <FileSpreadsheet className="w-5 h-5 text-green-600 mr-2" />
                                <span className="text-green-700 font-medium">Upload Excel File</span>
                              </div>
                            </label>
                            
                            <div className="text-center">
                              <p className="text-xs text-gray-500">
                                Supported formats: .xlsx, .xls, .csv
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Include columns: Facility Name, Zip Code
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* What You'll Discover */}
          <div className="mt-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What You'll Discover Instantly</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Website Intelligence</h3>
                  <p className="text-gray-600 text-sm">Automatically scrape and analyze their website for services, specialties, and key information</p>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Practice Ownership</h3>
                  <p className="text-gray-600 text-sm">Instantly identify if it's private practice, hospital-owned, or part of a larger network</p>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Physician Profiles</h3>
                  <p className="text-gray-600 text-sm">Discover doctor backgrounds, specialties, education, and career history</p>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Linkedin className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Professional Networks</h3>
                  <p className="text-gray-600 text-sm">Uncover connections, referral patterns, and professional relationships</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Nationwide Coverage</h3>
                <p className="text-gray-600">Access comprehensive data on wound care facilities across all 50 states with real-time updates.</p>
              </div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Lightning Fast</h3>
                <p className="text-gray-600">What takes hours of manual research now happens in seconds with our AI-powered platform.</p>
              </div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Everything</h3>
                <p className="text-gray-600">Monitor your research history, outreach efforts, and track client engagement with detailed analytics.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
