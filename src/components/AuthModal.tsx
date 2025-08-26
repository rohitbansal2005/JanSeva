import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Shield, Star, Trophy, X } from "lucide-react";
import { auth } from "../firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber, signOut } from "firebase/auth";
import { saveUserProfile } from "../lib/firebaseUser";

declare global {
  interface Window {
    recaptchaVerifier?: any;
    confirmationResult?: any;
  }
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

export const AuthModal = ({ isOpen, onClose, language }: AuthModalProps) => {
  const [authMode, setAuthMode] = useState<"login" | "register" | "profile">("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    aadhaar: "",
    address: "",
    ward: "",
    city: ""
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const content = {
    hi: {
      login: "लॉगिन करें",
      register: "रजिस्टर करें",
      profile: "प्रोफाइल",
      email: "ईमेल",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड कन्फर्म करें",
      name: "पूरा नाम",
      phone: "मोबाइल नंबर",
      aadhaar: "आधार नंबर (वैकल्पिक)",
      address: "पता",
      ward: "वार्ड नंबर",
      city: "शहर",
      loginBtn: "लॉगिन",
      registerBtn: "रजिस्टर",
      updateBtn: "अपडेट करें",
      logoutBtn: "लॉगआउट",
      switchToRegister: "नया खाता बनाएं",
      switchToLogin: "पहले से खाता है? लॉगिन करें",
      viewProfile: "प्रोफाइल देखें",
      userStats: "उपयोगकर्ता स्टेट्स",
      totalComplaints: "कुल शिकायतें",
      resolvedIssues: "हल मुद्दे",
      reputationScore: "प्रतिष्ठा स्कोर",
      memberSince: "सदस्य बनने की तारीख",
      verified: "वेरिफाइड",
      activeUser: "सक्रिय उपयोगकर्ता"
    },
    en: {
      login: "Login",
      register: "Register",
      profile: "Profile",
      email: "Email",
      password: "Password", 
      confirmPassword: "Confirm Password",
      name: "Full Name",
      phone: "Mobile Number",
      aadhaar: "Aadhaar Number (Optional)",
      address: "Address",
      ward: "Ward Number",
      city: "City",
      loginBtn: "Login",
      registerBtn: "Register",
      updateBtn: "Update",
      logoutBtn: "Logout",
      switchToRegister: "Create new account",
      switchToLogin: "Already have account? Login",
      viewProfile: "View Profile",
      userStats: "User Statistics",
      totalComplaints: "Total Complaints",
      resolvedIssues: "Resolved Issues",
      reputationScore: "Reputation Score",
      memberSince: "Member Since",
      verified: "Verified",
      activeUser: "Active User"
    }
  };

  const t = content[language];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAuth = () => {
    if (authMode === "login") {
      setIsLoggedIn(true);
      setAuthMode("profile");
    } else if (authMode === "register") {
      setIsLoggedIn(true);
      setAuthMode("profile");
    }
  };

  const sendOTP = async () => {
    setLoading(true);
    try {
      console.log("auth value:", auth);
      console.log("auth type:", typeof auth);
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', { size: 'invisible' }, auth);
      }
      const result = await signInWithPhoneNumber(auth, formData.phone, window.recaptchaVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
    } catch (err) {
      alert("Failed to send OTP. Use a test number added in Firebase Console.");
    }
    setLoading(false);
  };

  const verifyOTP = async () => {
    setLoading(true);
    try {
      const res = await confirmationResult.confirm(otp);
      // Save user profile to Firestore
      await saveUserProfile(res.user.uid, {
        ...formData,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
        uid: res.user.uid
      });
      setIsLoggedIn(true);
      setAuthMode("profile");
    } catch (err) {
      alert("Invalid OTP or error verifying. Use the test OTP set in Firebase Console.");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    setAuthMode("login");
    setFormData({
      name: "",
      phone: "",
      aadhaar: "",
      address: "",
      ward: "",
      city: ""
    });
    setOtpSent(false);
    setOtp("");
    setConfirmationResult(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          
          <CardTitle className="text-center">
            {authMode === "profile" ? t.profile : authMode === "login" ? t.login : t.register}
          </CardTitle>
          
          {authMode !== "profile" && (
            <CardDescription className="text-center">
              {language === "hi" ? "अपनी शिकायतों को ट्रैक करने के लिए लॉगिन करें" : "Login to track your complaints"}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {authMode === "profile" && isLoggedIn ? (
            // Profile View
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-green-600 text-white text-xl">
                    {formData.name.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{formData.name || "User Name"}</h3>
                  <div className="flex justify-center gap-2 mt-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <Shield className="w-3 h-3 mr-1" />
                      {t.verified}
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      <Star className="w-3 h-3 mr-1" />
                      {t.activeUser}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* User Stats */}
              <div className="bg-gradient-to-r from-orange-50 to-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 text-center">{t.userStats}</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-blue-600">23</div>
                    <div className="text-muted-foreground">{t.totalComplaints}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-600">18</div>
                    <div className="text-muted-foreground">{t.resolvedIssues}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-600">4.8</div>
                    <div className="text-muted-foreground">{t.reputationScore}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-orange-600">2024</div>
                    <div className="text-muted-foreground">{t.memberSince}</div>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{formData.address || "Ward 12, Delhi"}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setAuthMode("register")}
                >
                  {t.updateBtn}
                </Button>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  {t.logoutBtn}
                </Button>
              </div>
            </div>
          ) : (
            // Login/Register Form
            <div className="space-y-4">
              {authMode === "register" && !otpSent && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.name}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder={t.name}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.phone}</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+91 1234567890"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="aadhaar">{t.aadhaar}</Label>
                    <Input
                      id="aadhaar"
                      value={formData.aadhaar}
                      onChange={(e) => handleInputChange("aadhaar", e.target.value)}
                      placeholder="XXXX XXXX XXXX"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">{t.address}</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder={t.address}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="ward">{t.ward}</Label>
                      <Input
                        id="ward"
                        value={formData.ward}
                        onChange={(e) => handleInputChange("ward", e.target.value)}
                        placeholder="12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">{t.city}</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder={t.city}
                      />
                    </div>
                  </div>
                  <Button onClick={sendOTP} className="w-full" disabled={loading}>
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </Button>
                  <div id="recaptcha-container"></div>
                </>
              )}
              {authMode === "register" && otpSent && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP received"
                    />
                  </div>
                  <Button onClick={verifyOTP} className="w-full" disabled={loading}>
                    {loading ? "Verifying..." : "Verify OTP & Register"}
                  </Button>
                </>
              )}
              {authMode === "login" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.phone}</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+91 1234567890"
                    />
                  </div>
                  <Button onClick={sendOTP} className="w-full" disabled={loading}>
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </Button>
                  {otpSent && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input
                          id="otp"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP received"
                        />
                      </div>
                      <Button onClick={verifyOTP} className="w-full" disabled={loading}>
                        {loading ? "Verifying..." : "Verify OTP & Login"}
                      </Button>
                    </>
                  )}
                  <div id="recaptcha-container"></div>
                </>
              )}
              <Button onClick={handleAuth} className="w-full">
                {authMode === "login" ? t.loginBtn : t.registerBtn}
              </Button>
              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => {
                    setAuthMode(authMode === "login" ? "register" : "login");
                    setOtpSent(false);
                    setOtp("");
                  }}
                  className="text-sm"
                >
                  {authMode === "login" ? t.switchToRegister : t.switchToLogin}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
