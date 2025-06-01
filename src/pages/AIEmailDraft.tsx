
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Mail, Send, RefreshCw, User, Building, Target, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AriesNavigation from "@/components/AriesNavigation";
import AriesWatermark from "@/components/AriesWatermark";

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center relative">
        <AriesWatermark />
        <Card className="p-8 bg-white rounded-xl border border-gray-200 shadow-lg relative z-10">
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
    
    // Simulate AI email generation with enhanced personalization
    setTimeout(() => {
      const email = `Subject: Partnership Opportunity - Aries Medical Partners & ${submission.facilityName}

Dear Dr. Martinez and Team,

I hope this email finds you well and that you're enjoying the beautiful weather we've been having in your area! My name is ${emailData.senderName}, ${emailData.senderTitle} at ${emailData.companyName}. 

I was speaking with a colleague who mentioned they had worked with someone at ${submission.facilityName} and had wonderful things to say about your team's dedication to patient care. I understand you've built quite a reputation in the wound care community, and I wanted to reach out personally.

After researching your facility at ${submission.address}, I was particularly impressed by your commitment to advanced wound care ${submission.performsSkinGrafts ? 'and your sophisticated onsite skin graft capabilities' : ''}. ${submission.privatePractice ? 'As an independent practice owner' : 'As part of your healthcare network'}, I know you understand the constant balancing act between providing exceptional patient outcomes and managing operational efficiency.

I noticed from your online presence that your practice has been growing - congratulations on that success! It's clear that your investment in state-of-the-art equipment and specialized training is paying dividends for your patients.

${emailData.meetingPurpose && `I'd love to discuss ${emailData.meetingPurpose} and explore how our partnership could specifically benefit your practice without disrupting your current workflow.`}

${emailData.specificInterests && `I'm particularly interested in exploring ${emailData.specificInterests} - I think there might be some innovative approaches that could enhance what you're already doing so well.`}

I've been working with similar practices in your region, and I've seen some remarkable results when we can align our resources with forward-thinking physicians like yourself. 

${emailData.customMessage && `\n${emailData.customMessage}\n`}

I know your time is incredibly valuable, so I'd be happy to work around your schedule. Would you be available for a brief ${emailData.proposedTimeframe || '15-20 minute'} conversation ${emailData.proposedTimeframe ? `within the next ${emailData.proposedTimeframe}` : 'in the coming weeks'}? I can be flexible with timing - early morning, lunch break, or end of day - whatever works best for you.

Also, if there's a particular day of the week that works better for your schedule, just let me know. I understand how hectic things can get in a busy practice!

Looking forward to the possibility of connecting and learning more about your vision for the future of wound care at ${submission.facilityName}.

Warmest regards,

${emailData.senderName}
${emailData.senderTitle}
${emailData.companyName}
Direct: (555) 123-4567
Mobile: (555) 987-6543
${emailData.senderName.toLowerCase().replace(' ', '.')}@ariesmedical.com

P.S. I saw that your practice has been involved in some innovative treatment protocols - I'd love to hear more about your experiences with those when we connect!`;

      setGeneratedEmail(email);
      setIsGenerating(false);
      
      toast({
        title: "Personalized Email Generated!",
        description: "Your AI-crafted email with personal touches is ready for review.",
      });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendToOutlook = () => {
    const subject = encodeURIComponent(`Partnership Opportunity - Aries Medical Partners & ${submission.facilityName}`);
    const body = encodeURIComponent(generatedEmail);
    const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?subject=${subject}&body=${body}`;
    window.open(outlookUrl, '_blank');
    
    toast({
      title: "Opening Outlook",
      description: "Your email has been prepared in Outlook for sending.",
    });
  };

  const handleSendToGmail = () => {
    const subject = encodeURIComponent(`Partnership Opportunity - Aries Medical Partners & ${submission.facilityName}`);
    const body = encodeURIComponent(generatedEmail);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
    
    toast({
      title: "Opening Gmail",
      description: "Your email has been prepared in Gmail for sending.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 relative">
      <AriesWatermark />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-4">
            <AriesNavigation />
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
                    Generating Personalized Email...
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
                  <div className="flex space-x-2">
                    <Button 
                      size="sm"
                      onClick={handleSendToOutlook}
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Outlook
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleSendToGmail}
                      className="bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Gmail
                    </Button>
                  </div>
                )}
              </div>

              {generatedEmail ? (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <Textarea
                    value={generatedEmail}
                    onChange={(e) => setGeneratedEmail(e.target.value)}
                    className="min-h-[500px] border-0 bg-transparent resize-none focus:ring-0 text-sm font-mono"
                  />
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 text-center">
                  <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Fill out the form and click "Generate AI Email" to create your personalized outreach message with contextual details.</p>
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
