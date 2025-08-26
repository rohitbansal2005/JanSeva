
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  User, 
  Eye, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Users, 
  TrendingUp,
  MapPin,
  MessageSquare,
  Phone,
  Mail,
  Settings,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GovEmployeePortalProps {
  language: string;
  onClose: () => void;
}

export const GovEmployeePortal = ({ language, onClose }: GovEmployeePortalProps) => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    employeeId: "",
    password: "",
    department: ""
  });
  const [activeTab, setActiveTab] = useState("dashboard");

  const content = {
    hi: {
      title: "सरकारी कर्मचारी पोर्टल",
      subtitle: "कार्यकर्ता डैशबोर्ड",
      employeeId: "कर्मचारी आईडी",
      password: "पासवर्ड",
      department: "विभाग",
      login: "लॉगिन",
      dashboard: "डैशबोर्ड",
      complaints: "शिकायतें",
      rti: "RTI आवेदन",
      reports: "रिपोर्ट्स",
      profile: "प्रोफाइल",
      logout: "लॉगआउट",
      welcome: "स्वागत",
      totalComplaints: "कुल शिकायतें",
      pendingComplaints: "लंबित शिकायतें",
      resolvedToday: "आज हल की गई",
      avgResolutionTime: "औसत समाधान समय",
      assignedToMe: "मुझे सौंपी गई",
      urgentComplaints: "तत्काल शिकायतें",
      recentActivity: "हाल की गतिविधि",
      viewDetails: "विवरण देखें",
      assignComplaint: "शिकायत सौंपें",
      updateStatus: "स्थिति अपडेट करें",
      addComment: "टिप्पणी जोड़ें",
      contactCitizen: "नागरिक से संपर्क",
      workingOn: "काम कर रहे हैं",
      completed: "पूर्ण",
      inProgress: "प्रगति में",
      pending: "लंबित",
      high: "उच्च",
      medium: "मध्यम",
      low: "निम्न"
    },
    en: {
      title: "Government Employee Portal",
      subtitle: "Officer Dashboard",
      employeeId: "Employee ID",
      password: "Password",
      department: "Department",
      login: "Login",
      dashboard: "Dashboard",
      complaints: "Complaints",
      rti: "RTI Applications",
      reports: "Reports",
      profile: "Profile",
      logout: "Logout",
      welcome: "Welcome",
      totalComplaints: "Total Complaints",
      pendingComplaints: "Pending Complaints",
      resolvedToday: "Resolved Today",
      avgResolutionTime: "Avg Resolution Time",
      assignedToMe: "Assigned to Me",
      urgentComplaints: "Urgent Complaints",
      recentActivity: "Recent Activity",
      viewDetails: "View Details",
      assignComplaint: "Assign Complaint",
      updateStatus: "Update Status",
      addComment: "Add Comment",
      contactCitizen: "Contact Citizen",
      workingOn: "Working On",
      completed: "Completed",
      inProgress: "In Progress",
      pending: "Pending",
      high: "High",
      medium: "Medium",
      low: "Low"
    }
  };

  const t = content[language];

  const departments = [
    "Municipal Corporation",
    "Water Department", 
    "Electricity Board",
    "Transport Department",
    "Health Department",
    "Education Department",
    "Police Department",
    "Revenue Department"
  ];

  const mockComplaints = [
    {
      id: "JS2024001",
      title: "Water Supply Issue",
      location: "Ward 12, Sector 15",
      priority: "high",
      status: "pending",
      submittedBy: "Rahul Sharma",
      submittedDate: "2024-01-20",
      category: "Water"
    },
    {
      id: "JS2024002", 
      title: "Street Light Not Working",
      location: "Main Road, Block A",
      priority: "medium",
      status: "inProgress",
      submittedBy: "Priya Singh",
      submittedDate: "2024-01-19",
      category: "Electricity"
    },
    {
      id: "JS2024003",
      title: "Road Pothole",
      location: "Highway 34, KM 12",
      priority: "high",
      status: "workingOn",
      submittedBy: "Amit Kumar",
      submittedDate: "2024-01-18",
      category: "Roads"
    }
  ];

  const handleLogin = () => {
    if (loginData.employeeId && loginData.password && loginData.department) {
      setIsLoggedIn(true);
      toast({
        title: language === "hi" ? "सफल लॉगिन" : "Login Successful",
        description: language === "hi" ? "कर्मचारी पोर्टल में स्वागत है" : "Welcome to Employee Portal"
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ employeeId: "", password: "", department: "" });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "workingOn": return "bg-blue-500";
      case "inProgress": return "bg-orange-500";
      case "pending": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Shield className="w-6 h-6" />
              <span>{t.title}</span>
            </CardTitle>
            <CardDescription className="text-blue-100">{t.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label>{t.employeeId}</Label>
              <Input
                value={loginData.employeeId}
                onChange={(e) => setLoginData(prev => ({ ...prev, employeeId: e.target.value }))}
                placeholder="EMP001234"
              />
            </div>

            <div className="space-y-2">
              <Label>{t.department}</Label>
              <select
                value={loginData.department}
                onChange={(e) => setLoginData(prev => ({ ...prev, department: e.target.value }))}
                className="w-full p-2 border rounded-md"
              >
                <option value="">{t.department}</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>{t.password}</Label>
              <Input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                placeholder={t.password}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleLogin} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                <Shield className="w-4 h-4 mr-2" />
                {t.login}
              </Button>
              <Button variant="outline" onClick={onClose}>
                ✕
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-white text-blue-600">
                {loginData.employeeId.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{t.welcome}, Officer {loginData.employeeId}</h2>
              <p className="text-sm text-blue-100">{loginData.department}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-white/20">
              <LogOut className="w-4 h-4 mr-2" />
              {t.logout}
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              ✕
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
            <TabsTrigger value="dashboard">{t.dashboard}</TabsTrigger>
            <TabsTrigger value="complaints">{t.complaints}</TabsTrigger>
            <TabsTrigger value="rti">{t.rti}</TabsTrigger>
            <TabsTrigger value="reports">{t.reports}</TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">{t.totalComplaints}</p>
                      <p className="text-2xl font-bold">247</p>
                    </div>
                    <FileText className="w-8 h-8 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">{t.pendingComplaints}</p>
                      <p className="text-2xl font-bold">32</p>
                    </div>
                    <Clock className="w-8 h-8 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">{t.resolvedToday}</p>
                      <p className="text-2xl font-bold">18</p>
                    </div>
                    <CheckCircle className="w-8 h-8 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">{t.avgResolutionTime}</p>
                      <p className="text-2xl font-bold">3.2d</p>
                    </div>
                    <TrendingUp className="w-8 h-8 opacity-80" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.assignedToMe}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockComplaints.slice(0, 3).map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{complaint.title}</h4>
                        <Badge className={`${getPriorityColor(complaint.priority)} text-white text-xs`}>
                          {t[complaint.priority as keyof typeof t]}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {complaint.location}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline" className={`${getStatusColor(complaint.status)} text-white`}>
                          {t[complaint.status as keyof typeof t]}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {t.viewDetails}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.urgentComplaints}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockComplaints.filter(c => c.priority === "high").map((complaint) => (
                      <div key={complaint.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-red-800">{complaint.title}</p>
                          <p className="text-sm text-red-600">{complaint.location}</p>
                        </div>
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Complaints Tab */}
          <TabsContent value="complaints" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.complaints}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockComplaints.map((complaint) => (
                  <div key={complaint.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{complaint.title}</h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {complaint.location}
                        </p>
                        <p className="text-xs text-gray-500">ID: {complaint.id}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={`${getPriorityColor(complaint.priority)} text-white`}>
                          {t[complaint.priority as keyof typeof t]}
                        </Badge>
                        <Badge variant="outline" className={`${getStatusColor(complaint.status)} text-white`}>
                          {t[complaint.status as keyof typeof t]}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-3 h-3 mr-1" />
                      <span>{complaint.submittedBy} - {complaint.submittedDate}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        {t.viewDetails}
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {t.addComment}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="w-3 h-3 mr-1" />
                        {t.contactCitizen}
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        {t.updateStatus}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* RTI Tab */}
          <TabsContent value="rti">
            <Card>
              <CardHeader>
                <CardTitle>{t.rti}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  {language === "hi" ? "RTI आवेदन यहाँ दिखाए जाएंगे" : "RTI applications will be shown here"}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>{t.reports}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  {language === "hi" ? "रिपोर्ट्स यहाँ दिखाई जाएंगी" : "Reports will be shown here"}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
