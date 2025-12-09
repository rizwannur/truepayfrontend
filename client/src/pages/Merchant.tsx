import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Signal,
  Wifi,
  Battery,
  Store,
  CreditCard,
  DollarSign,
  Plus,
  ArrowRight,
  Calendar,
  BarChart3,
  Link,
  RefreshCw,
  ChevronDown,
  TrendingUp,
  History,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Merchant() {
  const [location, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  const [currency, setCurrency] = useState("USD");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full bg-obsidian-shiny text-foreground pb-24 font-sans select-none overflow-hidden relative flex flex-col">
      
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
        <div className="flex items-center gap-3">
            <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-muted-foreground hover:text-white"
                onClick={() => setLocation("/")}
            >
                <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-bold tracking-tight">Merchant Dashboard</h1>
        </div>
        <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:text-primary/80 gap-1 bg-primary/10 hover:bg-primary/20 rounded-full h-8"
            onClick={() => setLocation("/merchant/analytics")}
        >
            <BarChart3 className="w-4 h-4" /> Analytics
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
        
        {/* Revenue Header */}
        <div className="text-center space-y-1 py-2">
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Revenue (Last 30 Days)</div>
            <div className="text-4xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
                {currency === "USD" ? "$" : currency === "EUR" ? "€" : "£"}
                {currency === "USD" ? "12,450.00" : currency === "EUR" ? "11,200.00" : "9,850.00"}
            </div>
            <div className="flex items-center justify-center gap-1 text-green-400 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                +15.3% vs last month
            </div>
        </div>

        {/* Currency Selector */}
        <div className="flex justify-center relative z-20">
            <div className="relative">
                <Button 
                    variant="outline" 
                    className="h-8 border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium gap-2 rounded-full"
                    onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                >
                    {currency} Currency <ChevronDown className="w-3 h-3" />
                </Button>
                {showCurrencyDropdown && (
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-32 bg-[#1c1c1e] border border-white/10 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {["USD", "EUR", "GBP"].map((c) => (
                            <div 
                                key={c}
                                className={cn(
                                    "px-4 py-2 text-sm text-center cursor-pointer hover:bg-white/5 transition-colors",
                                    currency === c ? "text-primary font-bold bg-primary/10" : "text-white"
                                )}
                                onClick={() => {
                                    setCurrency(c);
                                    setShowCurrencyDropdown(false);
                                }}
                            >
                                {c}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-3 gap-3">
            <Card className="bg-card/30 border-white/5 p-3 rounded-xl space-y-1">
                <div className="text-[10px] text-muted-foreground font-medium uppercase">Pending</div>
                <div className="text-lg font-bold text-white">$1,240</div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500/50 w-[40%]" />
                </div>
            </Card>
            <Card className="bg-card/30 border-white/5 p-3 rounded-xl space-y-1">
                <div className="text-[10px] text-muted-foreground font-medium uppercase">Disputed</div>
                <div className="text-lg font-bold text-white">$150</div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500/50 w-[10%]" />
                </div>
            </Card>
            <Card className="bg-card/30 border-white/5 p-3 rounded-xl space-y-1">
                <div className="text-[10px] text-muted-foreground font-medium uppercase">Available</div>
                <div className="text-lg font-bold text-white">$8,450</div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500/50 w-[80%]" />
                </div>
            </Card>
        </div>

        {/* Payout Button */}
        <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2">
            <DollarSign className="w-5 h-5" /> Initiate Payout
        </Button>

        {/* Quick Actions */}
        <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider ml-1">Tools</h2>
            <div className="grid grid-cols-2 gap-3">
                <Card 
                    className="bg-card/30 border-white/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors cursor-pointer group active:scale-[0.98]"
                    onClick={() => setLocation("/merchant/create-link")}
                >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Link className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-white">Payment Link</span>
                </Card>
                <Card 
                    className="bg-card/30 border-white/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors cursor-pointer group active:scale-[0.98]"
                    onClick={() => setLocation("/merchant/create-subscription")}
                >
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                        <RefreshCw className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-white">Subscription</span>
                </Card>
            </div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recent Transactions</h2>
                <Button variant="ghost" size="sm" className="h-6 text-xs text-primary hover:text-primary/80">View All</Button>
            </div>
            
            <div className="space-y-2">
                {[
                    { id: 1, name: "Premium Plan", amount: 49.99, date: "Today, 2:30 PM", status: "succeeded", type: "subscription" },
                    { id: 2, name: "Consultation", amount: 150.00, date: "Yesterday", status: "succeeded", type: "payment" },
                    { id: 3, name: "E-Book Bundle", amount: 29.99, date: "Oct 24", status: "disputed", type: "payment" },
                    { id: 4, name: "Pro Monthly", amount: 19.99, date: "Oct 23", status: "succeeded", type: "subscription" },
                ].map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 bg-card/20 border border-white/5 rounded-xl hover:bg-white/5 transition-all">
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center border border-white/5",
                                tx.status === "disputed" ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"
                            )}>
                                {tx.status === "disputed" ? <AlertCircle className="w-5 h-5" /> : <DollarSign className="w-5 h-5" />}
                            </div>
                            <div>
                                <div className="font-medium text-white text-sm">{tx.name}</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    {tx.type === "subscription" ? <RefreshCw className="w-3 h-3" /> : <CreditCard className="w-3 h-3" />}
                                    {tx.date}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-white text-sm">+${tx.amount}</div>
                            <div className={cn(
                                "text-[10px] font-medium uppercase px-1.5 py-0.5 rounded-full inline-block",
                                tx.status === "succeeded" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                            )}>
                                {tx.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}