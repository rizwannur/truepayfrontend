import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Search, 
  UserPlus, 
  Clock, 
  ChevronRight, 
  ArrowUpRight,
  Signal,
  Wifi,
  Battery,
  Send as SendIcon,
  Bitcoin,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Send() {
  const [, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("fiat");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock Data
  const recentFriends = [
    { id: 1, name: "Alex Morgan", username: "@alexm", avatar: "AM", color: "bg-blue-500" },
    { id: 2, name: "Sarah Chen", username: "@sarahc", avatar: "SC", color: "bg-purple-500" },
    { id: 3, name: "Mike Ross", username: "@miker", avatar: "MR", color: "bg-green-500" },
    { id: 4, name: "Jessica P.", username: "@jessp", avatar: "JP", color: "bg-pink-500" },
  ];

  const history = [
    { id: 1, name: "Alex Morgan", amount: "-$50.00", date: "Today, 10:23 AM", type: "Fiat" },
    { id: 2, name: "Sarah Chen", amount: "-0.002 BTC", date: "Yesterday, 4:15 PM", type: "Crypto" },
    { id: 3, name: "Uber Eats", amount: "-$24.50", date: "Oct 24, 8:00 PM", type: "Fiat" },
    { id: 4, name: "Mike Ross", amount: "-$120.00", date: "Oct 22, 9:30 AM", type: "Fiat" },
  ];

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

      <header className="sticky top-[44px] z-50 bg-black/80 backdrop-blur-lg border-b border-white/5 px-4 py-3 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full text-muted-foreground hover:text-white"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold tracking-tight">Send Money</h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
        
        {/* Currency Tabs */}
        <div className="w-full bg-card/30 border border-white/5 rounded-lg p-1 grid grid-cols-2">
           <button 
             className={cn(
               "flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all",
               activeTab === "fiat" ? "bg-primary/20 text-primary shadow-sm" : "text-muted-foreground hover:text-white"
             )}
             onClick={() => setActiveTab("fiat")}
           >
             <DollarSign className="w-4 h-4" /> Fiat
           </button>
           <button 
             className={cn(
               "flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all",
               activeTab === "crypto" ? "bg-orange-500/20 text-orange-400 shadow-sm" : "text-muted-foreground hover:text-white"
             )}
             onClick={() => setActiveTab("crypto")}
           >
             <Bitcoin className="w-4 h-4" /> Crypto
           </button>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input 
            placeholder="Name, @username, or phone" 
            className="pl-10 bg-card/30 border-white/10 h-12 text-white focus-visible:ring-primary/50 transition-all focus:bg-card/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Quick Send / Friends */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-semibold text-white">Send to Friends</h2>
            <Button variant="ghost" size="sm" className="h-6 text-[10px] text-primary hover:text-primary/80 flex items-center gap-1">
              <UserPlus className="w-3 h-3" /> Add New
            </Button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
            {/* Add Friend Circle */}
            <div className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
              <div className="w-14 h-14 rounded-full bg-card/30 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/50 transition-all">
                <UserPlus className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-white">Add</span>
            </div>

            {recentFriends.map((friend) => (
              <div key={friend.id} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
                <div className={cn("w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg border-2 border-transparent group-hover:scale-105 transition-all shadow-lg", friend.color, "group-hover:border-white/20")}>
                  {friend.avatar}
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-medium text-white group-hover:text-primary transition-colors">{friend.name.split(' ')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions / History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-semibold text-white">Sent History</h2>
            <Button variant="ghost" size="sm" className="h-6 text-[10px] text-muted-foreground hover:text-white">View All</Button>
          </div>

          <div className="space-y-2">
             {history.map((tx) => (
               <Card key={tx.id} className="bg-card/20 border-white/5 p-3 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group active:scale-[0.99]">
                 <div className="flex items-center gap-3">
                   <div className={cn(
                     "w-10 h-10 rounded-full flex items-center justify-center",
                     tx.type === "Crypto" ? "bg-orange-500/10 text-orange-500" : "bg-primary/10 text-primary"
                   )}>
                     <ArrowUpRight className="w-5 h-5" />
                   </div>
                   <div>
                     <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">{tx.name}</div>
                     <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                       <Clock className="w-3 h-3" /> {tx.date}
                     </div>
                   </div>
                 </div>
                 <div className="text-right">
                   <div className="text-sm font-bold text-white">{tx.amount}</div>
                   <div className="text-[10px] text-muted-foreground">{tx.type}</div>
                 </div>
               </Card>
             ))}
          </div>
        </div>

      </main>

      {/* Floating Send Button */}
      <div className="absolute bottom-6 left-6 right-6">
        <Button 
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold shadow-[0_0_20px_rgba(129,140,248,0.4)] rounded-xl flex items-center justify-center gap-2"
            onClick={() => setLocation(`/send-amount?type=${activeTab}`)}
        >
          <SendIcon className="w-5 h-5" /> Send {activeTab === "fiat" ? "USD" : "Crypto"}
        </Button>
      </div>
    </div>
  );
}