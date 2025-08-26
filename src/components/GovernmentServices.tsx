
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  CreditCard, 
  Home, 
  Car, 
  GraduationCap, 
  Heart, 
  Shield, 
  Briefcase,
  Users,
  Award,
  Phone,
  Building,
  ExternalLink
} from "lucide-react";

interface GovernmentServicesProps {
  language: string;
}

export const GovernmentServices = ({ language }: GovernmentServicesProps) => {
  const content = {
    hi: {
      title: "सरकारी सेवाएं",
      subtitle: "सभी सरकारी सेवाओं का डिजिटल पोर्टल",
      services: {
        ration: "राशन कार्ड",
        aadhar: "आधार सेवाएं",
        passport: "पासपोर्ट",
        driving: "ड्राइविंग लाइसेंस",
        property: "संपत्ति रजिस्ट्रेशन",
        pension: "पेंशन योजना",
        scholarship: "छात्रवृत्ति",
        health: "स्वास्थ्य योजना",
        employment: "रोजगार सेवा",
        business: "व्यापार लाइसेंस",
        birth: "जन्म प्रमाणपत्र",
        death: "मृत्यु प्रमाणपत्र"
      },
      visit: "पोर्टल पर जाएं",
      online: "ऑनलाइन",
      offline: "ऑफलाइन"
    },
    en: {
      title: "Government Services",
      subtitle: "Digital portal for all government services",
      services: {
        ration: "Ration Card",
        aadhar: "Aadhar Services",
        passport: "Passport",
        driving: "Driving License",
        property: "Property Registration",
        pension: "Pension Scheme",
        scholarship: "Scholarship",
        health: "Health Scheme",
        employment: "Employment Service",
        business: "Business License",
        birth: "Birth Certificate",
        death: "Death Certificate"
      },
      visit: "Visit Portal",
      online: "Online",
      offline: "Offline"
    }
  };

  const t = content[language];

  const services = [
    { 
      id: "ration", 
      icon: CreditCard, 
      color: "bg-blue-100 text-blue-700", 
      status: "online",
      url: "https://nfsa.gov.in/"
    },
    { 
      id: "aadhar", 
      icon: Shield, 
      color: "bg-green-100 text-green-700", 
      status: "online",
      url: "https://uidai.gov.in/"
    },
    { 
      id: "passport", 
      icon: FileText, 
      color: "bg-purple-100 text-purple-700", 
      status: "online",
      url: "https://passportindia.gov.in/"
    },
    { 
      id: "driving", 
      icon: Car, 
      color: "bg-orange-100 text-orange-700", 
      status: "online",
      url: "https://parivahan.gov.in/"
    },
    { 
      id: "property", 
      icon: Home, 
      color: "bg-red-100 text-red-700", 
      status: "offline",
      url: "https://igrs.ap.gov.in/"
    },
    { 
      id: "pension", 
      icon: Users, 
      color: "bg-yellow-100 text-yellow-700", 
      status: "online",
      url: "https://nsap.nic.in/"
    },
    { 
      id: "scholarship", 
      icon: GraduationCap, 
      color: "bg-indigo-100 text-indigo-700", 
      status: "online",
      url: "https://scholarships.gov.in/"
    },
    { 
      id: "health", 
      icon: Heart, 
      color: "bg-pink-100 text-pink-700", 
      status: "online",
      url: "https://pmjay.gov.in/"
    },
    { 
      id: "employment", 
      icon: Briefcase, 
      color: "bg-teal-100 text-teal-700", 
      status: "online",
      url: "https://www.ncs.gov.in/"
    },
    { 
      id: "business", 
      icon: Building, 
      color: "bg-gray-100 text-gray-700", 
      status: "offline",
      url: "https://udyamregistration.gov.in/"
    },
    { 
      id: "birth", 
      icon: Award, 
      color: "bg-emerald-100 text-emerald-700", 
      status: "online",
      url: "https://crsorgi.gov.in/"
    },
    { 
      id: "death", 
      icon: Phone, 
      color: "bg-slate-100 text-slate-700", 
      status: "online",
      url: "https://crsorgi.gov.in/"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{t.title}</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1.5 sm:p-2 rounded-lg ${service.color}`}>
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-xs sm:text-sm leading-tight">
                        {t.services[service.id as keyof typeof t.services]}
                      </CardTitle>
                    </div>
                  </div>
                  <Badge 
                    variant={service.status === "online" ? "default" : "secondary"}
                    className="text-xs shrink-0"
                  >
                    {service.status === "online" ? t.online : t.offline}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  size="sm" 
                  className="w-full text-xs sm:text-sm"
                  disabled={service.status === "offline"}
                  onClick={() => service.status === "online" && window.open(service.url, '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-1 sm:mr-2" />
                  {t.visit}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Access Panel */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="pt-4 sm:pt-6">
          <div className="text-center space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-blue-700">
              {language === "hi" ? "डिजिटल इंडिया पोर्टल" : "Digital India Portal"}
            </h3>
            <Button 
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700"
              onClick={() => window.open('https://digitalindia.gov.in/', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {language === "hi" ? "सभी सेवाएं देखें" : "View All Services"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
