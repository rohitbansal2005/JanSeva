
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, CheckCircle, AlertCircle, XCircle, MapPin, Calendar, User, Phone } from "lucide-react";

interface StatusDashboardProps {
  language: string;
}

export const StatusDashboard = ({ language }: StatusDashboardProps) => {
  const [searchId, setSearchId] = useState("");

  const content = {
    hi: {
      title: "शिकायत की स्थिति देखें",
      subtitle: "अपनी शिकायत संख्या दर्ज करें या अपनी सभी शिकायतें देखें",
      searchPlaceholder: "शिकायत संख्या दर्ज करें (जैसे: JS2024001247)",
      searchButton: "खोजें",
      recentComplaints: "हाल की शिकायतें",
      status: {
        submitted: "प्राप्त",
        inProgress: "प्रगति में",
        resolved: "हल हो गई",
        closed: "बंद"
      },
      noComplaints: "कोई शिकायत नहीं मिली",
      trackYourComplaint: "अपनी शिकायत ट्रैक करें",
      contactSupport: "सहायता से संपर्क करें"
    },
    en: {
      title: "Track Complaint Status",
      subtitle: "Enter your complaint ID or view all your recent complaints",
      searchPlaceholder: "Enter complaint ID (e.g.: JS2024001247)",
      searchButton: "Search",
      recentComplaints: "Recent Complaints",
      status: {
        submitted: "Submitted",
        inProgress: "In Progress",
        resolved: "Resolved",
        closed: "Closed"
      },
      noComplaints: "No complaints found",
      trackYourComplaint: "Track Your Complaint",
      contactSupport: "Contact Support"
    }
  };

  const t = content[language];

  // Mock complaint data
  const complaints = [
    {
      id: "JS2024001247",
      category: language === "hi" ? "पानी की समस्या" : "Water Problem",
      description: language === "hi" ? "नल में पानी नहीं आ रहा पिछले 3 दिनों से" : "No water supply for the last 3 days",
      location: "Sector 15, Noida",
      status: "inProgress",
      submittedDate: "2024-01-15",
      lastUpdate: "2024-01-17",
      assignedTo: language === "hi" ? "जल विभाग" : "Water Department",
      priority: "high"
    },
    {
      id: "JS2024001248",
      category: language === "hi" ? "सड़क की समस्या" : "Road Problem",
      description: language === "hi" ? "मुख्य सड़क पर बड़ा गड्ढा" : "Large pothole on main road",
      location: "MG Road, Delhi",
      status: "resolved",
      submittedDate: "2024-01-10",
      lastUpdate: "2024-01-16",
      assignedTo: language === "hi" ? "PWD विभाग" : "PWD Department",
      priority: "medium"
    },
    {
      id: "JS2024001249",
      category: language === "hi" ? "बिजली की समस्या" : "Electricity Problem",
      description: language === "hi" ? "बार-बार पावर कट हो रहा है" : "Frequent power cuts in the area",
      location: "Green Park, Delhi",
      status: "submitted",
      submittedDate: "2024-01-18",
      lastUpdate: "2024-01-18",
      assignedTo: language === "hi" ? "बिजली बोर्ड" : "Electricity Board",
      priority: "high"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="w-4 h-4" />;
      case "inProgress":
        return <AlertCircle className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      case "closed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "inProgress":
        return "bg-orange-100 text-orange-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      case "emergency":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{t.title}</CardTitle>
          <CardDescription className="text-center text-lg">{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder={t.searchPlaceholder}
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-1"
            />
            <Button className="px-6">
              <Search className="w-4 h-4 mr-2" />
              {t.searchButton}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Complaints */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{t.recentComplaints}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs font-mono">
                      {complaint.id}
                    </Badge>
                    <Badge className={getStatusColor(complaint.status)}>
                      {getStatusIcon(complaint.status)}
                      <span className="ml-1">{t.status[complaint.status]}</span>
                    </Badge>
                    <Badge className={getPriorityColor(complaint.priority)}>
                      {complaint.priority.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{complaint.category}</h3>
                    <p className="text-gray-600 text-sm mb-2">{complaint.description}</p>
                    
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {complaint.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {complaint.submittedDate}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600">{complaint.assignedTo}</span>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      {language === "hi" ? "अंतिम अपडेट:" : "Last Update:"} {complaint.lastUpdate}
                    </div>

                    {complaint.status === "inProgress" && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">60% {language === "hi" ? "पूर्ण" : "Complete"}</p>
                      </div>
                    )}
                  </div>
                </div>

                {complaint.status === "resolved" && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      ✅ {language === "hi" ? 
                        "समस्या का समाधान हो गया है। आप संतुष्ट हैं?" : 
                        "Problem has been resolved. Are you satisfied?"
                      }
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        {language === "hi" ? "हाँ" : "Yes"}
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        {language === "hi" ? "नहीं" : "No"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support Contact */}
      <Card className="bg-gradient-to-r from-orange-50 to-green-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="font-semibold text-lg">{t.contactSupport}</h3>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>1800-123-4567</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
