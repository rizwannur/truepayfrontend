import { 
  User, 
  ScanLine, 
  Bell, 
  ShieldCheck, 
  Eye, 
  Plus, 
  ArrowRight, 
  DollarSign, 
  Store, // Changed from Users
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
  Bitcoin,
  Component,
  Home as HomeIcon,
  ChevronRight,
  Wifi,
  Battery,
  Signal,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  const [titleSuffix, setTitleSuffix] = useState("Pay");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const words = ["Pay", "Bank", "Life"];
    let i = 0;
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        i = (i + 1) % words.length;
        setTitleSuffix(words[i]);
        setIsAnimating(false);
      }, 200); // Wait for fade out to complete
    }, 2000);
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
      <header className="sticky top-[44px] z-50 bg-black/80 backdrop-blur-lg border-b border-white/5 px-4 py-3 flex items-center justify-between transition-all duration-300">
        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-white">
          <User className="w-6 h-6" />
        </Button>
        <div 
          className="flex flex-col items-center text-center cursor-pointer group"
          onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
        >
          <div className="flex items-center justify-center">
            <h1 className="text-xl font-bold tracking-tight text-white drop-shadow-md text-right">
              True
            </h1>
            <div className="w-[45px] text-left">
              <span 
                className={cn(
                  "text-xl font-bold tracking-tight text-white drop-shadow-md inline-block ml-1 transition-all duration-200",
                  isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                )}
              >
                {titleSuffix}
              </span>
            </div>
          </div>
          <div className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isHeaderExpanded ? "max-h-[100px] opacity-100 mt-1" : "max-h-0 opacity-0 mt-0"
          )}>
            <p className="text-xs text-primary font-semibold tracking-wide leading-tight max-w-[240px] drop-shadow-[0_0_10px_rgba(129,140,248,0.6)]">
              The card that never declines
            </p>
            <p className="text-xs text-primary font-semibold tracking-wide leading-tight max-w-[240px] drop-shadow-[0_0_10px_rgba(129,140,248,0.6)]">
              The bank that never freezes
            </p>
          </div>
          <div className={cn(
            "h-1 w-8 bg-white/10 rounded-full mt-1 transition-all duration-300 group-hover:bg-white/20",
            isHeaderExpanded ? "opacity-0 h-0" : "opacity-100"
          )} />
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-white">
            <ScanLine className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-white">
            <Bell className="w-6 h-6" />
          </Button>
        </div>
      </header>

      <div className="h-full overflow-y-auto no-scrollbar">
        <main className="px-4 pt-4 space-y-6">
          
          {/* Verify Identity Card */}
          <Card className="bg-gradient-to-br from-[#1c1c1e] to-[#09090b] border border-white/5 p-4 flex items-center justify-between rounded-2xl shadow-[0_0_20px_-5px_rgba(129,140,248,0.15),4px_4px_10px_rgba(0,0,0,0.5),-1px_-1px_2px_rgba(255,255,255,0.05)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-[#2c2c2e] flex items-center justify-center text-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.3)] border border-white/5">
                <ShieldCheck className="w-5 h-5 drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]" />
              </div>
              <div>
                <div className="font-semibold text-sm drop-shadow-sm">Verify your identity</div>
                <div className="text-xs text-red-400 font-medium drop-shadow-[0_0_5px_rgba(248,113,113,0.3)]">Unverified</div>
              </div>
            </div>
            <Button 
                variant="outline" 
                className="h-8 px-4 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary rounded-lg text-xs font-semibold relative z-10 shadow-[0_0_15px_rgba(129,140,248,0.3)]"
                onClick={() => setLocation("/verify-identity")}
            >
              Verify
            </Button>
          </Card>

          {/* Balance Section */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>Est. Total Value (USD)</span>
              <Eye className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
            </div>
            <div className="text-4xl font-bold tracking-tight">5.00</div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-4 gap-y-6 gap-x-2">
            <QuickAction icon={Plus} label="Deposit" variant="primary" onClick={() => setLocation("/deposit")} />
            <QuickAction icon={ArrowRight} label="Send" onClick={() => setLocation("/send")} />
            <QuickAction icon={Bitcoin} label="Crypto" badge="Hot" onClick={() => setLocation("/crypto")} />
            <QuickAction icon={Store} label="Merchant" onClick={() => setLocation("/merchant")} />
            
            <QuickAction icon={Heart} label="Referral" onClick={() => setLocation("/referral")} />
            <QuickAction icon={CreditCard} label="Cards" badge="New" onClick={() => setLocation("/cards")} />
            <QuickAction icon={ArrowLeftRight} label="Swap" onClick={() => setLocation("/swap")} />
            <QuickAction icon={LayoutGrid} label="More" onClick={() => setLocation("/more")} />
          </div>

          {/* Your Cards Section */}
          <div className="space-y-4">
             <div className="flex items-center justify-between px-1">
               <h2 className="text-lg font-bold tracking-tight text-white drop-shadow-md">Your Cards</h2>
               <Button variant="ghost" size="sm" className="h-6 text-xs text-primary hover:text-primary/80">View All</Button>
             </div>
             
             <div className="flex gap-4 overflow-x-auto pb-6 px-2 -mx-2 no-scrollbar snap-x snap-mandatory">
                {/* Obsidian Card Preview */}
                <div 
                  className="snap-center shrink-0 w-[280px] h-[170px] relative rounded-xl bg-[#0a0a0a] border border-white/10 shadow-[0_0_20px_rgba(129,140,248,0.25)] overflow-hidden group hover:scale-105 transition-transform duration-500 cursor-pointer hover:shadow-[0_0_30px_rgba(129,140,248,0.4)] hover:border-primary/30"
                  onClick={() => setLocation("/card-manage")}
                >
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-30 mix-blend-overlay" />
                   <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                   <div className="absolute top-4 left-5 right-5 flex justify-between items-start">
                      <div className="font-bold text-lg tracking-wider text-white/90">TRUEPAY</div>
                      <div className="text-[10px] font-semibold tracking-widest text-white/50">OBSIDIAN</div>
                   </div>
                   <div className="absolute top-14 left-5 w-9 h-6 rounded bg-gradient-to-br from-yellow-200 to-yellow-600 opacity-80" />
                   <div className="absolute bottom-4 left-5 space-y-0.5">
                     <div className="text-sm font-mono tracking-widest text-white/80">•••• 8842</div>
                     <div className="text-[10px] font-medium text-white/50 tracking-wider">JOHN DOE</div>
                   </div>
                   <div className="absolute bottom-4 right-5">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-red-500/80 mix-blend-screen" />
                        <div className="w-6 h-6 rounded-full bg-yellow-500/80 mix-blend-screen" />
                      </div>
                   </div>
                </div>

                {/* Carbon Card Preview */}
                <div className="snap-center shrink-0 w-[280px] h-[170px] relative rounded-xl bg-[#1a1a1a] border border-white/10 shadow-[0_0_20px_rgba(129,140,248,0.25)] overflow-hidden group hover:scale-105 transition-transform duration-500 cursor-pointer hover:shadow-[0_0_30px_rgba(129,140,248,0.4)] hover:border-primary/30">
                   <div className="absolute inset-0 bg-[radial-gradient(black_15%,transparent_16%)_0_0,radial-gradient(black_15%,transparent_16%)_8px_8px,radial-gradient(rgba(255,255,255,.1)_15%,transparent_20%)_0_1px,radial-gradient(rgba(255,255,255,.1)_15%,transparent_20%)_8px_9px] bg-[size:16px_16px] bg-[#282828] opacity-50" />
                   <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent pointer-events-none" />
                   <div className="absolute top-4 left-5 right-5 flex justify-between items-start">
                      <div className="font-bold text-lg tracking-wider text-white/90">TRUEPAY</div>
                      <div className="text-[10px] font-semibold tracking-widest text-white/50">CARBON</div>
                   </div>
                   <div className="absolute top-14 left-5 w-9 h-6 rounded bg-gradient-to-br from-gray-300 to-gray-500 opacity-80 shadow-inner" />
                   <div className="absolute bottom-4 left-5 space-y-0.5">
                     <div className="text-sm font-mono tracking-widest text-white/80">•••• 1234</div>
                     <div className="text-[10px] font-medium text-white/50 tracking-wider">JOHN DOE</div>
                   </div>
                   <div className="absolute bottom-4 right-5">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/10" />
                        <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/10" />
                      </div>
                   </div>
                </div>

                {/* Neon Card Preview */}
                <div className="snap-center shrink-0 w-[280px] h-[170px] relative rounded-xl bg-black border border-primary/50 shadow-[0_0_25px_rgba(129,140,248,0.4)] overflow-hidden group hover:scale-105 transition-transform duration-500 cursor-pointer hover:shadow-[0_0_35px_rgba(129,140,248,0.6)]">
                   <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-1000" />
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10" />
                   <div className="absolute inset-0 border-[2px] border-primary/30 rounded-xl shadow-[inset_0_0_15px_rgba(129,140,248,0.4)]" />
                   <div className="absolute top-4 left-5 right-5 flex justify-between items-start z-10">
                      <div className="font-bold text-lg tracking-wider text-white drop-shadow-[0_0_8px_rgba(129,140,248,0.8)]">TRUEPAY</div>
                      <div className="text-[10px] font-semibold tracking-widest text-primary drop-shadow-[0_0_5px_rgba(129,140,248,0.8)]">NEON</div>
                   </div>
                   <div className="absolute top-14 left-5 w-9 h-6 rounded bg-gradient-to-br from-primary to-purple-600 shadow-[0_0_10px_rgba(129,140,248,0.6)]" />
                   <div className="absolute bottom-4 left-5 space-y-0.5 z-10">
                     <div className="text-sm font-mono tracking-widest text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">•••• 9999</div>
                     <div className="text-[10px] font-medium text-white/70 tracking-wider">JOHN DOE</div>
                   </div>
                   <div className="absolute bottom-4 right-5 z-10">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-primary/80 mix-blend-screen shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                        <div className="w-6 h-6 rounded-full bg-pink-500/80 mix-blend-screen shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Banners */}
          <div className="space-y-3">
            <Banner 
              icon={Lock} 
              label="Deposit Crypto to Unlock Liquidity" 
              action="$"
              onClick={() => setLocation("/deposit-crypto")}
            />
          </div>

          {/* Fiat Accounts */}
          <div className="grid grid-cols-2 gap-3">
            <FiatCard symbol="€" currency="EUR" onClick={() => setLocation("/create-account/EUR")} />
            <FiatCard symbol="£" currency="GBP" onClick={() => setLocation("/create-account/GBP")} />
          </div>

          {/* Transactions Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Transactions</h2>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <TransactionItem 
                icon={Gift}
                title="Reward"
                date="2023-10-05 10:23:45"
                amount="+5.00 USD"
                status="Completed"
              />
              <TransactionItem 
                icon={Send}
                title="Sent to Alex"
                date="2023-10-04 14:30:00"
                amount="-20.00 USD"
                status="Completed"
              />
               <TransactionItem 
                icon={CreditCard}
                title="Top up"
                date="2023-10-03 09:15:00"
                amount="+100.00 USD"
                status="Completed"
              />
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-[#09090b]/95 backdrop-blur-xl border-t border-white/5 pb-8 pt-2 px-6 flex justify-between items-center z-50">
        <NavItem icon={HomeIcon} label="Home" active onClick={() => setLocation("/")} />
        <NavItem icon={CreditCard} label="Card" onClick={() => setLocation("/cards")} />
        <div className="relative -top-5">
           <div 
             className="bg-primary rounded-full p-4 shadow-lg shadow-primary/30 border-4 border-black active:scale-95 transition-transform cursor-pointer"
             onClick={() => setLocation("/send")}
           >
              <Send className="w-6 h-6 text-white ml-0.5" />
           </div>
        </div>
        <NavItem icon={MessageCircle} label="Chat" onClick={() => setLocation("/chat")} />
        <NavItem icon={User} label="Profile" onClick={() => setLocation("/profile")} />
      </nav>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white/30 rounded-full z-[60]" />
    </div>
  );
}

function QuickAction({ 
  icon: Icon, 
  label, 
  variant = "default", 
  badge,
  onClick
}: { 
  icon: any, 
  label: string, 
  variant?: "default" | "primary",
  badge?: string,
  onClick?: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer active:opacity-70 transition-opacity" onClick={onClick}>
      <div className="relative">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border",
          variant === "primary" 
            ? "bg-gradient-to-br from-primary to-primary/80 text-white border-white/20 shadow-[0_0_35px_-5px_var(--color-primary)]" 
            : "bg-gradient-to-br from-[#27272a] to-[#18181b] text-white border-primary/30 shadow-[0_0_20px_-2px_rgba(129,140,248,0.4),4px_4px_10px_rgba(0,0,0,0.5),-1px_-1px_2px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_-2px_rgba(129,140,248,0.6)] hover:border-primary/60"
        )}>
          <Icon className="w-6 h-6 drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]" strokeWidth={2} />
        </div>
        {badge && (
          <div className="absolute -top-2 -right-2 bg-primary/20 text-[#a5b4fc] text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-[#a5b4fc]/20 backdrop-blur-sm shadow-[0_0_15px_rgba(165,180,252,0.5)]">
            {badge}
          </div>
        )}
      </div>
      <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors drop-shadow-[0_0_8px_rgba(129,140,248,0.3)]">{label}</span>
    </div>
  );
}

function Banner({ icon: Icon, label, action, onClick }: { icon: any, label: string, action: React.ReactNode, onClick?: () => void }) {
  return (
    <Card 
      className="bg-gradient-to-br from-[#27272a] to-[#18181b] border border-white/5 p-4 flex items-center justify-between rounded-xl active:scale-[0.98] transition-all duration-500 cursor-pointer hover:border-primary/30 shadow-[0_0_15px_-3px_rgba(129,140,248,0.15),4px_4px_10px_rgba(0,0,0,0.5),-1px_-1px_2px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_-5px_rgba(129,140,248,0.3)]"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#2c2c2e]/50 flex items-center justify-center text-primary shadow-[0_0_10px_rgba(129,140,248,0.2)] border border-white/5">
          <Icon className="w-5 h-5 drop-shadow-[0_0_5px_rgba(129,140,248,0.5)]" />
        </div>
        <span className="text-sm font-medium text-white drop-shadow-sm">{label}</span>
      </div>
      <div className="text-muted-foreground font-medium">
        {action}
      </div>
    </Card>
  );
}

function FiatCard({ symbol, currency, onClick }: { symbol: string, currency: string, onClick?: () => void }) {
  return (
    <Card 
      className="bg-gradient-to-br from-[#27272a] to-[#18181b] border border-white/5 p-4 rounded-xl flex flex-col justify-between h-32 active:scale-[0.98] transition-all duration-500 cursor-pointer hover:border-primary/30 group shadow-[0_0_15px_-3px_rgba(129,140,248,0.15),4px_4px_10px_rgba(0,0,0,0.5),-1px_-1px_2px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_-5px_rgba(129,140,248,0.3)] relative overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-12 -mt-12 pointer-events-none group-hover:bg-primary/20 transition-colors" />
      
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-8 h-8 rounded-full bg-[#2c2c2e] flex items-center justify-center text-white font-serif italic text-lg shadow-[0_0_10px_rgba(255,255,255,0.1)] border border-white/5">
          {symbol}
        </div>
        <span className="font-bold text-lg drop-shadow-[0_0_10px_rgba(129,140,248,0.3)]">{currency}</span>
      </div>
      
      <div className="flex items-center justify-between text-muted-foreground group-hover:text-primary transition-colors relative z-10">
        <span className="text-xs font-medium">Get an Account</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </Card>
  );
}

function TransactionItem({ icon: Icon, title, date, amount, status }: { icon: any, title: string, date: string, amount: string, status: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer active:bg-white/10 border border-transparent hover:border-primary/20 hover:shadow-[0_0_15px_-5px_rgba(129,140,248,0.2)]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#27272a] to-[#1c1c1e] flex items-center justify-center text-white shadow-[0_0_10px_rgba(0,0,0,0.5)] border border-white/5">
          <Icon className="w-5 h-5 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]" />
        </div>
        <div>
          <div className="font-medium text-sm text-white/90">{title}</div>
          <div className="text-xs text-muted-foreground">{date}</div>
        </div>
      </div>
      <div className="text-right">
        <div className={cn("font-semibold text-sm drop-shadow-sm", amount.startsWith("+") ? "text-[#f472b6] drop-shadow-[0_0_8px_rgba(244,114,182,0.4)]" : "text-white")}>{amount}</div>
        <div className="text-xs text-muted-foreground capitalize">{status}</div>
      </div>
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