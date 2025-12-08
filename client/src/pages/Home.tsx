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
  Signal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-foreground pb-28 font-sans select-none overflow-hidden relative">
      
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
        <h1 className="text-lg font-bold tracking-tight">True Pay</h1>
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
          <Card className="bg-[#1c1c1e] border-none p-4 flex items-center justify-between rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2c2c2e] flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-sm">Verify your identity</div>
                <div className="text-xs text-red-400 font-medium">Unverified</div>
              </div>
            </div>
            <Button variant="outline" className="h-8 px-4 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary rounded-lg text-xs font-semibold">
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
            <QuickAction icon={Plus} label="Deposit" variant="primary" />
            <QuickAction icon={ArrowRight} label="Send" />
            <QuickAction icon={DollarSign} label="Earn" badge="New" />
            <QuickAction icon={Users} label="P2P" />
            
            <QuickAction icon={Heart} label="Referral" />
            <QuickAction icon={Wallet} label="Credit" badge="New" />
            <QuickAction icon={ArrowLeftRight} label="Swap" />
            <QuickAction icon={LayoutGrid} label="More" />
          </div>

          {/* Banners */}
          <div className="space-y-3">
            <Banner 
              icon={Lock} 
              label="Deposit Crypto to Unlock Liquidity" 
              action="$"
            />
            <Banner 
              icon={Calendar} 
              label="Flexible Repayment Schedule" 
              action={<ChevronRight className="w-5 h-5 text-muted-foreground" />} 
            />
          </div>

          {/* Fiat Accounts */}
          <div className="grid grid-cols-2 gap-3">
            <FiatCard symbol="€" currency="EUR" />
            <FiatCard symbol="£" currency="GBP" />
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
      <nav className="fixed bottom-0 left-0 right-0 bg-[#09090b]/95 backdrop-blur-xl border-t border-white/5 pb-8 pt-2 px-6 flex justify-between items-center z-50">
        <NavItem icon={HomeIcon} label="Home" active />
        <NavItem icon={CreditCard} label="Card" />
        <div className="relative -top-5">
           <div className="bg-primary rounded-full p-4 shadow-lg shadow-primary/30 border-4 border-black active:scale-95 transition-transform cursor-pointer">
              <Send className="w-6 h-6 text-white ml-0.5" />
           </div>
        </div>
        <NavItem icon={LayoutGrid} label="Hub" />
        <NavItem icon={User} label="Profile" />
      </nav>

      {/* Home Indicator */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white/30 rounded-full z-[60]" />
    </div>
  );
}

function QuickAction({ 
  icon: Icon, 
  label, 
  variant = "default", 
  badge 
}: { 
  icon: any, 
  label: string, 
  variant?: "default" | "primary",
  badge?: string
}) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer active:opacity-70 transition-opacity">
      <div className="relative">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200",
          variant === "primary" 
            ? "bg-primary text-white shadow-[0_0_15px_-3px_var(--color-primary)]" 
            : "bg-[#1c1c1e] text-white hover:bg-[#27272a]"
        )}>
          <Icon className="w-6 h-6" strokeWidth={2} />
        </div>
        {badge && (
          <div className="absolute -top-2 -right-2 bg-primary/20 text-[#a5b4fc] text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-[#a5b4fc]/20 backdrop-blur-sm">
            {badge}
          </div>
        )}
      </div>
      <span className="text-xs font-medium text-muted-foreground group-hover:text-white transition-colors">{label}</span>
    </div>
  );
}

function Banner({ icon: Icon, label, action }: { icon: any, label: string, action: React.ReactNode }) {
  return (
    <Card className="bg-[#1c1c1e] border-none p-4 flex items-center justify-between rounded-xl active:scale-[0.98] transition-transform cursor-pointer hover:bg-[#27272a]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#2c2c2e]/50 flex items-center justify-center text-primary">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium text-white">{label}</span>
      </div>
      <div className="text-muted-foreground font-medium">
        {action}
      </div>
    </Card>
  );
}

function FiatCard({ symbol, currency }: { symbol: string, currency: string }) {
  return (
    <Card className="bg-[#1c1c1e] border-none p-4 rounded-xl flex flex-col justify-between h-32 active:scale-[0.98] transition-transform cursor-pointer hover:bg-[#27272a] group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#2c2c2e] flex items-center justify-center text-white font-serif italic text-lg">
          {symbol}
        </div>
        <span className="font-bold text-lg">{currency}</span>
      </div>
      
      <div className="flex items-center justify-between text-muted-foreground group-hover:text-white transition-colors">
        <span className="text-xs font-medium">Get an Account</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </Card>
  );
}

function TransactionItem({ icon: Icon, title, date, amount, status }: { icon: any, title: string, date: string, amount: string, status: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer active:bg-white/10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#1c1c1e] flex items-center justify-center text-white">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="font-medium text-sm">{title}</div>
          <div className="text-xs text-muted-foreground">{date}</div>
        </div>
      </div>
      <div className="text-right">
        <div className={cn("font-semibold text-sm", amount.startsWith("+") ? "text-[#f472b6]" : "text-white")}>{amount}</div>
        <div className="text-xs text-muted-foreground capitalize">{status}</div>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={cn(
      "flex flex-col items-center gap-1 w-16 transition-colors active:scale-95",
      active ? "text-primary" : "text-muted-foreground hover:text-white"
    )}>
      <Icon className={cn("w-6 h-6", active && "fill-current")} strokeWidth={active ? 2.5 : 2} />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}