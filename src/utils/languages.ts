export const languages = {
  hi: {
    name: "हिंदी",
    code: "hi"
  },
  en: {
    name: "English", 
    code: "en"
  }
};

export const getContent = (language: string) => {
  const content: Record<string, any> = {
    hi: {
      title: "जनसेवा",
      subtitle: "जनता की आवाज़",
      slogan: "आपकी समस्या, सरकार की जिम्मेदारी",
      reportProblem: "समस्या दर्ज करें",
      trackStatus: "स्थिति देखें",
      emergency: "आपातकाल",
      dashboard: "डैशबोर्ड",
      voting: "कम्युनिटी वोटिंग",
      services: "सरकारी सेवाएं",
      rti: "RTI आवेदन",
      login: "लॉगिन/रजिस्टर",
      govLogin: "सरकारी लॉगिन",
      category: "समस्या की श्रेणी",
      location: "स्थान",
      locationPlaceholder: "अपना पता दर्ज करें",
      description: "समस्या का विवरण",
      descriptionPlaceholder: "समस्या का विस्तृत वर्णन करें",
      priority: "प्राथमिकता",
      uploadEvidence: "सबूत अपलोड करें",
      supportedFormats: "समर्थित: JPG, PNG, MP4, PDF, DOC",
      submit: "शिकायत दर्ज करें",
      categories: {
        water: "पानी की समस्या",
        electricity: "बिजली",
        roads: "सड़क",
        health: "स्वास्थ्य",
        sanitation: "सफाई",
        education: "शिक्षा",
        corruption: "भ्रष्टाचार",
        infrastructure: "बुनियादी ढांचा"
      },
      priorities: {
        low: "कम",
        medium: "मध्यम",
        high: "उच्च",
        emergency: "आपातकाल"
      },
      escalation: {
        ward: "वार्ड स्तर",
        district: "जिला स्तर", 
        state: "राज्य स्तर",
        central: "केंद्र स्तर",
        escalated: "अगले स्तर पर भेजा गया",
        needsProof: "समाधान प्रमाण चाहिए",
        resolved: "हल हो गया"
      },
      votingActions: {
        support: "समर्थन",
        escalate: "आगे भेजें",
        submitProof: "प्रमाण जमा करें",
        proofRequired: "समाधान का प्रमाण आवश्यक"
      }
    },
    en: {
      title: "JanSeva",
      subtitle: "Voice of the People", 
      slogan: "Your Problem, Government's Responsibility",
      reportProblem: "Report Problem",
      trackStatus: "Track Status",
      emergency: "Emergency",
      dashboard: "Dashboard",
      voting: "Community Voting",
      services: "Government Services",
      rti: "RTI Application",
      login: "Login/Register",
      govLogin: "Government Login",
      category: "Problem Category",
      location: "Location",
      locationPlaceholder: "Enter your address",
      description: "Problem Description",
      descriptionPlaceholder: "Describe your problem",
      priority: "Priority",
      uploadEvidence: "Upload Evidence",
      supportedFormats: "Supported: JPG, PNG, MP4, PDF, DOC",
      submit: "Submit Complaint",
      categories: {
        water: "Water Problem",
        electricity: "Electricity",
        roads: "Roads",
        health: "Health",
        sanitation: "Sanitation",
        education: "Education",
        corruption: "Corruption",
        infrastructure: "Infrastructure"
      },
      priorities: {
        low: "Low",
        medium: "Medium",
        high: "High",
        emergency: "Emergency"
      },
      escalation: {
        ward: "Ward Level",
        district: "District Level",
        state: "State Level", 
        central: "Central Level",
        escalated: "Escalated to Next Level",
        needsProof: "Proof Required",
        resolved: "Resolved"
      },
      votingActions: {
        support: "Support",
        escalate: "Escalate",
        submitProof: "Submit Proof",
        proofRequired: "Proof of Resolution Required"
      }
    }
  };
  return content[language];
};
