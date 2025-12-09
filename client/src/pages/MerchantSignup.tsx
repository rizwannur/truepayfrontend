import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Upload, 
  Camera, 
  CheckCircle2, 
  Building2, 
  FileText,
  User,
  Globe,
  MapPin,
  Signal,
  Wifi,
  Battery,
  Loader2,
  Store
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function MerchantSignup() {
  const [, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Personal, 2: Company, 3: Documents

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    companyName: "",
    companyAddress: "",
    companyCountry: "",
  });

  const [files, setFiles] = useState<{
    idDocument: File | null;
    selfieWithId: File | null;
    companyDocs: File | null;
  }>({
    idDocument: null,
    selfieWithId: null,
    companyDocs: null
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof files) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [key]: e.target.files![0] }));
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API upload
    setTimeout(() => {
      setIsSubmitting(false);
      setLocation("/merchant"); // Redirect to dashboard
    }, 2000);
  };

  return (
    <div className="h-full w-full bg-obsidian-shiny text-foreground font-sans select-none overflow-hidden relative flex flex-col pb-8">
      
      {/* iOS Status Bar */}
      <div className="sticky top-0 z-[60] bg-black/80 backdrop-blur-md text-white px-6 pt-3 pb-2 flex justify-between items-center text-xs font-medium border-b border-white/5">
        <div className="w-[80px] text-center font-semibold text-[15px] tracking-tight">{currentTime}</div>
        <div className="flex items-center gap-1.5">
          <Signal className="w-4 h-4 fill-current" />
          <Wifi className="w-4 h-4" strokeWidth={2.5} />
          <div className="relative">
            <Battery className="w-[22px] h-[11px] text-white/40" />
            <div className="absolute top-[2px] left-[2px] w-[16px] h-[7px] bg-white rounded-[1px]" />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-[44px] z-50 bg-black/80 backdrop-blur-lg border-b border-white/5 px-4 py-3 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full text-muted-foreground hover:text-white"
          onClick={() => step === 1 ? setLocation("/") : setStep(step - 1)}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold tracking-tight">Merchant Account</h1>
        <div className="ml-auto text-xs font-medium text-muted-foreground bg-white/5 px-2 py-1 rounded-md">
            Step {step} of 3
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
        
        {/* Progress Bar */}
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
                className="h-full bg-primary transition-all duration-500 ease-out" 
                style={{ width: `${(step / 3) * 100}%` }}
            />
        </div>

        {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="text-center space-y-2 py-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto border border-primary/20 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                        <User className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Personal Details</h2>
                    <p className="text-sm text-muted-foreground">Tell us about yourself to get started.</p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input 
                            placeholder="John Doe" 
                            className="bg-card/30 border-white/10 text-white h-12 rounded-xl"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>ID / Passport Number</Label>
                        <Input 
                            placeholder="AB1234567" 
                            className="bg-card/30 border-white/10 text-white h-12 rounded-xl"
                            value={formData.idNumber}
                            onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                        />
                    </div>
                </div>

                <Button 
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl mt-4"
                    disabled={!formData.fullName || !formData.idNumber}
                    onClick={() => setStep(2)}
                >
                    Continue
                </Button>
            </div>
        )}

        {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="text-center space-y-2 py-4">
                    <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                        <Store className="w-8 h-8 text-purple-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Company Information</h2>
                    <p className="text-sm text-muted-foreground">Enter your business details below.</p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Company Name</Label>
                        <Input 
                            placeholder="Acme Corp" 
                            className="bg-card/30 border-white/10 text-white h-12 rounded-xl"
                            value={formData.companyName}
                            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Company Address</Label>
                        <Input 
                            placeholder="123 Business St, Tech City" 
                            className="bg-card/30 border-white/10 text-white h-12 rounded-xl"
                            value={formData.companyAddress}
                            onChange={(e) => setFormData({...formData, companyAddress: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Country of Registration</Label>
                        <Select 
                            value={formData.companyCountry} 
                            onValueChange={(val) => setFormData({...formData, companyCountry: val})}
                        >
                            <SelectTrigger className="h-12 bg-card/30 border-white/10 text-white rounded-xl">
                                <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1c1c1e] border-white/10 text-white">
                                <SelectItem value="us">United States</SelectItem>
                                <SelectItem value="uk">United Kingdom</SelectItem>
                                <SelectItem value="ca">Canada</SelectItem>
                                <SelectItem value="de">Germany</SelectItem>
                                <SelectItem value="fr">France</SelectItem>
                                <SelectItem value="sg">Singapore</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button 
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl mt-4"
                    disabled={!formData.companyName || !formData.companyAddress || !formData.companyCountry}
                    onClick={() => setStep(3)}
                >
                    Continue
                </Button>
            </div>
        )}

        {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="text-center space-y-2 py-4">
                    <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto border border-pink-500/20 shadow-[0_0_20px_rgba(236,72,153,0.15)]">
                        <FileText className="w-8 h-8 text-pink-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Verification Documents</h2>
                    <p className="text-sm text-muted-foreground">Upload required documents to verify your business.</p>
                </div>

                <div className="space-y-4">
                    {/* ID Document Upload */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Personal ID Document</Label>
                        <div 
                            className={cn(
                                "border border-dashed rounded-xl p-4 flex items-center gap-3 transition-colors cursor-pointer relative",
                                files.idDocument ? "border-green-500/50 bg-green-500/5" : "border-white/10 bg-white/5 hover:bg-white/10"
                            )}
                        >
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'idDocument')} />
                            {files.idDocument ? (
                                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <Upload className="w-5 h-5 text-white" />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-white truncate">{files.idDocument ? files.idDocument.name : "Upload Passport / ID"}</div>
                                {!files.idDocument && <div className="text-xs text-muted-foreground">PDF, JPG or PNG</div>}
                            </div>
                        </div>
                    </div>

                    {/* Selfie with ID */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Selfie with ID</Label>
                        <div 
                            className={cn(
                                "border border-dashed rounded-xl p-4 flex items-center gap-3 transition-colors cursor-pointer relative",
                                files.selfieWithId ? "border-green-500/50 bg-green-500/5" : "border-white/10 bg-white/5 hover:bg-white/10"
                            )}
                        >
                            <input type="file" accept="image/*" capture="user" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'selfieWithId')} />
                            {files.selfieWithId ? (
                                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <Camera className="w-5 h-5 text-white" />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-white truncate">{files.selfieWithId ? files.selfieWithId.name : "Take a Selfie holding ID"}</div>
                                {!files.selfieWithId && <div className="text-xs text-muted-foreground">Ensure face and ID are visible</div>}
                            </div>
                        </div>
                    </div>

                    {/* Company Docs */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Company Registration</Label>
                        <div 
                            className={cn(
                                "border border-dashed rounded-xl p-4 flex items-center gap-3 transition-colors cursor-pointer relative",
                                files.companyDocs ? "border-green-500/50 bg-green-500/5" : "border-white/10 bg-white/5 hover:bg-white/10"
                            )}
                        >
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'companyDocs')} />
                            {files.companyDocs ? (
                                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <Building2 className="w-5 h-5 text-white" />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-white truncate">{files.companyDocs ? files.companyDocs.name : "Upload Registration Docs"}</div>
                                {!files.companyDocs && <div className="text-xs text-muted-foreground">Certificate of Incorporation, etc.</div>}
                            </div>
                        </div>
                    </div>
                </div>

                <Button 
                    className="w-full h-12 bg-white text-black hover:bg-gray-100 font-bold rounded-xl mt-4"
                    disabled={!files.idDocument || !files.selfieWithId || !files.companyDocs || isSubmitting}
                    onClick={handleSubmit}
                >
                    {isSubmitting ? (
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Verifying...</>
                    ) : (
                        "Submit & Create Account"
                    )}
                </Button>
            </div>
        )}

      </main>
    </div>
  );
}