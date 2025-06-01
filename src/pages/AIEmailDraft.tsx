
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, Sparkles, Send, Copy, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AIEmailDraft = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const submission = location.state?.submission;
  
  const [answers, setAnswers] = useState({
    primaryGoal: "",
    relationshipType: "",
    timeline: "",
    specificServices: "",
    contactPreference: ""
  });
  
  const [emailGenerated, setEmailGenerated] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState("");

  const questions = [
    {
      id: "primaryGoal",
      question: "What's your primary goal with this clinic?",
      placeholder: "e.g., Partnership, Service referrals, Collaboration..."
    },
    {
      id: "relationshipType", 
      question: "What type of relationship are you seeking?",
      placeholder: "e.g., Vendor partnership, Referral network, Joint venture..."
    },
    {
      id: "timeline",
      question: "What's your preferred timeline for initial contact?",
      placeholder: "e.g., This week, Within a month, Flexible..."
    },
    {
      id: "specificServices",
      question: "Which specific services or products interest them most?",
      placeholder: "e.g., Advanced wound care, Skin grafts, Hyperbaric therapy..."
    },
    {
      id: "contactPreference",
      question: "How would you prefer they respond?",
      placeholder: "e.g., Email, Phone call, In-person meeting..."
    }
  ];

  const handleInputChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const generateEmail = () => {
    const email = `Subject: Exploring Partnership Opportunities - ${submission?.facilityName}

Dear ${submission?.facilityName} Team,

I hope this message finds you well. My name is [Your Name] from Aries Medical Partners, and I'm reaching out regarding potential collaboration opportunities that could benefit both our organizations.

Based on my research, I'm impressed by your facility's commitment to ${submission?.performsSkinGrafts ? 'advanced wound care including skin graft procedures' : 'comprehensive wound care services'} and your reputation as a ${submission?.privatePractice ? 'respected private practice' : 'leading healthcare facility'} in the ${submission?.zipCode} area.

**Why I'm Reaching Out:**
${answers.primaryGoal || 'I believe there may be valuable partnership opportunities between our organizations that could enhance patient care and outcomes.'}

**What I'm Proposing:**
${answers.relationshipType || 'A collaborative relationship that leverages both our strengths in the wound care space.'}

**Timeline & Next Steps:**
I would love to connect ${answers.timeline || 'at your convenience'} to discuss how we might work together. Specifically, I'm interested in exploring ${answers.specificServices || 'comprehensive wound care solutions and advanced treatment modalities'}.

**Preferred Communication:**
${answers.contactPreference || 'I\'m flexible on communication method and happy to accommodate your preference - whether that\'s a brief phone call, email exchange, or in-person meeting.'}

I believe this partnership could bring significant value to both our patient populations and would welcome the opportunity to discuss this further.

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
[Your Name]
[Your Title]
Aries Medical Partners
[Your Contact Information]

P.S. I've attached some information about our services and recent partnership successes for your review.`;

    setGeneratedEmail(email);
    setEmailGenerated(true);
    
    toast({
      title: "🤖 AI Email Generated!",
      description: "Your personalized outreach email has been created with AI magic!"
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(generatedEmail);
    toast({
      title: "📋 Copied!",
      description: "Email copied to clipboard - ready to send!"
    });
  };

  const regenerateEmail = () => {
    generateEmail();
    toast({
      title: "🔄 Email Refreshed!",
      description: "Generated a new version with updated context!"
    });
  };

  if (!submission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 flex items-center justify-center">
        <Card className="p-8 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
          <p className="text-white text-center">No submission data found!</p>
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
            <h1 className="text-3xl font-bold text-white drop-shadow-lg flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              <span>🤖 AI Email Generator</span>
            </h1>
            <p className="text-white/90">Crafting the perfect outreach for {submission.facilityName}</p>
          </div>
        </div>

        {!emailGenerated ? (
          /* Questions Form */
          <Card className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 mb-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <Mail className="w-6 h-6 text-cyan-300" />
              <span>Tell me about your outreach goals</span>
            </h2>
            
            <div className="space-y-6">
              {questions.map((q) => (
                <div key={q.id}>
                  <label className="block text-white font-medium mb-2">
                    {q.question}
                  </label>
                  <Input
                    placeholder={q.placeholder}
                    value={answers[q.id as keyof typeof answers]}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-xl"
                  />
                </div>
              ))}
            </div>

            <Button
              onClick={generateEmail}
              className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl text-lg py-3"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate AI-Powered Email ✨
            </Button>
          </Card>
        ) : (
          /* Generated Email Display */
          <div className="space-y-6">
            <Card className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Mail className="w-6 h-6 text-green-300" />
                  <span>Your AI-Generated Email ✨</span>
                </h2>
                <div className="flex space-x-2">
                  <Button
                    onClick={regenerateEmail}
                    variant="outline"
                    className="rounded-xl border-white/50 bg-white/20 hover:bg-white/30 text-white"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button
                    onClick={copyEmail}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Email
                  </Button>
                </div>
              </div>
              
              <div className="bg-black/20 rounded-xl p-4 border border-white/20">
                <pre className="text-white/90 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {generatedEmail}
                </pre>
              </div>
            </Card>

            <div className="flex space-x-4">
              <Button
                onClick={() => setEmailGenerated(false)}
                variant="outline"
                className="rounded-xl border-white/50 bg-white/20 hover:bg-white/30 text-white"
              >
                ← Edit Responses
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl flex-1"
              >
                <Send className="w-4 h-4 mr-2" />
                Open in Email Client
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIEmailDraft;
