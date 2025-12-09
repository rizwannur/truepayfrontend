import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Signal,
  Wifi,
  Battery,
  Calendar as CalendarIcon,
  Download,
  BarChart3,
  TrendingUp,
  CreditCard,
  Users
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { cn } from "@/lib/utils";

const DATA = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

export default function MerchantAnalytics() {
  const [location, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full bg-obsidian-shiny text-foreground pb-8 font-sans select-none overflow-hidden relative flex flex-col">
      
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
                onClick={() => setLocation("/merchant")}
            >
                <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-bold tracking-tight">Analytics</h1>
        </div>
        <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full text-muted-foreground hover:text-white"
        >
            <Download className="w-5 h-5" />
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
        
        {/* Time Range Selector */}
        <div className="flex bg-card/30 p-1 rounded-xl border border-white/5">
            {["7d", "30d", "90d", "1y"].map((range) => (
                <button 
                    key={range}
                    className={cn(
                        "flex-1 py-1.5 text-xs font-medium rounded-lg transition-all",
                        timeRange === range ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-white"
                    )}
                    onClick={() => setTimeRange(range)}
                >
                    {range.toUpperCase()}
                </button>
            ))}
            <button className="px-3 py-1.5 text-muted-foreground hover:text-white transition-colors">
                <CalendarIcon className="w-4 h-4" />
            </button>
        </div>

        {/* Main Chart */}
        <div className="h-[250px] w-full -mx-4 px-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA}>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                        labelStyle={{ display: 'none' }}
                        formatter={(value: number) => [`$${value}`, 'Revenue']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
            <Card className="bg-card/30 border-white/5 p-4 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase">
                    <TrendingUp className="w-3 h-3" /> Daily Average
                </div>
                <div className="text-xl font-bold text-white">$415.00</div>
                <div className="text-xs text-green-400 font-medium">+12% vs last week</div>
            </Card>
            <Card className="bg-card/30 border-white/5 p-4 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase">
                    <CreditCard className="w-3 h-3" /> Total Payments
                </div>
                <div className="text-xl font-bold text-white">1,245</div>
                <div className="text-xs text-green-400 font-medium">+5% vs last week</div>
            </Card>
            <Card className="bg-card/30 border-white/5 p-4 rounded-xl space-y-1 col-span-2">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase">
                    <Users className="w-3 h-3" /> New Customers
                </div>
                <div className="text-xl font-bold text-white">84</div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-purple-500/50 w-[65%]" />
                </div>
            </Card>
        </div>

      </main>
    </div>
  );
}