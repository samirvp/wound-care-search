
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MapPin, Phone, Mail, Calendar, Users, Building, CheckCircle, XCircle } from "lucide-react";

const SubmissionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const submission = location.state?.submission;

  if (!submission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 flex items-center justify-center">
        <Card className="p-8 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
          <p className="text-white text-center">Submission not found!</p>
          <Button onClick={() => navigate("/dashboard")} className="mt-4 w-full">
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 via-orange-400 to-yellow-400 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="rounded-xl border-2 border-white/50 bg-white/20 hover:bg-white/30 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              🏥 Clinic Deep Dive
            </h1>
            <p className="text-white/90">Detailed facility information</p>
          </div>
        </div>

        {/* Main Info Card */}
        <Card className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{submission.facilityName}</h2>
              <div className="flex items-center space-x-2 text-white/90 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{submission.address}</span>
              </div>
            </div>
            <div className="bg-green-400/30 rounded-xl p-3 border border-green-300/50">
              <p className="text-white font-bold">📊 Research Status</p>
              <p className="text-green-300 text-sm">Active Discovery</p>
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Skin Grafts Onsite</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {submission.performsSkinGrafts ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <span className="font-bold">Available</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-300" />
                        <span className="font-bold">Not Available</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Practice Type</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Building className="w-5 h-5" />
                    <span className="font-bold">
                      {submission.privatePractice ? "Private" : "Hospital System"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Outreach Status</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {submission.outreached ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-yellow-300" />
                        <span className="font-bold">Contacted</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5 text-orange-300" />
                        <span className="font-bold">Pending</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Mock Research Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30">
            <h3 className="text-xl font-bold text-white mb-4">📋 Research Findings</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/90">Patient Volume</span>
                <span className="text-cyan-300 font-bold">~850/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/90">Specializations</span>
                <span className="text-green-300 font-bold">4 Areas</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/90">Staff Size</span>
                <span className="text-purple-300 font-bold">12-15 Members</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/90">Insurance Accepted</span>
                <span className="text-yellow-300 font-bold">15+ Plans</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30">
            <h3 className="text-xl font-bold text-white mb-4">🎯 Opportunity Score</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-white/90 mb-1">
                  <span>Market Fit</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-white/90 mb-1">
                  <span>Partnership Potential</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-white/90 mb-1">
                  <span>Growth Opportunity</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={() => navigate("/ai-email-draft", { state: { submission } })}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl"
          >
            <Mail className="w-4 h-4 mr-2" />
            Draft AI Email
          </Button>
          <Button 
            variant="outline"
            className="rounded-xl border-2 border-white/50 bg-white/20 hover:bg-white/30 text-white"
          >
            <Phone className="w-4 h-4 mr-2" />
            Schedule Call
          </Button>
          <Button 
            variant="outline"
            className="rounded-xl border-2 border-white/50 bg-white/20 hover:bg-white/30 text-white"
          >
            <Users className="w-4 h-4 mr-2" />
            Add to Pipeline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;
