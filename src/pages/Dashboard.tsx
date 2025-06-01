import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Building, Users, CheckCircle, XCircle, Mail, MapPin, Calendar, TrendingUp, User, BarChart3, Target, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import AriesNavigation from "@/components/AriesNavigation";
import AriesWatermark from "@/components/AriesWatermark";

interface SearchRecord {
  id: number;
  zipCode: string;
  facilityName: string;
  address: string;
  performsSkinGrafts: boolean;
  privatePractice: boolean;
  outreached: boolean;
  timestamp: string;
  submittedBy: "Dana" | "Tiffany";
  lastTouchPoint?: string;
  nextFollowUp?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [searches, setSearches] = useState<SearchRecord[]>([]);
  const [activeTab, setActiveTab] = useState("day");
  const [userFilter, setUserFilter] = useState<"all" | "Dana" | "Tiffany">("all");

  useEffect(() => {
    console.log("User automatically logged in");

    // Pre-fill with sample data assigned to Dana and Tiffany
    const sampleData: SearchRecord[] = [{
      id: 1,
      zipCode: "90210",
      facilityName: "Beverly Hills Wound Care Center",
      address: "123 Rodeo Drive, Beverly Hills, CA 90210",
      performsSkinGrafts: true,
      privatePractice: true,
      outreached: false,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      submittedBy: "Dana",
      lastTouchPoint: "Initial research",
      nextFollowUp: "Email draft"
    }, {
      id: 2,
      zipCode: "10001",
      facilityName: "Manhattan Advanced Healing Institute",
      address: "456 5th Avenue, New York, NY 10001",
      performsSkinGrafts: true,
      privatePractice: false,
      outreached: true,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      submittedBy: "Tiffany",
      lastTouchPoint: "Follow-up call scheduled",
      nextFollowUp: "Demo meeting"
    }, {
      id: 3,
      zipCode: "33101",
      facilityName: "Miami Beach Specialty Wound Clinic",
      address: "789 Ocean Drive, Miami Beach, FL 33101",
      performsSkinGrafts: false,
      privatePractice: true,
      outreached: false,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      submittedBy: "Dana",
      lastTouchPoint: "Website research",
      nextFollowUp: "Cold outreach"
    }, {
      id: 4,
      zipCode: "60601",
      facilityName: "Chicago Comprehensive Wound Center",
      address: "321 Michigan Avenue, Chicago, IL 60601",
      performsSkinGrafts: true,
      privatePractice: false,
      outreached: true,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      submittedBy: "Tiffany",
      lastTouchPoint: "Email sent - awaiting response",
      nextFollowUp: "Phone follow-up"
    }, {
      id: 5,
      zipCode: "78701",
      facilityName: "Austin Dermatology & Wound Care",
      address: "654 Congress Avenue, Austin, TX 78701",
      performsSkinGrafts: false,
      privatePractice: true,
      outreached: false,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      submittedBy: "Dana",
      lastTouchPoint: "LinkedIn connection",
      nextFollowUp: "Email introduction"
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
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      submittedBy: "Tiffany",
      lastTouchPoint: "Proposal sent",
      nextFollowUp: "Decision call"
    }, {
      id: 7,
      zipCode: "30301",
      facilityName: "Atlanta Healing Solutions",
      address: "147 Peachtree Street, Atlanta, GA 30301",
      performsSkinGrafts: false,
      privatePractice: false,
      outreached: false,
      timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      submittedBy: "Dana",
      lastTouchPoint: "Initial discovery",
      nextFollowUp: "Qualification call"
    }, {
      id: 8,
      zipCode: "85001",
      facilityName: "Phoenix Desert Wound Clinic",
      address: "258 Central Avenue, Phoenix, AZ 85001",
      performsSkinGrafts: true,
      privatePractice: true,
      outreached: true,
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      submittedBy: "Tiffany",
      lastTouchPoint: "Contract negotiation",
      nextFollowUp: "Final approval"
    }];

    // Merge with existing searches from localStorage
    const existingSearches = JSON.parse(localStorage.getItem("woundcare-searches") || "[]");
    const allSearches = [...sampleData, ...existingSearches];
    setSearches(allSearches);
    localStorage.setItem("woundcare-searches", JSON.stringify(allSearches));
  }, []);

