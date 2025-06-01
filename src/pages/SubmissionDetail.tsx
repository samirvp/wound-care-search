import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Building, Users, CheckCircle, XCircle, Phone, Mail, Calendar, Clock, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AriesNavigation from "@/components/AriesNavigation";
import AriesWatermark from "@/components/AriesWatermark";

interface SubmissionData {
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

const SubmissionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [submission, setSubmission] = useState<SubmissionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First try to get data from router state
    const stateSubmission = location.state?.submission;
    
    if (stateSubmission) {
      setSubmission(stateSubmission);
      setLoading(false);
      return;
    }

    // If no state data, try to find it in localStorage
    try {
      const storedSearches = JSON.parse(localStorage.getItem("woundcare-searches") || "[]");
      const foundSubmission = storedSearches.find((s: SubmissionData) => s.id === parseInt(id || "0"));
      
      if (foundSubmission) {
        setSubmission(foundSubmission);
        // Store in state for future navigation
        window.history.replaceState({ submission: foundSubmission }, '', window.location.pathname);
      } else {
        console.log("No submission found with ID:", id);
        toast({
          title: "Submission not found",
          description: "The requested submission could not be found. Redirecting to dashboard.",
          variant: "destructive"
        });
        // Redirect to dashboard after a short delay
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (error) {
      console.error("Error loading submission data:", error);
      toast({
        title: "Error loading data",
        description: "There was an error loading the submission data. Redirecting to dashboard.",
        variant: "destructive"
      });
      setTimeout(() => navigate("/dashboard"), 2000);
    }
    
    setLoading(false);
  }, [id, location.state, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading submission data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <AriesWatermark />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center py-12">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No submission data found</h2>
            <p className="text-gray-600 mb-6">The submission you're looking for could not be found.</p>
            <Button onClick={() => navigate("/dashboard")} className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleAIDraftEmail = () => {
    navigate("/ai-email-draft", {
      state: { submission }
    });
  };

  const handleDeepResearch = () => {
    navigate("/facility-research", {
      state: { submission }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <AriesWatermark />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
          <div className="flex items-center justify-between">
            <AriesNavigation />
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-800">Facility Intelligence Report</h2>
              <p className="text-gray-600">Comprehensive research & analysis</p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <Button 
          onClick={() => navigate("/dashboard")} 
          variant="outline" 
          className="mb-6 hover:bg-gray-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Main Content */}
        <div className="grid gap-6">
          {/* Facility Overview */}
          <Card className="p-8 bg-white rounded-xl border border-gray-200 shadow-lg">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{submission.facilityName}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{submission.address}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={submission.privatePractice ? "default" : "secondary"} className="text-sm">
                    {submission.privatePractice ? "Private Practice" : "Hospital Network"}
                  </Badge>
                  <Badge variant={submission.performsSkinGrafts ? "default" : "destructive"} className="text-sm">
                    {submission.performsSkinGrafts ? "Performs Skin Grafts" : "No Skin Grafts"}
                  </Badge>
                  <Badge variant={submission.outreached ? "default" : "outline"} className="text-sm">
                    {submission.outreached ? "Contacted" : "New Lead"}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Researched by</p>
                <p className="font-semibold text-gray-800">{submission.submittedBy}</p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(submission.timestamp)}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              {submission.performsSkinGrafts && (
                <Button onClick={handleDeepResearch} className="bg-purple-600 hover:bg-purple-700">
                  <Search className="w-4 h-4 mr-2" />
                  Deep Research
                </Button>
              )}
              <Button onClick={handleAIDraftEmail} className="bg-blue-600 hover:bg-blue-700">
                <Mail className="w-4 h-4 mr-2" />
                AI Draft Email
              </Button>
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Follow-up
              </Button>
            </div>
          </Card>

          {/* Intelligence Insights */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2 text-blue-600" />
                Practice Intelligence
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Practice Type:</span>
                  <span className="font-medium">{submission.privatePractice ? "Private Practice" : "Hospital Network"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Skin Graft Services:</span>
                  <div className="flex items-center">
                    {submission.performsSkinGrafts ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-700 font-medium">Available</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-500 mr-1" />
                        <span className="text-red-700 font-medium">Not Available</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Market Area:</span>
                  <span className="font-medium">{submission.zipCode}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-green-600" />
                Outreach Timeline
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Touch Point:</span>
                  <span className="font-medium">{submission.lastTouchPoint || "Initial research"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Next Follow-up:</span>
                  <span className="font-medium">{submission.nextFollowUp || "TBD"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${submission.outreached ? 'text-green-700' : 'text-orange-600'}`}>
                    {submission.outreached ? "Active Pipeline" : "New Lead"}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;
