
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, MapPin, Search, TrendingUp, Users, Clock, Building } from "lucide-react";

interface SearchRecord {
  id: number;
  zipCode: string;
  facilityName: string;
  timestamp: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [searches, setSearches] = useState<SearchRecord[]>([]);
  const [activeTab, setActiveTab] = useState("day");

  useEffect(() => {
    // Auto-login simulation - in a real app, this would be handled by your auth system
    console.log("User automatically logged in");

    // Load search history
    const savedSearches = JSON.parse(localStorage.getItem("woundcare-searches") || "[]");
    setSearches(savedSearches);
  }, []);

  const getFilteredSearches = (period: string) => {
    const now = new Date();
    const filtered = searches.filter(search => {
      const searchDate = new Date(search.timestamp);
      const diffTime = now.getTime() - searchDate.getTime();
      
      switch (period) {
        case "day":
          return diffTime <= 24 * 60 * 60 * 1000;
        case "week":
          return diffTime <= 7 * 24 * 60 * 60 * 1000;
        case "month":
          return diffTime <= 30 * 24 * 60 * 60 * 1000;
        case "year":
          return diffTime <= 365 * 24 * 60 * 60 * 1000;
        default:
          return true;
      }
    });
    return filtered;
  };

  const getMetrics = (period: string) => {
    const filtered = getFilteredSearches(period);
    const uniqueZipCodes = new Set(filtered.map(s => s.zipCode)).size;
    const uniqueFacilities = new Set(filtered.map(s => s.facilityName)).size;
    
    return {
      totalSearches: filtered.length,
      uniqueZipCodes,
      uniqueFacilities,
      avgPerDay: period === "day" ? filtered.length : Math.round(filtered.length / (period === "week" ? 7 : period === "month" ? 30 : 365))
    };
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const currentMetrics = getMetrics(activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 rounded-xl border-2 hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Search</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Your Dashboard
              </h1>
              <p className="text-gray-600">Track your wound care clinic research</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Auto-logged in</p>
            <p className="text-lg font-semibold text-green-600">Welcome back!</p>
          </div>
        </div>

        {/* Metrics Tabs */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl border-0 shadow-lg mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-xl p-1">
              <TabsTrigger value="day" className="rounded-lg">Day</TabsTrigger>
              <TabsTrigger value="week" className="rounded-lg">Week</TabsTrigger>
              <TabsTrigger value="month" className="rounded-lg">Month</TabsTrigger>
              <TabsTrigger value="year" className="rounded-lg">Year</TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value={activeTab} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Total Searches</p>
                        <p className="text-3xl font-bold">{currentMetrics.totalSearches}</p>
                      </div>
                      <Search className="w-8 h-8 text-blue-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Unique Zip Codes</p>
                        <p className="text-3xl font-bold">{currentMetrics.uniqueZipCodes}</p>
                      </div>
                      <MapPin className="w-8 h-8 text-green-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Unique Facilities</p>
                        <p className="text-3xl font-bold">{currentMetrics.uniqueFacilities}</p>
                      </div>
                      <Building className="w-8 h-8 text-purple-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm">Avg Per Day</p>
                        <p className="text-3xl font-bold">{currentMetrics.avgPerDay}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-orange-200" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </Card>

        {/* Recent Searches */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl border-0 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <Clock className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Recent Submissions</h2>
          </div>

          {searches.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No searches yet</p>
              <p className="text-gray-400">Start by searching for wound care clinics!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {searches.slice(0, 10).map((search) => (
                <div
                  key={search.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                      <Building className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{search.facilityName}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>Zip Code: {search.zipCode}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{formatDate(search.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {searches.length > 10 && (
            <div className="mt-6 text-center">
              <p className="text-gray-500">Showing 10 of {searches.length} total searches</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