  const getFilteredSearches = (period: string) => {
    const now = new Date();
    let filtered = searches.filter(search => {
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

    // Apply user filter
    if (userFilter !== "all") {
      filtered = filtered.filter(search => search.submittedBy === userFilter);
    }
    return filtered;
  };

  const getMetrics = (period: string) => {
    const filtered = getFilteredSearches(period);
    const uniqueZipCodes = new Set(filtered.map(s => s.zipCode)).size;
    const uniqueFacilities = new Set(filtered.map(s => s.facilityName)).size;
    const outreached = filtered.filter(s => s.outreached).length;
    const conversionRate = filtered.length > 0 ? Math.round((outreached / filtered.length) * 100) : 0;
    
    return {
      totalSearches: filtered.length,
      uniqueZipCodes,
      uniqueFacilities,
      outreached,
      conversionRate,
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
    navigate(`/submission/${submission.id}`, {
      state: {
        submission
      }
    });
  };

  const handleAIDraftEmail = (submission: SearchRecord) => {
    navigate("/ai-email-draft", {
      state: {
        submission
      }
    });
  };

  const currentMetrics = getMetrics(activeTab);
  const displaySearches = getFilteredSearches("year"); // Show all for table

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 relative">
      <AriesWatermark />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
          <div className="flex items-center justify-between">
            <AriesNavigation />
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
              <p className="text-gray-600">Facility Research & Outreach Management</p>
            </div>
          </div>
        </div>

        {/* User Filter Tabs */}
        <Card className="p-4 bg-white rounded-xl border border-gray-200 shadow-lg mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <User className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Team Performance</h3>
          </div>
          <Tabs value={userFilter} onValueChange={value => setUserFilter(value as "all" | "Dana" | "Tiffany")} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-lg p-1">
              <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">All Members</TabsTrigger>
              <TabsTrigger value="Dana" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Dana</TabsTrigger>
              <TabsTrigger value="Tiffany" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Tiffany</TabsTrigger>
            </TabsList>
          </Tabs>
        </Card>

        {/* Enhanced Metrics Dashboard */}
        <Card className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-lg p-1 mb-6">
              <TabsTrigger value="day" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Today</TabsTrigger>
              <TabsTrigger value="week" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">This Week</TabsTrigger>
              <TabsTrigger value="month" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">This Month</TabsTrigger>
              <TabsTrigger value="year" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">This Year</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Total Searches</p>
                      <p className="text-3xl font-bold">{currentMetrics.totalSearches}</p>
                    </div>
                    <Search className="w-8 h-8 text-blue-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100 text-sm font-medium">Facilities Found</p>
                      <p className="text-3xl font-bold">{currentMetrics.uniqueFacilities}</p>
                    </div>
                    <Building className="w-8 h-8 text-emerald-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Outreached</p>
                      <p className="text-3xl font-bold">{currentMetrics.outreached}</p>
                    </div>
                    <Mail className="w-8 h-8 text-purple-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Conversion Rate</p>
                      <p className="text-3xl font-bold">{currentMetrics.conversionRate}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-pink-100 text-sm font-medium">Unique Markets</p>
                      <p className="text-3xl font-bold">{currentMetrics.uniqueZipCodes}</p>
                    </div>
                    <MapPin className="w-8 h-8 text-pink-200" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Enhanced Submissions Table */}
        <Card className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <Building className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-800">Facility Pipeline & Touch Points</h2>
            {userFilter !== "all" && <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {userFilter}'s Portfolio
              </span>}
          </div>

          {displaySearches.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No discoveries found</p>
              <p className="text-gray-400">Start searching for wound care clinics!</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-gray-700 font-semibold">Facility Name</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Location</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Skin Grafts</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Private</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Last Touch Point</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Next Follow-up</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Owner</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displaySearches.slice(0, 10).map((search, index) => (
                    <TableRow 
                      key={search.id} 
                      className="hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100" 
                      onClick={() => index < 5 ? handleSubmissionClick(search) : null}
                    >
                      <TableCell className="font-medium text-gray-900">
                        <div className="flex items-center space-x-2">
                          {index < 5 && <span className="text-blue-500">🔗</span>}
                          <span className={index < 5 ? "text-blue-600 hover:text-blue-800 underline" : ""}>{search.facilityName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{search.zipCode}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {search.performsSkinGrafts ? (
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-green-700 font-medium text-sm">Yes</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="text-red-700 font-medium text-sm">No</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={`text-sm font-medium ${search.privatePractice ? 'text-blue-700' : 'text-gray-600'}`}>
                          {search.privatePractice ? 'Yes' : 'No'}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        {search.lastTouchPoint || "Initial discovery"}
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        {search.nextFollowUp || "TBD"}
                      </TableCell>
                      <TableCell>
                        {search.outreached ? (
                          <span className="text-green-700 font-medium text-sm">✓ Active</span>
                        ) : (
                          <span className="text-orange-600 font-medium text-sm">⏳ New Lead</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${search.submittedBy === "Dana" ? "bg-purple-100 text-purple-800" : "bg-pink-100 text-pink-800"}`}>
                          {search.submittedBy}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAIDraftEmail(search);
                            }} 
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded text-xs shadow-sm hover:shadow-md transition-shadow px-2 py-1"
                          >
                            <Mail className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-gray-300 hover:border-gray-400 rounded text-xs px-2 py-1"
                          >
                            <Phone className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {displaySearches.length > 10 && (
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">Showing 10 of {displaySearches.length} discoveries</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
