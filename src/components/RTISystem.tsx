
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ExternalLink, Info, Clock, Users, BookOpen, Phone, Globe } from "lucide-react";

interface RTISystemProps {
  language: string;
}

export const RTISystem = ({ language }: RTISystemProps) => {
  const [activeView, setActiveView] = useState<"info" | "how-to" | "contacts">("info");

  const content = {
    hi: {
      title: "RTI जानकारी केंद्र",
      subtitle: "सूचना का अधिकार अधिनियम 2005",
      info: "जानकारी",
      howTo: "आवेदन प्रक्रिया",
      contacts: "संपर्क",
      officialWebsite: "आधिकारिक वेबसाइट",
      applyOnline: "ऑनलाइन आवेदन करें",
      whatIsRTI: "RTI क्या है?",
      rtiDescription: "सूचना का अधिकार अधिनियम 2005 के तहत, भारत के नागरिकों को सरकारी जानकारी प्राप्त करने का अधिकार है।",
      keyFeatures: "मुख्य विशेषताएं",
      features: [
        "कोई भी भारतीय नागरिक RTI आवेदन दे सकता है",
        "30 दिनों के अंदर जवाब मिलना चाहिए",
        "आवेदन शुल्क केवल ₹10",
        "जीवन और मृत्यु के मामलों में 48 घंटे में जवाब"
      ],
      howToApply: "आवेदन कैसे करें?",
      steps: [
        "आधिकारिक RTI पोर्टल पर जाएं",
        "संबंधित विभाग चुनें",
        "आवेदन फॉर्म भरें",
        "₹10 शुल्क का भुगतान करें",
        "आवेदन संख्या नोट करें"
      ],
      importantContacts: "महत्वपूर्ण संपर्क",
      centralRTI: "केंद्रीय RTI पोर्टल",
      statePortals: "राज्य RTI पोर्टल",
      helpline: "हेल्पलाइन: 1800-11-1420"
    },
    en: {
      title: "RTI Information Center",
      subtitle: "Right to Information Act 2005",
      info: "Information",
      howTo: "Application Process",
      contacts: "Contacts",
      officialWebsite: "Official Website",
      applyOnline: "Apply Online",
      whatIsRTI: "What is RTI?",
      rtiDescription: "Under the Right to Information Act 2005, Indian citizens have the right to access government information.",
      keyFeatures: "Key Features",
      features: [
        "Any Indian citizen can file RTI application",
        "Response within 30 days",
        "Application fee only ₹10",
        "Life and death matters: 48 hours response"
      ],
      howToApply: "How to Apply?",
      steps: [
        "Visit the official RTI portal",
        "Select relevant department",
        "Fill the application form",
        "Pay ₹10 fee",
        "Note down application number"
      ],
      importantContacts: "Important Contacts",
      centralRTI: "Central RTI Portal",
      statePortals: "State RTI Portals",
      helpline: "Helpline: 1800-11-1420"
    }
  };

  const t = content[language];

  const officialLinks = {
    central: "https://rtionline.gov.in/",
    delhi: "https://rtionline.delhi.gov.in/",
    maharashtra: "https://rtionline.maharashtra.gov.in/",
    karnataka: "https://rtikarnataka.gov.in/",
    tamil: "https://rtiapplication.tn.gov.in/"
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="text-center bg-gradient-to-r from-orange-500 to-green-600 text-white">
          <CardTitle className="text-xl sm:text-2xl">{t.title}</CardTitle>
          <CardDescription className="text-orange-100 text-sm sm:text-base">{t.subtitle}</CardDescription>
        </CardHeader>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-2 shadow-sm">
        <Button
          variant={activeView === "info" ? "default" : "ghost"}
          onClick={() => setActiveView("info")}
          className="flex-1 text-xs sm:text-sm"
          size="sm"
        >
          <Info className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          {t.info}
        </Button>
        <Button
          variant={activeView === "how-to" ? "default" : "ghost"}
          onClick={() => setActiveView("how-to")}
          className="flex-1 text-xs sm:text-sm"
          size="sm"
        >
          <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          {t.howTo}
        </Button>
        <Button
          variant={activeView === "contacts" ? "default" : "ghost"}
          onClick={() => setActiveView("contacts")}
          className="flex-1 text-xs sm:text-sm"
          size="sm"
        >
          <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          {t.contacts}
        </Button>
      </div>

      {/* Main Apply Button */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="pt-4 sm:pt-6">
          <div className="text-center space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-blue-700">{t.officialWebsite}</h3>
            <Button 
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700"
              onClick={() => window.open(officialLinks.central, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {t.applyOnline}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* RTI Information */}
      {activeView === "info" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">{t.whatIsRTI}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-gray-600 mb-4">{t.rtiDescription}</p>
              
              <h4 className="font-semibold mb-3 text-sm sm:text-base">{t.keyFeatures}</h4>
              <div className="space-y-2">
                {t.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* How to Apply */}
      {activeView === "how-to" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">{t.howToApply}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {t.steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 pt-1">{step}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                <span className="text-xs sm:text-sm font-medium text-yellow-800">
                  {language === "hi" ? "समय सीमा: 30 दिन | शुल्क: ₹10" : "Timeline: 30 days | Fee: ₹10"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contacts */}
      {activeView === "contacts" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">{t.importantContacts}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  variant="outline" 
                  className="justify-between h-auto p-3 sm:p-4"
                  onClick={() => window.open(officialLinks.central, '_blank')}
                >
                  <div className="text-left">
                    <div className="font-medium text-sm sm:text-base">{t.centralRTI}</div>
                    <div className="text-xs text-gray-500">rtionline.gov.in</div>
                  </div>
                  <ExternalLink className="w-4 h-4" />
                </Button>
                
                <div className="border rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium mb-3 text-sm sm:text-base">{t.statePortals}</h4>
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between text-xs sm:text-sm"
                      onClick={() => window.open(officialLinks.delhi, '_blank')}
                    >
                      <span>Delhi RTI Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between text-xs sm:text-sm"
                      onClick={() => window.open(officialLinks.maharashtra, '_blank')}
                    >
                      <span>Maharashtra RTI Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between text-xs sm:text-sm"
                      onClick={() => window.open(officialLinks.karnataka, '_blank')}
                    >
                      <span>Karnataka RTI Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <span className="font-medium text-sm sm:text-base text-green-800">{t.helpline}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
