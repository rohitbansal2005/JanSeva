import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ThumbsUp, TrendingUp, Users, Clock, MapPin, ArrowUp, FileText, CheckCircle, Upload, Shield, AlertCircle } from "lucide-react";
import { getContent } from "@/utils/languages";

interface VotingSystemProps {
  language: string;
}

interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  votes: {
    support: number;
    escalate: number;
  };
  level: "ward" | "district" | "state" | "central";
  status: "voting" | "escalated" | "needs-proof" | "resolved";
  timeLeft: string;
  escalationHistory: string[];
  proof?: {
    description: string;
    fileUrl: string;
    submittedBy: string;
    submittedAt: string;
  };
  userVotes: string[]; // Array of user IDs who have voted
}

export const VotingSystem = ({ language }: VotingSystemProps) => {
  const [activeFilter, setActiveFilter] = useState("active");
  const [proofDescription, setProofDescription] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [currentUserId] = useState(() => {
    // Simulate user ID - in real app this would come from authentication
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', userId);
    }
    return userId;
  });
  
  const t = getContent(language);
  
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: "1",
      title: language === "hi" ? "मुख्य सड़क पर गड्डे" : "Potholes on Main Road",
      description: language === "hi" ? "मुख्य बाजार की सड़क पर बहुत गड्डे हैं जो दुर्घटना का कारण बन रहे हैं" : "Main market road has many potholes causing accidents",
      category: language === "hi" ? "सड़क और परिवहन" : "Roads & Transport",
      location: "Ward 12, Delhi",
      votes: { support: 234, escalate: 45 },
      level: "ward",
      status: "voting",
      timeLeft: language === "hi" ? "5 दिन बचे" : "5 days left",
      escalationHistory: [],
      userVotes: []
    },
    {
      id: "2", 
      title: language === "hi" ? "पानी की कमी" : "Water Shortage",
      description: language === "hi" ? "पिछले 3 दिनों से पानी की सप्लाई नहीं आ रही है" : "No water supply for the past 3 days",
      category: language === "hi" ? "पानी" : "Water",
      location: "Ward 8, Mumbai",
      votes: { support: 387, escalate: 123 },
      level: "district",
      status: "escalated",
      timeLeft: language === "hi" ? "जिला स्तर पर" : "At district level",
      escalationHistory: ["Ward Level - 150+ escalate votes"],
      userVotes: []
    },
    {
      id: "3",
      title: language === "hi" ? "स्ट्रीट लाइट खराब" : "Broken Street Lights",
      description: language === "hi" ? "पार्क के पास सभी स्ट्रीट लाइट खराब हैं" : "All street lights near the park are broken",
      category: language === "hi" ? "बिजली" : "Electricity",
      location: "Ward 15, Bangalore",
      votes: { support: 156, escalate: 89 },
      level: "ward",
      status: "needs-proof",
      timeLeft: language === "hi" ? "प्रमाण की प्रतीक्षा" : "Waiting for proof",
      escalationHistory: [],
      userVotes: [],
      proof: {
        description: "Street lights repaired and tested",
        fileUrl: "#",
        submittedBy: "Ward Officer Sharma",
        submittedAt: "2 hours ago"
      }
    }
  ]);

  const hasUserVoted = (issueId: string) => {
    const issue = issues.find(i => i.id === issueId);
    return issue?.userVotes.includes(currentUserId) || false;
  };

  const handleVote = (issueId: string, voteType: "support" | "escalate") => {
    if (hasUserVoted(issueId)) {
      return; // User has already voted
    }

    setIssues(prevIssues =>
      prevIssues.map(issue => {
        if (issue.id === issueId && issue.status === "voting") {
          const newIssue = { ...issue };
          
          // Add user to voted users list
          newIssue.userVotes = [...newIssue.userVotes, currentUserId];
          
          if (voteType === "support") {
            newIssue.votes.support += 1;
          } else {
            newIssue.votes.escalate += 1;
            
            // Auto-escalate logic
            if (newIssue.votes.escalate >= 100) {
              const nextLevel = getNextLevel(newIssue.level);
              if (nextLevel) {
                newIssue.level = nextLevel;
                newIssue.status = "escalated";
                newIssue.escalationHistory.push(`${issue.level} Level - ${newIssue.votes.escalate}+ escalate votes`);
                newIssue.votes = { support: 0, escalate: 0 }; // Reset votes for new level
                newIssue.userVotes = []; // Reset user votes for new level
                newIssue.timeLeft = language === "hi" ? `${getLevelName(nextLevel, language)} स्तर पर` : `At ${getLevelName(nextLevel, language)} level`;
              }
            }
          }
          
          return newIssue;
        }
        return issue;
      })
    );
  };

  const getNextLevel = (currentLevel: string) => {
    const levels = ["ward", "district", "state", "central"];
    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] as any : null;
  };

  const getLevelName = (level: string, lang: string) => {
    const names = {
      ward: lang === "hi" ? "वार्ड" : "Ward",
      district: lang === "hi" ? "जिला" : "District", 
      state: lang === "hi" ? "राज्य" : "State",
      central: lang === "hi" ? "केंद्र" : "Central"
    };
    return names[level as keyof typeof names] || level;
  };

  const getLevelColor = (level: string) => {
    const colors = {
      ward: "bg-blue-100 text-blue-700",
      district: "bg-green-100 text-green-700",
      state: "bg-orange-100 text-orange-700", 
      central: "bg-red-100 text-red-700"
    };
    return colors[level as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "voting": return "bg-blue-100 text-blue-700";
      case "escalated": return "bg-yellow-100 text-yellow-700";
      case "needs-proof": return "bg-orange-100 text-orange-700";
      case "resolved": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const submitProof = (issueId: string) => {
    if (!proofDescription.trim()) return;
    
    setIssues(prevIssues =>
      prevIssues.map(issue => {
        if (issue.id === issueId) {
          return {
            ...issue,
            status: "resolved" as const,
            proof: {
              description: proofDescription,
              fileUrl: "#",
              submittedBy: "Government Officer",
              submittedAt: "Just now"
            }
          };
        }
        return issue;
      })
    );
    
    setProofDescription("");
    setSelectedIssue(null);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader className="text-center pb-3">
          <CardTitle className="text-xl font-bold text-blue-700 flex items-center justify-center space-x-2">
            <Users className="w-5 h-5" />
            <span>{t.voting}</span>
          </CardTitle>
          <p className="text-blue-600 font-medium text-sm">
            {language === "hi" ? "मतदान के आधार पर समस्याओं को आगे बढ़ाएं" : "Escalate issues based on community votes"}
          </p>
        </CardHeader>
      </Card>

      {/* Anti-Spam Notice */}
      <Card className="border-l-4 border-l-green-500 bg-green-50">
        <CardContent className="pt-4">
          <div className="flex items-start space-x-2">
            <Shield className="w-4 h-4 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm mb-2 text-green-700">
                {language === "hi" ? "सुरक्षित मतदान प्रणाली:" : "Secure Voting System:"}
              </h3>
              <div className="text-xs space-y-1 text-green-600">
                <p>• {language === "hi" ? "एक व्यक्ति एक वोट - स्पैमिंग रोकथाम" : "One Person One Vote - Anti-Spam Protection"}</p>
                <p>• {language === "hi" ? "सत्यापित नागरिक आईडी आवश्यक" : "Verified Citizen ID Required"}</p>
                <p>• {language === "hi" ? "पारदर्शी और जवाबदेह प्रक्रिया" : "Transparent and Accountable Process"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Escalation Info */}
      <Card className="border-l-4 border-l-orange-500">
        <CardContent className="pt-4">
          <h3 className="font-bold text-sm mb-2">
            {language === "hi" ? "कैसे काम करता है:" : "How it works:"}
          </h3>
          <div className="text-xs space-y-1 text-gray-600">
            <p>• {language === "hi" ? "समर्थन वोट - समस्या को सपोर्ट करें" : "Support Vote - Support the issue"}</p>
            <p>• {language === "hi" ? "एस्केलेट वोट - अगले स्तर पर भेजें" : "Escalate Vote - Send to next level"}</p>
            <p>• {language === "hi" ? "100+ एस्केलेट वोट = अगला स्तर" : "100+ Escalate Votes = Next Level"}</p>
            <p>• {language === "hi" ? "अधिकारी को समाधान प्रमाण देना होगा" : "Officer must provide resolution proof"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Issues List */}
      <div className="space-y-3">
        {issues.map((issue) => (
          <Card key={issue.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm leading-tight">{issue.title}</h3>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{issue.description}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge className={`${getLevelColor(issue.level)} text-xs`}>
                      {getLevelName(issue.level, language)}
                    </Badge>
                    <Badge className={`${getStatusColor(issue.status)} text-xs`}>
                      {issue.status === "voting" && (language === "hi" ? "वोटिंग" : "Voting")}
                      {issue.status === "escalated" && (language === "hi" ? "आगे भेजा गया" : "Escalated")}
                      {issue.status === "needs-proof" && (language === "hi" ? "प्रमाण चाहिए" : "Needs Proof")}
                      {issue.status === "resolved" && (language === "hi" ? "हल हो गया" : "Resolved")}
                    </Badge>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{issue.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{issue.timeLeft}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">{issue.category}</Badge>
                </div>

                {/* User Vote Status */}
                {hasUserVoted(issue.id) && issue.status === "voting" && (
                  <div className="bg-blue-50 p-2 rounded text-xs flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-blue-600" />
                    <span className="text-blue-700 font-medium">
                      {language === "hi" ? "आपने इस मुद्दे पर वोट दिया है" : "You have voted on this issue"}
                    </span>
                  </div>
                )}

                {/* Escalation History */}
                {issue.escalationHistory.length > 0 && (
                  <div className="bg-yellow-50 p-2 rounded text-xs">
                    <div className="font-medium text-yellow-700 mb-1">
                      {language === "hi" ? "एस्केलेशन इतिहास:" : "Escalation History:"}
                    </div>
                    {issue.escalationHistory.map((history, index) => (
                      <div key={index} className="text-yellow-600 flex items-center space-x-1">
                        <ArrowUp className="w-3 h-3" />
                        <span>{history}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Proof Section */}
                {issue.proof && (
                  <div className="bg-green-50 p-3 rounded">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-700 text-sm">
                        {language === "hi" ? "समाधान प्रमाण:" : "Resolution Proof:"}
                      </span>
                    </div>
                    <p className="text-xs text-green-600 mb-1">{issue.proof.description}</p>
                    <p className="text-xs text-gray-500">
                      {language === "hi" ? "द्वारा:" : "By:"} {issue.proof.submittedBy} • {issue.proof.submittedAt}
                    </p>
                  </div>
                )}

                {/* Voting Section */}
                {issue.status === "voting" && (
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVote(issue.id, "support")}
                        disabled={hasUserVoted(issue.id)}
                        className={`text-xs ${hasUserVoted(issue.id) 
                          ? 'bg-gray-100 border-gray-200 text-gray-400' 
                          : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        {t.votingActions?.support || "Support"} ({issue.votes.support})
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVote(issue.id, "escalate")}
                        disabled={hasUserVoted(issue.id)}
                        className={`text-xs ${hasUserVoted(issue.id) 
                          ? 'bg-gray-100 border-gray-200 text-gray-400' 
                          : 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100'
                        }`}
                      >
                        <ArrowUp className="w-3 h-3 mr-1" />
                        {t.votingActions?.escalate || "Escalate"} ({issue.votes.escalate})
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>{language === "hi" ? "एस्केलेशन प्रगति:" : "Escalation Progress:"}</span>
                        <span className="font-medium">{issue.votes.escalate}/100</span>
                      </div>
                      <Progress value={(issue.votes.escalate / 100) * 100} className="h-1.5" />
                    </div>
                  </div>
                )}

                {/* Proof Submission for Government Officers */}
                {issue.status === "needs-proof" && (
                  <div className="bg-orange-50 p-3 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-orange-700 text-sm">
                        {t.votingActions?.proofRequired || "Proof of Resolution Required"}
                      </span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="text-xs">
                            <Upload className="w-3 h-3 mr-1" />
                            {t.votingActions?.submitProof || "Submit Proof"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm">
                          <DialogHeader>
                            <DialogTitle className="text-base">
                              {t.votingActions?.submitProof || "Submit Proof"}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="proof" className="text-sm">
                                {language === "hi" ? "समाधान का विवरण:" : "Resolution Description:"}
                              </Label>
                              <Input
                                id="proof"
                                value={proofDescription}
                                onChange={(e) => setProofDescription(e.target.value)}
                                placeholder={language === "hi" ? "समाधान का विवरण दें..." : "Describe the resolution..."}
                                className="text-sm"
                              />
                            </div>
                            <Button 
                              onClick={() => submitProof(issue.id)}
                              className="w-full text-sm"
                              disabled={!proofDescription.trim()}
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              {language === "hi" ? "प्रमाण जमा करें" : "Submit Proof"}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="pt-4">
          <h3 className="font-bold text-sm mb-3 text-center">
            {language === "hi" ? "आज की गतिविधि" : "Today's Activity"}
          </h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">23</div>
              <div className="text-xs text-gray-600">
                {language === "hi" ? "वार्ड" : "Ward"}
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">8</div>
              <div className="text-xs text-gray-600">
                {language === "hi" ? "जिला" : "District"}
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-600">3</div>
              <div className="text-xs text-gray-600">
                {language === "hi" ? "राज्य" : "State"}
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">1</div>
              <div className="text-xs text-gray-600">
                {language === "hi" ? "केंद्र" : "Central"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
