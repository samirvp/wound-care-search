
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Mail, Send, RefreshCw, User, Building, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AIEmailDraft = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const submission = location.state?.submission;

  const [emailData, setEmailData] = useState({
    senderName: "",
    senderTitle: "",
    companyName: "Aries Medical Partners",
    meetingPurpose: "",
    proposedTimeframe: "",
    specificInterests: "",
    customMessage: ""
  });

  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

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

  const generateEmail = () => {
    setIsGenerating(true);
    
    // Simulate AI email generation
    setTimeout(() => {
      const email = `Subject: Partnership Opportunity - Aries Medical Partners & ${submission.facilityName}

Dear Dr. Martinez and Team,

I hope this email finds you well. My name is ${emailData.senderName}, ${emailData.senderTitle} at ${emailData.companyName}. I'm reaching out regarding a potential partnership opportunity that could benefit ${submission.facilityName} and your patients.

After researching your facility at ${submission.address}, I was impressed by your commitment to advanced wound care ${submission.performsSkinGrafts ? 'and your onsite skin graft capabilities' : ''}. ${submission.privatePractice ? 'As a private practice' : 'As part of your healthcare network'}, you understand the importance of innovative solutions that improve patient outcomes while maintaining operational efficiency.

${emailData.meetingPurpose && `I'd love to discuss ${emailData.meetingPurpose} and how our partnership could specifically benefit your practice.`}

${emailData.specificInterests && `I'm particularly interested in exploring ${emailData.specificInterests} based on your current service offerings.`}

${emailData.customMessage && `\n${emailData.customMessage}\n`}

Would you be available for a brief ${emailData.proposedTimeframe || '15-20 minute'} conversation ${emailData.proposedTimeframe ? `within the next ${emailData.proposedTimeframe}` : 'in the coming weeks'}? I'm confident that our discussion could lead to meaningful opportunities for both our organizations.

I look forward to hearing from you.

Best regards,
${emailData.senderName}
${emailData.senderTitle}
${emailData.companyName}
[Your Phone Number]
[Your Email Address]`;

      setGeneratedEmail(email);
      setIsGenerating(false);
      
      toast({
        title: "Email Generated Successfully!",
        description: "Your personalized email draft is ready for review.",
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
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
              <h1 className="text-2xl font-bold text-gray-800">AI Email Draft</h1>
              <p className="text-gray-600">Generate personalized outreach emails</p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 shadow-sm">
            <p className="text-xs text-blue-600 font-medium">Target Facility</p>
            <p className="text-sm font-bold text-blue-700">{submission.facilityName}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-800">Email Configuration</h2>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <Input
                    placeholder="e.g., John Smith"
                    value={emailData.senderName}
                    onChange={(e) => handleInputChange("senderName", e.target.value)}
                    className="border-gray-300 focus:border-blue-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Title</label>
                  <Input
                    placeholder="e.g., Business Development Manager"
                    value={emailData.senderTitle}
                    onChange={(e) => handleInputChange("senderTitle", e.target.value)}
                    className="border-gray-300 focus:border-blue-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <Input
                  value={emailData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  className="border-gray-300 focus:border-blue-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Purpose</label>
                <Select onValueChange={(value) => handleInputChange("meetingPurpose", value)}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-400 transition-colors">
                    <SelectValue placeholder="Select primary purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product-demo">Product Demonstration</SelectItem>
                    <SelectItem value="partnership">Partnership Discussion</SelectItem>
                    <SelectItem value="consultation">Clinical Consultation</SelectItem>
                    <SelectItem value="technology">Technology Integration</SelectItem>
                    <SelectItem value="training">Staff Training Opportunity</SelectItem>
                    <SelectItem value="research">Research Collaboration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Proposed Timeframe</label>
                <Select onValueChange={(value) => handleInputChange("proposedTimeframe", value)}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-400 transition-colors">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="next-week">Next Week</SelectItem>
                    <SelectItem value="next-two-weeks">Next 2 Weeks</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specific Interests</label>
                <Input
                  placeholder="e.g., wound care protocols, patient outcomes, cost efficiency"
                  value={emailData.specificInterests}
                  onChange={(e) => handleInputChange("specificInterests", e.target.value)}
                  className="border-gray-300 focus:border-blue-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Message (Optional)</label>
                <Textarea
                  placeholder="Add any specific details or personal touches..."
                  value={emailData.customMessage}
                  onChange={(e) => handleInputChange("customMessage", e.target.value)}
                  className="border-gray-300 focus:border-blue-400 transition-colors min-h-[80px]"
                />
              </div>

              <Button 
                onClick={generateEmail}
                disabled={!emailData.senderName || !emailData.senderTitle || isGenerating}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating Email...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Generate AI Email
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Generated Email Preview */}
          <div className="space-y-6">
            {/* Facility Info */}
            <Card className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Building className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-800">Target Facility</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-600">Name:</span> <span className="font-medium">{submission.facilityName}</span></p>
                <p><span className="text-gray-600">Address:</span> <span className="font-medium">{submission.address}</span></p>
                <p><span className="text-gray-600">Skin Grafts:</span> <span className="font-medium">{submission.performsSkinGrafts ? 'Yes' : 'No'}</span></p>
                <p><span className="text-gray-600">Private Practice:</span> <span className="font-medium">{submission.privatePractice ? 'Yes' : 'No'}</span></p>
              </div>
            </Card>

            {/* Email Preview */}
            <Card className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-bold text-gray-800">Generated Email</h3>
                </div>
                {generatedEmail && (
                  <Button 
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                )}
              </div>

              {generatedEmail ? (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <Textarea
                    value={generatedEmail}
                    onChange={(e) => setGeneratedEmail(e.target.value)}
                    className="min-h-[400px] border-0 bg-transparent resize-none focus:ring-0 text-sm font-mono"
                  />
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 text-center">
                  <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Fill out the form and click "Generate AI Email" to create your personalized outreach message.</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIEmailDraft;
