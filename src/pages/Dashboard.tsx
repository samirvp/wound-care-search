
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Calendar, MapPin, Search, TrendingUp, Users, Clock, Building, Mail, CheckCircle, XCircle, Sparkles } from "lucide-react";

interface SearchRecord {
  id: number;
  zipCode: string;
  facilityName: string;
  address: string;
  performsSkinGrafts: boolean;
  privatePractice: boolean;
  outreached: boolean;
  timestamp: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [searches, setSearches] = useState<SearchRecord[]>([]);
  const [activeTab, setActiveTab] = useState("day");

  useEffect(() => {
    console.log("User automatically logged in");

    // Pre-fill with sample data
    const sampleData: SearchRecord[] = [
      {
        id: 1,
        zipCode: "90210",
        facilityName: "Beverly Hills Wound Care Center",
        address: "123 Rodeo Drive, Beverly Hills, CA 90210",
        performsSkinGrafts: true,
        privatePractice: true,
        outreached: false,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        zipCode: "10001",
        facilityName: "Manhattan Advanced Healing Institute",
        address: "456 5th Avenue, New York, NY 10001",
        performsSkinGrafts: true,
        privatePractice: false,
        outreached: true,
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        zipCode: "33101",
        facilityName: "Miami Beach Specialty Wound Clinic",
        address: "789 Ocean Drive, Miami Beach, FL 33101",
        performsSkinGrafts: false,
        privatePractice: true,
        outreached: false,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 4,
        zipCode: "60601",
        facilityName: "Chicago Comprehensive Wound Center",
        address: "321 Michigan Avenue, Chicago, IL 60601",
        performsSkinGrafts: true,
        privatePractice: false,
        outreached: true,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 5,
        zipCode: "78701",
        facilityName: "Austin Dermatology & Wound Care",
        address: "654 Congress Avenue, Austin, TX 78701",
        performsSkinGrafts: false,
        privatePractice: true,
        outreached: false,
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      // Additional sample data for different time periods
      {
        id: 6,
        zipCode: "98101",
        facilityName: "Seattle Advanced Wound Treatment",
        address: "987 Pine Street, Seattle, WA 98101",
        performsSkinGrafts: true,
        privatePractice: true,
        outreached: true,
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 7,
        zipCode: "30301",
        facilityName: "Atlanta Healing Solutions",
        address: "147 Peachtree Street, Atlanta, GA 30301",
        performsSkinGrafts: false,
        privatePractice: false,
        outreached: false,
        timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 8,
        zipCode: "85001",
        facilityName: "Phoenix Desert Wound Clinic",
        address: "258 Central Avenue, Phoenix, AZ 85001",
        performsSkinGrafts: true,
        privatePractice: true,
        outreached: true,
        timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    // Merge with existing searches from localStorage
    const existingSearches = JSON.parse(localStorage.getItem("woundcare-searches") || "[]");
    const allSearches = [...sampleData, ...existingSearches];
    setSearches(allSearches);
    localStorage.setItem("woundcare-searches", JSON.stringify(allSearches));
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

  const handleSubmissionClick = (submission: SearchRecord) => {
    navigate(`/submission/${submission.id}`, { state: { submission } });
  };

  const handleAIDraftEmail = (submission: SearchRecord) => {
    navigate("/ai-email-draft", { state: { submission } });
  };

  const currentMetrics = getMetrics(activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 via-orange-400 to-yellow-400 p-2">
      <div className="max-w-full mx-auto">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-4 bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 rounded-xl border-2 border-white/50 bg-white/20 hover:bg-white/30 text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Search</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                🏥 WoundCare Command Center 🚀
              </h1>
              <p className="text-white/90 text-sm">Tracking your clinic research journey</p>
            </div>
          </div>
          <div className="text-right bg-green-400/30 rounded-xl p-3 border border-green-300/50">
            <p className="text-xs text-white/80">Status</p>
            <p className="text-sm font-bold text-white">✨ Auto-Logged In ✨</p>
          </div>
        </div>

        {/* Metrics Tabs */}
        <Card className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/20 rounded-xl p-1 mb-4">
              <TabsTrigger value="day" className="rounded-lg text-white data-[state=active]:bg-white data-[state=active]:text-black">📅 Day</TabsTrigger>
              <TabsTrigger value="week" className="rounded-lg text-white data-[state=active]:bg-white data-[state=active]:text-black">📊 Week</TabsTrigger>
              <TabsTrigger value="month" className="rounded-lg text-white data-[state=active]:bg-white data-[state=active]:text-black">📈 Month</TabsTrigger>
              <TabsTrigger value="year" className="rounded-lg text-white data-[state=active]:bg-white data-[state=active]:text-black">🎯 Year</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl p-4 text-white transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cyan-100 text-xs">🔍 Total Searches</p>
                      <p className="text-2xl font-bold">{currentMetrics.totalSearches}</p>
                    </div>
                    <Search className="w-6 h-6 text-cyan-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl p-4 text-white transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100 text-xs">📍 Unique Zips</p>
                      <p className="text-2xl font-bold">{currentMetrics.uniqueZipCodes}</p>
                    </div>
                    <MapPin className="w-6 h-6 text-emerald-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl p-4 text-white transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-violet-100 text-xs">🏥 Facilities</p>
                      <p className="text-2xl font-bold">{currentMetrics.uniqueFacilities}</p>
                    </div>
                    <Building className="w-6 h-6 text-violet-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl p-4 text-white transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-rose-100 text-xs">⚡ Daily Avg</p>
                      <p className="text-2xl font-bold">{currentMetrics.avgPerDay}</p>
                    </div>
                    <TrendingUp className="w-6 h-6 text-rose-200" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Submissions Table */}
        <Card className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30">
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <h2 className="text-xl font-bold text-white">🎯 Clinic Discovery Results</h2>
          </div>

          {searches.length === 0 ? (
            <div className="text-center py-8">
              <Search className="w-8 h-8 text-white/50 mx-auto mb-3" />
              <p className="text-white/70 text-lg">No discoveries yet!</p>
              <p className="text-white/50">Start exploring wound care clinics!</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl bg-white/5 border border-white/20">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/20 hover:bg-white/5">
                    <TableHead className="text-white font-bold">🏥 Clinic Name</TableHead>
                    <TableHead className="text-white font-bold">📍 Address</TableHead>
                    <TableHead className="text-white font-bold">✂️ Skin Grafts</TableHead>
                    <TableHead className="text-white font-bold">🏢 Private</TableHead>
                    <TableHead className="text-white font-bold">📞 Outreached</TableHead>
                    <TableHead className="text-white font-bold">🤖 AI Email</TableHead>
                    <TableHead className="text-white font-bold">📅 Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searches.slice(0, 10).map((search, index) => (
                    <TableRow
                      key={search.id}
                      className="border-white/20 hover:bg-white/10 transition-colors cursor-pointer"
                      onClick={() => index < 5 ? handleSubmissionClick(search) : null}
                    >
                      <TableCell className="font-medium text-white">
                        <div className="flex items-center space-x-2">
                          {index < 5 && <span className="text-green-300">🔗</span>}
                          <span className={index < 5 ? "text-cyan-300 underline" : ""}>{search.facilityName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-white/90 text-sm">{search.address}</TableCell>
                      <TableCell>
                        {search.performsSkinGrafts ? (
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-green-300 font-bold">YES</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <XCircle className="w-4 h-4 text-red-400" />
                            <span className="text-red-300 font-bold">NO</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {search.privatePractice ? (
                          <span className="text-blue-300 font-bold">YES</span>
                        ) : (
                          <span className="text-orange-300 font-bold">NO</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {search.outreached ? (
                          <span className="text-green-300 font-bold">✅ YES</span>
                        ) : (
                          <span className="text-yellow-300 font-bold">⏳ NO</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAIDraftEmail(search);
                          }}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg text-xs"
                        >
                          <Mail className="w-3 h-3 mr-1" />
                          Draft
                        </Button>
                      </TableCell>
                      <TableCell className="text-white/70 text-xs">{formatDate(search.timestamp)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {searches.length > 10 && (
            <div className="mt-3 text-center">
              <p className="text-white/70 text-sm">Showing 10 of {searches.length} discoveries 🎉</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
