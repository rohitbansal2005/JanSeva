
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Siren, Heart, Shield, Flame, Ambulance, Car, Users } from "lucide-react";

interface EmergencyContactsProps {
  language: string;
}

export const EmergencyContacts = ({ language }: EmergencyContactsProps) => {
  const content = {
    hi: {
      title: "आपातकालीन सेवाएं",
      subtitle: "तुरंत सहायता के लिए संपर्क करें",
      services: {
        police: "पुलिस",
        fire: "फायर ब्रिगेड",
        ambulance: "एम्बुलेंस",
        disaster: "आपदा प्रबंधन",
        women: "महिला हेल्पलाइन",
        child: "चाइल्ड हेल्पलाइन",
        traffic: "ट्रैफिक पुलिस",
        tourist: "पर्यटक हेल्पलाइन"
      },
      callNow: "अभी कॉल करें",
      important: "महत्वपूर्ण नंबर"
    },
    en: {
      title: "Emergency Services",
      subtitle: "Contact for immediate assistance",
      services: {
        police: "Police",
        fire: "Fire Brigade",
        ambulance: "Ambulance",
        disaster: "Disaster Management",
        women: "Women Helpline",
        child: "Child Helpline",
        traffic: "Traffic Police",
        tourist: "Tourist Helpline"
      },
      callNow: "Call Now",
      important: "Important Numbers"
    }
  };

  const t = content[language];

  const emergencyServices = [
    {
      id: "police",
      name: t.services.police,
      number: "100",
      icon: Shield,
      color: "bg-blue-500 hover:bg-blue-600",
      description: language === "hi" ? "चोरी, लूट, हिंसा" : "Theft, robbery, violence"
    },
    {
      id: "fire",
      name: t.services.fire,
      number: "101",
      icon: Flame,
      color: "bg-red-500 hover:bg-red-600",
      description: language === "hi" ? "आग, गैस लीक" : "Fire, gas leak"
    },
    {
      id: "ambulance",
      name: t.services.ambulance,
      number: "108",
      icon: Ambulance,
      color: "bg-green-500 hover:bg-green-600",
      description: language === "hi" ? "मेडिकल इमरजेंसी" : "Medical emergency"
    },
    {
      id: "disaster",
      name: t.services.disaster,
      number: "1078",
      icon: Siren,
      color: "bg-orange-500 hover:bg-orange-600",
      description: language === "hi" ? "बाढ़, भूकंप" : "Flood, earthquake"
    },
    {
      id: "women",
      name: t.services.women,
      number: "1091",
      icon: Heart,
      color: "bg-pink-500 hover:bg-pink-600",
      description: language === "hi" ? "महिला सुरक्षा" : "Women safety"
    },
    {
      id: "child",
      name: t.services.child,
      number: "1098",
      icon: Users,
      color: "bg-purple-500 hover:bg-purple-600",
      description: language === "hi" ? "बच्चों की सुरक्षा" : "Child protection"
    },
    {
      id: "traffic",
      name: t.services.traffic,
      number: "1073",
      icon: Car,
      color: "bg-indigo-500 hover:bg-indigo-600",
      description: language === "hi" ? "ट्रैफिक मुद्दे" : "Traffic issues"
    },
    {
      id: "tourist",
      name: t.services.tourist,
      number: "1363",
      icon: Phone,
      color: "bg-teal-500 hover:bg-teal-600",
      description: language === "hi" ? "पर्यटक सहायता" : "Tourist assistance"
    }
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl sm:text-2xl font-bold text-red-700 flex items-center justify-center space-x-2">
            <Siren className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>{t.title}</span>
          </CardTitle>
          <p className="text-sm sm:text-base text-red-600 font-medium">{t.subtitle}</p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {emergencyServices.map((service) => {
          const IconComponent = service.icon;
          return (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${service.color} rounded-full flex items-center justify-center mx-auto`}>
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-gray-900">{service.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">{service.description}</p>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{service.number}</div>
                  </div>
                  
                  <Button
                    onClick={() => handleCall(service.number)}
                    className={`w-full ${service.color} text-white`}
                    size="lg"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {t.callNow}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Important Numbers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold">{t.important}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                <span className="font-medium text-sm sm:text-base">
                  {language === "hi" ? "रेलवे हेल्पलाइन" : "Railway Helpline"}
                </span>
                <Button variant="outline" size="sm" onClick={() => handleCall("139")} className="w-full sm:w-auto">
                  139
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                <span className="font-medium text-sm sm:text-base">
                  {language === "hi" ? "साइबर क्राइम" : "Cyber Crime"}
                </span>
                <Button variant="outline" size="sm" onClick={() => handleCall("1930")} className="w-full sm:w-auto">
                  1930
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                <span className="font-medium text-sm sm:text-base">
                  {language === "hi" ? "सड़क दुर्घटना" : "Road Accident"}
                </span>
                <Button variant="outline" size="sm" onClick={() => handleCall("1073")} className="w-full sm:w-auto">
                  1073
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                <span className="font-medium text-sm sm:text-base">
                  {language === "hi" ? "गैस इमरजेंसी" : "Gas Emergency"}
                </span>
                <Button variant="outline" size="sm" onClick={() => handleCall("1906")} className="w-full sm:w-auto">
                  1906
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                <span className="font-medium text-sm sm:text-base">
                  {language === "hi" ? "एयर एम्बुलेंस" : "Air Ambulance"}
                </span>
                <Button variant="outline" size="sm" onClick={() => handleCall("9540161344")} className="w-full sm:w-auto">
                  9540161344
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                <span className="font-medium text-sm sm:text-base">
                  {language === "hi" ? "पर्यावरण" : "Environment"}
                </span>
                <Button variant="outline" size="sm" onClick={() => handleCall("1800110400")} className="w-full sm:w-auto">
                  1800110400
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Tips */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="pt-4 sm:pt-6">
          <h3 className="font-bold text-base sm:text-lg mb-3 text-yellow-800">
            {language === "hi" ? "आपातकाल में क्या करें?" : "What to do in emergency?"}
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-yellow-700">
            <li>• {language === "hi" ? "शांत रहें और घबराएं नहीं" : "Stay calm and don't panic"}</li>
            <li>• {language === "hi" ? "सही नंबर पर तुरंत कॉल करें" : "Call the right number immediately"}</li>
            <li>• {language === "hi" ? "अपना सटीक पता बताएं" : "Provide your exact location"}</li>
            <li>• {language === "hi" ? "समस्या का स्पष्ट विवरण दें" : "Give clear description of the problem"}</li>
            <li>• {language === "hi" ? "जब तक सहायता न आ जाए तब तक फोन पर रहें" : "Stay on the line until help arrives"}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
