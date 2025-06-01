
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Building, TrendingUp, Users, DollarSign, FileText, Calendar, Phone, Mail, Globe, MapPin } from "lucide-react";

const FacilityResearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const submission = location.state?.submission;
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("Initializing Research...");
  const [isComplete, setIsComplete] = useState(false);
  const [researchData, setResearchData] = useState(null);

  const researchSteps = [
    "Analyzing facility website and online presence...",
    "Gathering Medicare Part B acceptance data...",
    "Researching monthly skin graft volume estimates...",
    "Analyzing physician backgrounds and specialties...",
    "Collecting financial and operational metrics...",
    "Compiling competitive analysis...",
    "Finalizing comprehensive facility profile..."
  ];

  useEffect(() => {
    if (!submission) return;

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < researchSteps.length) {
        setCurrentStep(researchSteps[currentStepIndex]);
        setProgress((currentStepIndex + 1) * (100 / researchSteps.length));
        currentStepIndex++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        generateResearchData();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [submission]);

  const generateResearchData = () => {
    // Simulate comprehensive research data
    const mockData = {
      skinGraftMetrics: {
        monthlyVolumeCm2: "2,400-3,200",
        averageProcedureSize: "15-25 cm²",
        monthlyProcedures: "120-180",
        primaryIndications: ["Diabetic ulcers", "Venous insufficiency", "Pressure sores", "Traumatic wounds"]
      },
      medicareData: {
        partBAcceptance: "Yes - Full coverage",
        reimbursementRate: "$2,847 per procedure",
        averagePayment: "$2,200-2,600",
        priorAuthRequired: "Case-by-case basis"
      },
      facilityProfile: {
        establishedYear: "2018",
        totalStaff: "12-15 clinical staff",
        monthlyPatientVolume: "400-550",
        specialtyFocus: "Advanced wound care & hyperbaric medicine",
        certifications: ["AAWC Accredited", "UHMS Certified"]
      },
      physicianDetails: {
        leadPhysician: "Dr. Sarah Martinez, MD",
        credentials: "Board Certified Wound Care, 15+ years experience",
        education: "Johns Hopkins Medical School",
        publications: "12 peer-reviewed articles on wound care",
        affiliations: ["American College of Wound Healing", "Wound Healing Society"]
      },
      competitiveAnalysis: {
        marketPosition: "Leading facility in 25-mile radius",
        uniqueAdvantages: ["Only hyperbaric chamber in area", "On-site skin bank"],
        potentialChallenges: ["Limited parking", "Insurance processing delays"],
        growthOpportunities: ["Telemedicine expansion", "Additional locations"]
      },
      financialInsights: {
        estimatedRevenue: "$3.2M - $4.1M annually",
        skinGraftRevenue: "~$650K annually (20% of total)",
        payerMix: "Medicare 45%, Commercial 35%, Medicaid 20%",
        profitMargins: "18-22% (above industry average)"
      }
    };

    setResearchData(mockData);
  };

  if (!submission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="p-8 bg-white rounded-xl border border-gray-200 shadow-lg">
          <p className="text-gray-600">No submission data found.</p>
          <Button onClick={() => navigate("/dashboard")} className="mt-4">
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/submission/${submission.id}`, { state: { submission } })}
              className="flex items-center space-x-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Details</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Comprehensive Facility Research</h1>
              <p className="text-gray-600">Deep dive analysis for skin graft facilities</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {submission.facilityName}
          </Badge>
        </div>

        {!isComplete ? (
          /* Research Progress */
          <Card className="p-8 bg-white rounded-xl border border-gray-200 shadow-lg">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center">
                <Search className="w-12 h-12 text-blue-600 animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">AI Research in Progress</h2>
                <p className="text-gray-600">{currentStep}</p>
              </div>
              <div className="max-w-md mx-auto">
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-gray-500 mt-2">{Math.round(progress)}% Complete</p>
              </div>
            </div>
          </Card>
        ) : (
          /* Research Results */
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Skin Graft Metrics */}
            <Card className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-800">Skin Graft Metrics</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Monthly Volume</p>
                    <p className="text-lg font-bold text-green-800">{researchData?.skinGraftMetrics.monthlyVolumeCm2} cm²</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Avg Procedure Size</p>
                    <p className="text-lg font-bold text-blue-800">{researchData?.skinGraftMetrics.averageProcedureSize}</p>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">Monthly Procedures</p>
                  <p className="text-lg font-bold text-purple-800">{researchData?.skinGraftMetrics.monthlyProcedures}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Primary Indications</p>
                  <div className="flex flex-wrap gap-2">
                    {researchData?.skinGraftMetrics.primaryIndications.map((indication, index) => (
                      <Badge key={index} variant="secondary">{indication}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Medicare & Reimbursement */}
            <Card className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <DollarSign className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">Medicare & Reimbursement</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Part B Acceptance</span>
                  <span className="text-green-700 font-semibold">{researchData?.medicareData.partBAcceptance}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Reimbursement Rate</span>
                  <span className="text-blue-700 font-semibold">{researchData?.medicareData.reimbursementRate}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Average Payment</span>
                  <span className="text-purple-700 font-semibold">{researchData?.medicareData.averagePayment}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Prior Auth Required</span>
                  <span className="text-orange-700 font-semibold">{researchData?.medicareData.priorAuthRequired}</span>
                </div>
              </div>
            </Card>

            {/* Physician Details */}
            <Card className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-800">Lead Physician Profile</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{researchData?.physicianDetails.leadPhysician}</h3>
                  <p className="text-gray-600">{researchData?.physicianDetails.credentials}</p>
                </div>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Education:</span>
                    <span className="font-medium">{researchData?.physicianDetails.education}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Publications:</span>
                    <span className="font-medium">{researchData?.physicianDetails.publications}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Professional Affiliations</p>
                  <div className="space-y-1">
                    {researchData?.physicianDetails.affiliations.map((affiliation, index) => (
                      <p key={index} className="text-sm text-gray-600">• {affiliation}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Financial Insights */}
            <Card className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <DollarSign className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-800">Financial Insights</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Estimated Annual Revenue</p>
                  <p className="text-lg font-bold text-green-800">{researchData?.financialInsights.estimatedRevenue}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Skin Graft Revenue</p>
                  <p className="text-lg font-bold text-blue-800">{researchData?.financialInsights.skinGraftRevenue}</p>
                </div>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payer Mix:</span>
                    <span className="font-medium">{researchData?.financialInsights.payerMix}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profit Margins:</span>
                    <span className="font-medium">{researchData?.financialInsights.profitMargins}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {isComplete && (
          <div className="mt-6 flex justify-center space-x-4">
            <Button 
              onClick={() => navigate("/ai-email-draft", { state: { submission, researchData } })}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-shadow"
            >
              <Mail className="w-4 h-4 mr-2" />
              Draft Personalized Email
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.print()}
              className="border-gray-300 hover:border-gray-400"
            >
              <FileText className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilityResearch;
