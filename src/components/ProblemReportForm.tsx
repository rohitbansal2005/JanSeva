import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, FileText, Droplets, Zap, Car, Heart, Trash2, GraduationCap, AlertTriangle, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "@/components/FileUpload";
import { getContent } from "@/utils/languages";
import { submitComplaint } from "../lib/firebaseComplaint";
import { auth } from "../firebaseConfig";

interface ProblemReportFormProps {
  language: string;
}

export const ProblemReportForm = ({ language }: ProblemReportFormProps) => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Get content with fallback
  const content = getContent(language);
  console.log("Content received:", content);
  console.log("Language:", language);
  
  // Fallback content if getContent fails
  const defaultCategories = {
    water: language === "hi" ? "पानी की समस्या" : "Water Problem",
    electricity: language === "hi" ? "बिजली" : "Electricity",
    roads: language === "hi" ? "सड़क" : "Roads",
    health: language === "hi" ? "स्वास्थ्य" : "Health",
    sanitation: language === "hi" ? "सफाई" : "Sanitation",
    education: language === "hi" ? "शिक्षा" : "Education",
    corruption: language === "hi" ? "भ्रष्टाचार" : "Corruption",
    infrastructure: language === "hi" ? "बुनियादी ढांचा" : "Infrastructure"
  };
  const defaultPriorities = {
    low: language === "hi" ? "कम" : "Low",
    medium: language === "hi" ? "मध्यम" : "Medium", 
    high: language === "hi" ? "उच्च" : "High",
    emergency: language === "hi" ? "आपातकाल" : "Emergency"
  };
  const t = {
    ...(content || {}),
    categories: { ...(content?.categories || {}), ...defaultCategories },
    priorities: { ...(content?.priorities || {}), ...defaultPriorities },
    uploadEvidence: content?.uploadEvidence || "Upload Evidence",
    supportedFormats: content?.supportedFormats || "Supported: JPG, PNG, MP4, PDF, DOC"
  };

  const categories = [
    { id: "water", label: t.categories.water, icon: Droplets, color: "bg-blue-100 text-blue-700" },
    { id: "electricity", label: t.categories.electricity, icon: Zap, color: "bg-yellow-100 text-yellow-700" },
    { id: "roads", label: t.categories.roads, icon: Car, color: "bg-gray-100 text-gray-700" },
    { id: "health", label: t.categories.health, icon: Heart, color: "bg-red-100 text-red-700" },
    { id: "sanitation", label: t.categories.sanitation, icon: Trash2, color: "bg-green-100 text-green-700" },
    { id: "education", label: t.categories.education, icon: GraduationCap, color: "bg-purple-100 text-purple-700" },
    { id: "corruption", label: t.categories.corruption, icon: AlertTriangle, color: "bg-orange-100 text-orange-700" },
    { id: "infrastructure", label: t.categories.infrastructure, icon: Building, color: "bg-indigo-100 text-indigo-700" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      const user = auth.currentUser;
      await submitComplaint({
        userId: user ? user.uid : null,
        category: selectedCategory,
        location,
        description,
        priority,
        files: uploadedFiles,
        createdAt: new Date().toISOString(),
        language
      });
      toast({
        title: language === "hi" ? "शिकायत दर्ज की गई!" : "Complaint Submitted!",
        description: language === "hi" ?
          "आपकी शिकायत सफलतापूर्वक दर्ज हो गई है।" :
          "Your complaint has been submitted successfully.",
      });
      setSelectedCategory("");
      setLocation("");
      setDescription("");
      setPriority("");
      setUploadedFiles([]);
    } catch (err) {
      toast({
        title: language === "hi" ? "त्रुटि" : "Error",
        description: language === "hi" ? "शिकायत दर्ज नहीं हो सकी।" : "Failed to submit complaint.",
        variant: "destructive"
      });
    }
    setUploading(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          toast({
            title: language === "hi" ? "स्थान मिल गया!" : "Location Found!",
            description: language === "hi" ? "आपका वर्तमान स्थान सेट किया गया है" : "Your current location has been set",
          });
        },
        (error) => {
          toast({
            title: language === "hi" ? "स्थान नहीं मिला" : "Location Not Found",
            description: language === "hi" ? "कृपया स्थान की अनुमति दें या मैन्युअल रूप से पता दर्ज करें" : "Please allow location access or enter address manually",
            variant: "destructive"
          });
        }
      );
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{t.reportProblem}</CardTitle>
        <CardDescription className="text-center text-lg">{t.problemSubtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold">{t.category}</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.id}
                    type="button"
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={`p-4 h-auto flex flex-col items-center space-y-2 ${
                      selectedCategory === category.id ? "ring-2 ring-orange-500" : ""
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <IconComponent className="w-6 h-6" />
                    <span className="text-xs text-center leading-tight">{category.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Location Input */}
          <div className="space-y-3">
            <Label htmlFor="location" className="text-lg font-semibold">{t.location}</Label>
            <div className="flex space-x-2">
              <Input
                id="location"
                placeholder={t.locationPlaceholder}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={getCurrentLocation}
                className="px-3"
              >
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label htmlFor="description" className="text-lg font-semibold">{t.description}</Label>
            <Textarea
              id="description"
              placeholder={t.descriptionPlaceholder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Priority Level */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold">{t.priority}</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder={t.priority} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <Badge variant="secondary">{t.priorities.low}</Badge>
                </SelectItem>
                <SelectItem value="medium">
                  <Badge className="bg-yellow-100 text-yellow-800">{t.priorities.medium}</Badge>
                </SelectItem>
                <SelectItem value="high">
                  <Badge className="bg-orange-100 text-orange-800">{t.priorities.high}</Badge>
                </SelectItem>
                <SelectItem value="emergency">
                  <Badge variant="destructive">{t.priorities.emergency}</Badge>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold">{t.uploadEvidence}</Label>
            <FileUpload 
              language={language} 
              onFilesChange={setUploadedFiles}
              maxFiles={5}
              uploadEvidence={t.uploadEvidence}
              supportedFormats={t.supportedFormats}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700"
            disabled={!selectedCategory || !location || !description || uploading}
          >
            {uploading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{language === "hi" ? "दर्ज हो रहा है..." : "Submitting..."}</span>
              </div>
            ) : (
              <>
                <FileText className="w-5 h-5 mr-2" />
                {t.submit}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
