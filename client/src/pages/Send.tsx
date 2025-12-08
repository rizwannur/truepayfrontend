import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Send() {
  const [, setLocation] = useLocation();

  return (
    <div className="h-full w-full bg-black text-foreground font-sans select-none overflow-hidden relative flex flex-col">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/5 px-4 py-3 flex items-center gap-4 pt-12">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full text-muted-foreground hover:text-white"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold tracking-tight">Send</h1>
      </header>

      <main className="flex-1 p-6 flex items-center justify-center text-muted-foreground">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1c1c1e] flex items-center justify-center mx-auto border border-white/10 shadow-[0_0_20px_rgba(129,140,248,0.2)]">
            <ArrowRight className="w-8 h-8 text-primary" />
          </div>
          <p>Send Feature Coming Soon</p>
        </div>
      </main>
    </div>
  );
}