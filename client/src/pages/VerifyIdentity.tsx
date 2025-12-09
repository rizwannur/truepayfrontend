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
  ShieldCheck, 
  FileText,
  User,
  Signal,
  Wifi,
  Battery,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function VerifyIdentity() {
  const [, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [idType, setIdType] = useState("");
  const [idFile, setIdFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setFile: (f: File | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API upload
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="h-full w-full bg-obsidian-shiny text-foreground font-sans select-none overflow-hidden relative flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Verification Submitted</h2>
        <p className="text-muted-foreground text-center max-w-xs mb-8">
          Your documents have been securely received. Our team will review them within 24 hours.
        </p>
        <Button 
          className="w-full h-12 bg-white text-black hover:bg-gray-100 font-bold rounded-xl"
          onClick={() => setLocation("/")}
        >
          Back to Home
        </Button>
      </div>
    );
  }

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
        <h1 className="text-lg font-bold tracking-tight">Verify Identity</h1>
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
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                        <FileText className="w-8 h-8 text-blue-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Document Type</h2>
                    <p className="text-sm text-muted-foreground">Select the government-issued ID you'll use for verification.</p>
                </div>

                <div className="space-y-3">
                    <Label className="text-white">Select ID Type</Label>
                    <Select value={idType} onValueChange={setIdType}>
                        <SelectTrigger className="h-12 bg-card/30 border-white/10 text-white rounded-xl">
                            <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1c1c1e] border-white/10 text-white">
                            <SelectItem value="passport">Passport</SelectItem>
                            <SelectItem value="drivers_license">Driver's License</SelectItem>
                            <SelectItem value="national_id">National ID Card</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <p className="text-xs text-yellow-200/80">
                        Ensure your document is valid and not expired. We cannot accept temporary IDs.
                    </p>
                </div>

                <Button 
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl mt-4"
                    disabled={!idType}
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
                        <Upload className="w-8 h-8 text-purple-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Upload Document</h2>
                    <p className="text-sm text-muted-foreground">Take a clear photo of your {idType.replace('_', ' ')}.</p>
                </div>

                <div className="space-y-4">
                    <div 
                        className={cn(
                            "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer relative",
                            idFile ? "border-green-500/50 bg-green-500/5" : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                        )}
                    >
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => handleFileUpload(e, setIdFile)}
                        />
                        {idFile ? (
                            <>
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                                <div className="text-sm font-medium text-white">{idFile.name}</div>
                                <div className="text-xs text-green-400">Upload Successful</div>
                            </>
                        ) : (
                            <>
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                    <Camera className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-sm font-medium text-white">Tap to Upload Front</div>
                                <div className="text-xs text-muted-foreground text-center">JPG, PNG or PDF<br/>Max 5MB</div>
                            </>
                        )}
                    </div>
                </div>

                <Button 
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl mt-4"
                    disabled={!idFile}
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
                        <User className="w-8 h-8 text-pink-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Selfie Check</h2>
                    <p className="text-sm text-muted-foreground">Take a selfie holding your ID to verify it's really you.</p>
                </div>

                <div className="space-y-4">
                    <div 
                        className={cn(
                            "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer relative",
                            selfieFile ? "border-green-500/50 bg-green-500/5" : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                        )}
                    >
                        <input 
                            type="file" 
                            accept="image/*" 
                            capture="user"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => handleFileUpload(e, setSelfieFile)}
                        />
                        {selfieFile ? (
                            <>
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                                <div className="text-sm font-medium text-white">{selfieFile.name}</div>
                                <div className="text-xs text-green-400">Upload Successful</div>
                            </>
                        ) : (
                            <>
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                    <Camera className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-sm font-medium text-white">Take Selfie with ID</div>
                                <div className="text-xs text-muted-foreground text-center">Make sure your face and ID<br/>are clearly visible</div>
                            </>
                        )}
                    </div>
                </div>

                <div className="bg-card/30 rounded-xl p-4 space-y-3 border border-white/5">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span className="text-xs text-muted-foreground">ID details match document uploaded</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span className="text-xs text-muted-foreground">Face is clearly visible without glasses</span>
                    </div>
                </div>

                <Button 
                    className="w-full h-12 bg-white text-black hover:bg-gray-100 font-bold rounded-xl mt-4"
                    disabled={!selfieFile || isSubmitting}
                    onClick={handleSubmit}
                >
                    {isSubmitting ? (
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Verifying...</>
                    ) : (
                        "Submit Verification"
                    )}
                </Button>
            </div>
        )}

      </main>
    </div>
  );
}