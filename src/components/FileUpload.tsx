import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera, FileText, X, Image, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { uploadToCloudinary } from "../lib/uploadToCloudinary";

interface FileUploadProps {
  language: string;
  onFilesChange: (files: string[]) => void;
  maxFiles?: number;
  uploadEvidence?: string;
  supportedFormats?: string;
}

export const FileUpload = ({ language, onFilesChange, maxFiles = 5, uploadEvidence, supportedFormats }: FileUploadProps) => {
  const { toast } = useToast();
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const content = {
    hi: {
      uploadEvidence: "सबूत अपलोड करें",
      chooseFiles: "फाइल चुनें",
      takePhoto: "फोटो लें",
      maxFiles: `अधिकतम ${maxFiles} फाइलें`,
      supportedFormats: "समर्थित: JPG, PNG, MP4, PDF, DOC",
      removeFile: "फाइल हटाएं"
    },
    en: {
      uploadEvidence: "Upload Evidence",
      chooseFiles: "Choose Files",
      takePhoto: "Take Photo",
      maxFiles: `Maximum ${maxFiles} files`,
      supportedFormats: "Supported: JPG, PNG, MP4, PDF, DOC",
      removeFile: "Remove File"
    }
  };

  const t = content[language] || content.en;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (uploadedUrls.length + files.length > maxFiles) {
      toast({
        title: language === "hi" ? "फाइल सीमा" : "File Limit",
        description: language === "hi" ? `केवल ${maxFiles} फाइलें अपलोड कर सकते हैं` : `Can only upload ${maxFiles} files`,
        variant: "destructive"
      });
      return;
    }
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of files) {
        const url = await uploadToCloudinary(file);
        urls.push(url);
      }
      const newUrls = [...uploadedUrls, ...urls];
      setUploadedUrls(newUrls);
      onFilesChange(newUrls);
      toast({
        title: language === "hi" ? "अपलोड सफल" : "Upload Successful",
        description: language === "hi" ? "फाइलें Cloudinary पर अपलोड हो गईं।" : "Files uploaded to Cloudinary.",
      });
    } catch (err) {
      toast({
        title: language === "hi" ? "त्रुटि" : "Error",
        description: language === "hi" ? "फाइल अपलोड नहीं हो सकी।" : "File upload failed.",
        variant: "destructive"
      });
    }
    setUploading(false);
  };

  const removeFile = (index: number) => {
    const newUrls = uploadedUrls.filter((_, i) => i !== index);
    setUploadedUrls(newUrls);
    onFilesChange(newUrls);
  };

  const getFileIcon = (url: string) => {
    if (url.match(/\.(jpg|jpeg|png)$/i)) return <Image className="w-4 h-4" />;
    if (url.match(/\.(mp4)$/i)) return <Video className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="space-y-3">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600 mb-2">{uploadEvidence || t.uploadEvidence}</p>
        <p className="text-xs text-gray-500 mb-4">{supportedFormats || t.supportedFormats}</p>
        <div className="flex justify-center space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="w-4 h-4 mr-2" />
            {t.chooseFiles}
          </Button>
        </div>
        <p className="text-xs text-gray-400 mt-2">{t.maxFiles}</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,.doc,.docx"
        onChange={handleFileSelect}
        className="hidden"
      />

      {uploadedUrls.length > 0 && (
        <div className="space-y-2">
          {uploadedUrls.map((url, index) => (
            <Card key={index} className="p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getFileIcon(url)}
                <span className="text-sm truncate">{url.split("/").pop()}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}
      {uploading && (
        <div className="text-center text-sm text-blue-600">{language === "hi" ? "अपलोड हो रहा है..." : "Uploading..."}</div>
      )}
    </div>
  );
};
