
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { languages } from "@/utils/languages";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  language: string;
  onLanguageChange: (language: string) => void;
  isMobile?: boolean;
}

export const LanguageSelector = ({ language, onLanguageChange, isMobile = false }: LanguageSelectorProps) => {
  if (isMobile) {
    return (
      <Select value={language} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-full">
          <Globe className="w-4 h-4 mr-2" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(languages).map(([code, lang]) => (
            <SelectItem key={code} value={code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <div className="flex">
      <Button
        variant={language === "hi" ? "default" : "outline"}
        size="sm"
        onClick={() => onLanguageChange("hi")}
        className="text-xs px-2 rounded-r-none"
      >
        हिंदी
      </Button>
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => onLanguageChange("en")}
        className="text-xs px-2 rounded-none border-l-0"
      >
        EN
      </Button>
      <Select value={language} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-16 h-8 text-xs rounded-l-none border-l-0">
          <Globe className="w-3 h-3" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(languages).map(([code, lang]) => (
            <SelectItem key={code} value={code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
