
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Building, Users, Mail, Phone, Globe, Calendar, CheckCircle, XCircle } from "lucide-react";

const SubmissionDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const submission = location.state?.submission;

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

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Facility Details</h1>
              <p className="text-gray-600">Comprehensive facility information</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Submission #{submission.id}
          </Badge>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Facility Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Building className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">Facility Information</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{submission.facilityName}</h3>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{submission.address}</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Onsite Skin Grafts</span>
                    {submission.performsSkinGrafts ? (
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-green-700 font-semibold">Yes</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span className="text-red-700 font-semibold">No</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Private Practice</span>
                    <span className={`font-semibold ${submission.privatePractice ? 'text-blue-700' : 'text-gray-600'}`}>
                      {submission.privatePractice ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Mock Additional Details */}
            <Card className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-800">Staff & Services</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Lead Physician</h4>
                  <p className="text-gray-600">Dr. Sarah Martinez, MD - Board Certified Wound Care Specialist</p>
                  <p className="text-sm text-gray-500">15+ years experience, Johns Hopkins Medical School</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Diabetic Ulcers</Badge>
                    <Badge variant="secondary">Pressure Sores</Badge>
                    <Badge variant="secondary">Venous Insufficiency</Badge>
                    <Badge variant="secondary">Hyperbaric Therapy</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Equipment</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Hyperbaric Oxygen Chamber (2 units)</li>
                    <li>• Negative Pressure Wound Therapy</li>
                    <li>• Ultrasonic Debridement System</li>
                    <li>• Advanced Imaging Equipment</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact & Outreach */}
            <Card className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Mail className="w-6 h-6 text-purple-600" />
                <h2 className="text-lg font-bold text-gray-800">Outreach Status</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Outreached</span>
                  <span className={`font-semibold ${submission.outreached ? 'text-green-700' : 'text-orange-600'}`}>
                    {submission.outreached ? '✓ Completed' : '⏳ Pending'}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    onClick={() => navigate("/ai-email-draft", { state: { submission } })}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Draft AI Email
                  </Button>
                  
                  <Button variant="outline" className="w-full border-gray-300 hover:border-gray-400">
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule Call
                  </Button>
                  
                  <Button variant="outline" className="w-full border-gray-300 hover:border-gray-400">
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Website
                  </Button>
                </div>
              </div>
            </Card>

            {/* Submission Info */}
            <Card className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-6 h-6 text-orange-600" />
                <h2 className="text-lg font-bold text-gray-800">Submission Info</h2>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Submitted by:</span>
                  <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                    submission.submittedBy === "Dana" ? "bg-purple-100 text-purple-800" : "bg-pink-100 text-pink-800"
                  }`}>
                    {submission.submittedBy}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="text-gray-800">{formatDate(submission.timestamp)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Zip Code:</span>
                  <span className="text-gray-800">{submission.zipCode}</span>
                </div>
              </div>
            </Card>

            {/* Mock Analytics */}
            <Card className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient Volume:</span>
                  <span className="text-gray-800 font-medium">~150/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Treatment Cost:</span>
                  <span className="text-gray-800 font-medium">$2,400</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="text-green-600 font-medium">94%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network Size:</span>
                  <span className="text-gray-800 font-medium">7 locations</span>
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
