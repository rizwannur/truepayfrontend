import { 
  User, 
  ScanLine, 
  Bell, 
  ShieldCheck, 
  Eye, 
  Plus, 
  ArrowRight, 
  DollarSign, 
  Users, 
  Heart, 
  Wallet, 
  ArrowLeftRight, 
  LayoutGrid,
  Lock,
  Calendar,
  Euro,
  PoundSterling,
  Gift,
  CreditCard,
  Send,
  Component,
  Home as HomeIcon,
  ChevronRight,
  Wifi,
  Battery,
  Signal,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function Cards() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full bg-obsidian-shiny text-foreground pb-28 font-sans select-none overflow-hidden relative">
      
      {/* iOS Status Bar */}
      <div className="sticky top-0 z-[60] bg-black/80 backdrop-blur-md text-white px-6 pt-3 pb-2 flex justify-between items-center text-xs font-medium">
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
      <header className="sticky top-[44px] z-50 bg-black/80 backdrop-blur-lg border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-white">
          <User className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold tracking-tight">Your Cards</h1>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-white">
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </header>

      <div className="h-full overflow-y-auto no-scrollbar pb-32">
        <main className="px-4 pt-4 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Choose Your Weapon</h2>
            <p className="text-muted-foreground text-sm px-4">Three tiers of excellence. One powerful connection to the financial world.</p>
          </div>

          {/* Obsidian Card */}
          <div className="space-y-4">
            <div className="relative h-56 w-full rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
               {/* Matte Finish Texture */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-30 mix-blend-overlay" />
               <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
               
               <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                  <div className="font-bold text-xl tracking-wider text-white/90">TRUEPAY</div>
                  <div className="text-xs font-semibold tracking-widest text-white/50">OBSIDIAN</div>
               </div>
               
               <div className="absolute top-20 left-6 w-12 h-8 rounded bg-gradient-to-br from-yellow-200 to-yellow-600 opacity-80" />
               
               <div className="absolute bottom-6 left-6 space-y-1">
                 <div className="text-lg font-mono tracking-widest text-white/80">•••• •••• •••• 8842</div>
                 <div className="text-xs font-medium text-white/50 tracking-wider">JOHN DOE</div>
               </div>
               
               <div className="absolute bottom-6 right-6">
                 <div className="flex flex-col items-end">
                    <div className="flex -space-x-3">
                      <div className="w-8 h-8 rounded-full bg-red-500/80 mix-blend-screen" />
                      <div className="w-8 h-8 rounded-full bg-yellow-500/80 mix-blend-screen" />
                    </div>
                    <span className="text-[8px] font-bold text-white/70 mt-1">mastercard</span>
                 </div>
               </div>
            </div>
            
            <div className="px-2 space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Check className="w-4 h-4 text-primary" />
                <span>Matte Finish Design</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Check className="w-4 h-4 text-primary" />
                <span>Zero Fees</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Check className="w-4 h-4 text-primary" />
                <span>Priority Support</span>
              </div>
              <Button className="w-full mt-2 bg-white text-black hover:bg-white/90 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)]">Order Obsidian</Button>
            </div>
          </div>

          {/* Carbon Card */}
          <div className="space-y-4">
            <div className="relative h-56 w-full rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
               {/* Carbon Fiber Texture */}
               <div className="absolute inset-0 bg-[radial-gradient(black_15%,transparent_16%)_0_0,radial-gradient(black_15%,transparent_16%)_8px_8px,radial-gradient(rgba(255,255,255,.1)_15%,transparent_20%)_0_1px,radial-gradient(rgba(255,255,255,.1)_15%,transparent_20%)_8px_9px] bg-[size:16px_16px] bg-[#282828] opacity-50" />
               <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent pointer-events-none" />
               
               <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                  <div className="font-bold text-xl tracking-wider text-white/90 drop-shadow-md">TRUEPAY</div>
                  <div className="text-xs font-semibold tracking-widest text-white/50">CARBON</div>
               </div>
               
               <div className="absolute top-20 left-6 w-12 h-8 rounded bg-gradient-to-br from-gray-300 to-gray-500 opacity-80 shadow-inner" />
               
               <div className="absolute bottom-6 left-6 space-y-1">
                 <div className="text-lg font-mono tracking-widest text-white/80 drop-shadow-md">•••• •••• •••• 1234</div>
                 <div className="text-xs font-medium text-white/50 tracking-wider">JOHN DOE</div>
               </div>
               
               <div className="absolute bottom-6 right-6">
                 <div className="flex flex-col items-end">
                    <div className="flex -space-x-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/10" />
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/10" />
                    </div>
                    <span className="text-[8px] font-bold text-white/70 mt-1">mastercard</span>
                 </div>
               </div>
            </div>
            
            <div className="px-2 space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Check className="w-4 h-4 text-primary" />
                <span>Carbon Fiber Construction</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Check className="w-4 h-4 text-primary" />
                <span>Crypto Cashback</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Check className="w-4 h-4 text-primary" />
                <span>Travel Perks</span>
              </div>
              <Button className="w-full mt-2 bg-[#333] text-white hover:bg-[#444] font-semibold border border-white/10">Order Carbon</Button>
            </div>
          </div>

          {/* Neon Card */}
          <div className="space-y-4">
            <div className="relative h-56 w-full rounded-2xl bg-black border border-primary/50 shadow-[0_0_30px_rgba(129,140,248,0.3)] overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
               {/* Neon Glow Effects */}
               <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-1000" />
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10" />
               
               {/* Glowing Edges */}
               <div className="absolute inset-0 border-[3px] border-primary/30 rounded-2xl shadow-[inset_0_0_20px_rgba(129,140,248,0.5)]" />
               
               <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                  <div className="font-bold text-xl tracking-wider text-white drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]">TRUEPAY</div>
                  <div className="text-xs font-semibold tracking-widest text-primary drop-shadow-[0_0_5px_rgba(129,140,248,0.8)]">NEON</div>
               </div>
               
               <div className="absolute top-20 left-6 w-12 h-8 rounded bg-gradient-to-br from-primary to-purple-600 shadow-[0_0_15px_rgba(129,140,248,0.6)]" />
               
               <div className="absolute bottom-6 left-6 space-y-1 z-10">
                 <div className="text-lg font-mono tracking-widest text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">•••• •••• •••• 9999</div>
                 <div className="text-xs font-medium text-white/70 tracking-wider">JOHN DOE</div>
               </div>
               
               <div className="absolute bottom-6 right-6 z-10">
                 <div className="flex flex-col items-end">
                    <div className="flex -space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/80 mix-blend-screen shadow-[0_0_10px_rgba(129,140,248,0.5)]" />
                      <div className="w-8 h-8 rounded-full bg-pink-500/80 mix-blend-screen shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
                    </div>
                    <span className="text-[8px] font-bold text-white/90 mt-1 drop-shadow-md">mastercard</span>
                 </div>
               </div>
            </div>
            
            <div className="px-2 space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Check className="w-4 h-4 text-primary" />
                <span>Glow Edge Technology</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Check className="w-4 h-4 text-primary" />
                <span>NFT Access Pass</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <Check className="w-4 h-4 text-primary" />
                <span>Metaverse Ready</span>
              </div>
              <Button className="w-full mt-2 bg-gradient-to-r from-primary to-purple-600 text-white hover:opacity-90 font-semibold shadow-[0_0_20px_rgba(129,140,248,0.4)] border border-white/10">Order Neon</Button>
            </div>
          </div>

        </main>
      </div>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-[#09090b]/95 backdrop-blur-xl border-t border-white/5 pb-8 pt-2 px-6 flex justify-between items-center z-50">
        <NavItem icon={HomeIcon} label="Home" onClick={() => setLocation("/")} />
        <NavItem icon={CreditCard} label="Card" active onClick={() => setLocation("/cards")} />
        <div className="relative -top-5">
           <div className="bg-primary rounded-full p-4 shadow-lg shadow-primary/30 border-4 border-black active:scale-95 transition-transform cursor-pointer">
              <Send className="w-6 h-6 text-white ml-0.5" />
           </div>
        </div>
        <NavItem icon={LayoutGrid} label="Hub" />
        <NavItem icon={User} label="Profile" />
      </nav>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white/30 rounded-full z-[60]" />
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
      "flex flex-col items-center gap-1 w-16 transition-colors active:scale-95",
      active ? "text-primary" : "text-muted-foreground hover:text-white"
    )}>
      <Icon className={cn("w-6 h-6", active && "fill-current")} strokeWidth={active ? 2.5 : 2} />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}