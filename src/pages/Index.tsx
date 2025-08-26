
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Award, TrendingUp, Users, CheckCircle, User, Vote, FileText, Building2, Shield, UserCheck, Menu } from "lucide-react";
import { ProblemReportForm } from "@/components/ProblemReportForm";
import { StatusDashboard } from "@/components/StatusDashboard";
import { EmergencyContacts } from "@/components/EmergencyContacts";
import { AuthModal } from "@/components/AuthModal";
import { VotingSystem } from "@/components/VotingSystem";
import { GovernmentServices } from "@/components/GovernmentServices";
import { RTISystem } from "@/components/RTISystem";
import { GovEmployeePortal } from "@/components/GovEmployeePortal";
import { LanguageSelector } from "@/components/LanguageSelector";
import { getContent } from "@/utils/languages";

const Index = () => {
  const [activeTab, setActiveTab] = useState("report");
  const [language, setLanguage] = useState("hi");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGovPortalOpen, setIsGovPortalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = getContent(language);

  const navItems = [
    { id: "report", label: t.reportProblem, icon: MapPin },
    { id: "track", label: t.trackStatus, icon: TrendingUp },
    { id: "services", label: t.services, icon: Building2 },
    { id: "rti", label: t.rti, icon: Shield },
    { id: "voting", label: t.voting, icon: Vote },
    { id: "emergency", label: t.emergency, icon: Phone },
    { id: "dashboard", label: t.dashboard, icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      {/* Mobile-First Header */}
      <header className="bg-white shadow-sm border-b-2 border-orange-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🤚</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-xs text-orange-600 hidden sm:block">{t.subtitle}</p>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden"
              >
                <Menu className="w-4 h-4" />
              </Button>
              
              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsGovPortalOpen(true)}
                  className="flex items-center space-x-1 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                >
                  <UserCheck className="w-4 h-4" />
                  <span className="hidden lg:inline">{t.govLogin}</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center space-x-1"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden lg:inline">{t.login}</span>
                </Button>
                
                <LanguageSelector 
                  language={language} 
                  onLanguageChange={setLanguage} 
                />
              </div>
            </div>
          </div>
          
          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="mt-3 space-y-2 md:hidden bg-white border rounded-lg p-3 shadow-lg">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsGovPortalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start bg-blue-50 border-blue-200 text-blue-700"
              >
                <UserCheck className="w-4 h-4 mr-2" />
                {t.govLogin}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                <User className="w-4 h-4 mr-2" />
                {t.login}
              </Button>
              
              <div className="pt-2">
                <LanguageSelector 
                  language={language} 
                  onLanguageChange={setLanguage} 
                  isMobile={true}
                />
              </div>
            </div>
          )}
          
          {/* Slogan */}
          <div className="mt-2 text-center">
            <p className="text-sm sm:text-base text-gray-700 font-medium">{t.slogan}</p>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 md:hidden">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.slice(0, 4).map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center justify-center h-16 text-xs space-y-1"
                size="sm"
              >
                <IconComponent className="w-5 h-5" />
                <span className="leading-none">{item.label.split(' ')[0]}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Desktop Navigation Tabs */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-4">
        <div className="flex space-x-1 bg-white rounded-lg p-2 shadow-sm overflow-x-auto">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                onClick={() => setActiveTab(item.id)}
                className="flex-1 min-w-0 whitespace-nowrap"
                size="sm"
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Mobile Horizontal Scroll Navigation (for additional items) */}
      <div className="md:hidden px-4 py-2">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {navItems.slice(4).map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "outline"}
                onClick={() => setActiveTab(item.id)}
                className="flex items-center space-x-2 whitespace-nowrap flex-shrink-0"
                size="sm"
              >
                <IconComponent className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20 md:pb-8">
        {activeTab === "report" && <ProblemReportForm language={language} />}
        {activeTab === "track" && <StatusDashboard language={language} />}
        {activeTab === "services" && <GovernmentServices language={language} />}
        {activeTab === "rti" && <RTISystem language={language} />}
        {activeTab === "voting" && <VotingSystem language={language} />}
        {activeTab === "emergency" && <EmergencyContacts language={language} />}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">
                    {language === "hi" ? "कुल शिकायतें" : "Total Complaints"}
                  </div>
                  <Users className="h-4 w-4" />
                </div>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-blue-100">+12% from last month</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">
                    {language === "hi" ? "हल हो गईं" : "Resolved"}
                  </div>
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div className="text-2xl font-bold">892</div>
                <p className="text-xs text-green-100">71.5% resolution rate</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">
                    {language === "hi" ? "लंबित" : "Pending"}
                  </div>
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-2xl font-bold">355</div>
                <p className="text-xs text-orange-100">Average 3.2 days to resolve</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">
                    {language === "hi" ? "सक्रिय उपयोगकर्ता" : "Active Users"}
                  </div>
                  <Users className="h-4 w-4" />
                </div>
                <div className="text-2xl font-bold">4,832</div>
                <p className="text-xs text-purple-100">+24% this month</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        language={language}
      />

      {/* Government Employee Portal */}
      {isGovPortalOpen && (
        <GovEmployeePortal
          language={language}
          onClose={() => setIsGovPortalOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
