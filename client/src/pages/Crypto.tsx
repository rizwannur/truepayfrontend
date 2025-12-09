import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  CreditCard,
  Plus,
  ArrowRight,
  Bitcoin,
  LineChart,
  Signal,
  Wifi,
  Battery,
  User,
  LayoutGrid,
  Send,
  Home as HomeIcon,
  ShoppingBag,
  Info
} from "lucide-react";
import { 
  LineChart as RechartsLineChart, 
  Line, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { cn } from "@/lib/utils";
import ThreeDCoin from "@/components/ThreeDCoin";

// Mock Data
const PORTFOLIO = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', amount: 0.45, value: 28450.20, change: 2.5 },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', amount: 4.2, value: 8540.10, change: -1.2 },
  { id: 'sol', name: 'Solana', symbol: 'SOL', amount: 145, value: 3450.80, change: 5.8 },
];

const ALL_COINS = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 63222.00, change: 2.5, marketCap: '1.2T', volume: '34B' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 3450.00, change: -1.2, marketCap: '400B', volume: '15B' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', price: 145.20, change: 5.8, marketCap: '65B', volume: '4B' },
  { id: 'ada', name: 'Cardano', symbol: 'ADA', price: 0.45, change: 0.5, marketCap: '15B', volume: '500M' },
  { id: 'dot', name: 'Polkadot', symbol: 'DOT', price: 7.20, change: -3.4, marketCap: '8B', volume: '200M' },
  { id: 'doge', name: 'Dogecoin', symbol: 'DOGE', price: 0.12, change: 12.5, marketCap: '18B', volume: '2B' },
];

const CHART_DATA = [
  { time: '1D', value: 62000 },
  { time: '2D', value: 62500 },
  { time: '3D', value: 61800 },
  { time: '4D', value: 63000 },
  { time: '5D', value: 62800 },
  { time: '6D', value: 63500 },
  { time: '7D', value: 63222 },
];

export default function Crypto() {
  const [location, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredCoins = ALL_COINS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full w-full bg-obsidian-shiny text-foreground pb-28 font-sans select-none overflow-hidden relative flex flex-col">
      
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
      <header className="sticky top-[44px] z-50 bg-black/80 backdrop-blur-lg border-b border-white/5 px-4 py-3 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full text-muted-foreground hover:text-white"
          onClick={() => selectedCoin ? setSelectedCoin(null) : setLocation("/")}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold tracking-tight">{selectedCoin ? ALL_COINS.find(c => c.id === selectedCoin)?.name : "Crypto Market"}</h1>
        <div className="ml-auto">
             <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-white">
                 <Search className="w-5 h-5" />
             </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-8">
        
        {!selectedCoin ? (
           <div className="space-y-6">
                {/* Hero 3D Bitcoin */}
                <div className="relative h-[320px] w-full flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50 pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.2)_0%,transparent_70%)] blur-3xl pointer-events-none" />
                    
                    {/* 3D Coin Canvas */}
                    <div className="relative w-full h-full z-10">
                        <ThreeDCoin />
                    </div>
                    
                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-8 text-center z-20 pointer-events-none">
                        <div>
                            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Market Cap</div>
                            <div className="text-lg font-bold text-white">$2.4T</div>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">24h Vol</div>
                            <div className="text-lg font-bold text-white">$84B</div>
                        </div>
                    </div>
                </div>

                {/* Portfolio Section */}
                <div className="px-4">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h2 className="text-lg font-bold text-white">Your Holdings</h2>
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-primary hover:text-primary/80">View All</Button>
                    </div>
                    <div className="bg-card/30 border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
                        <div className="mb-4">
                            <div className="text-sm text-muted-foreground">Total Balance</div>
                            <div className="text-3xl font-bold text-white flex items-end gap-2">
                                $40,441.10
                                <span className="text-sm font-medium text-green-400 mb-1 flex items-center">
                                    <TrendingUp className="w-3 h-3 mr-1" /> +2.4%
                                </span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {PORTFOLIO.map(asset => (
                                <div key={asset.id} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer" onClick={() => setSelectedCoin(asset.id)}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs text-white border border-white/5">
                                            {asset.symbol[0]}
                                        </div>
                                        <div>
                                            <div className="font-medium text-white text-sm">{asset.name}</div>
                                            <div className="text-xs text-muted-foreground">{asset.amount} {asset.symbol}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium text-white text-sm">${asset.value.toLocaleString()}</div>
                                        <div className={cn("text-xs font-medium", asset.change >= 0 ? "text-green-400" : "text-red-400")}>
                                            {asset.change >= 0 ? "+" : ""}{asset.change}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Market List */}
                <div className="px-4 pb-4">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h2 className="text-lg font-bold text-white">Market</h2>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                            placeholder="Search coins..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-card/20 border-white/5 pl-9 text-white placeholder:text-muted-foreground focus-visible:ring-primary/50"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        {filteredCoins.map(coin => (
                            <div 
                                key={coin.id} 
                                className="flex items-center justify-between p-3 bg-card/20 border border-white/5 rounded-xl hover:bg-white/5 transition-all cursor-pointer group active:scale-[0.99]"
                                onClick={() => setSelectedCoin(coin.id)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#27272a] to-[#1c1c1e] flex items-center justify-center text-white shadow-lg border border-white/5 group-hover:border-primary/30 transition-colors">
                                        {coin.id === 'btc' ? <Bitcoin className="w-5 h-5 text-orange-500" /> : <span className="font-bold text-xs">{coin.symbol}</span>}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white text-sm group-hover:text-primary transition-colors">{coin.name}</div>
                                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                                            <span className="bg-white/10 px-1 rounded text-[9px]">Rank #{ALL_COINS.indexOf(coin) + 1}</span>
                                            <span>Cap {coin.marketCap}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-right">
                                    <div className="font-bold text-white text-sm">${coin.price.toLocaleString()}</div>
                                    <div className={cn("text-xs font-medium flex items-center justify-end gap-1", coin.change >= 0 ? "text-green-400" : "text-red-400")}>
                                        {coin.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                        {Math.abs(coin.change)}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
           </div>
        ) : (
            // Selected Coin Detail View
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                {(() => {
                    const coin = ALL_COINS.find(c => c.id === selectedCoin);
                    if (!coin) return null;
                    
                    return (
                        <div className="px-4 space-y-6">
                            {/* Price Header */}
                            <div className="text-center py-4">
                                <div className="text-sm text-muted-foreground font-medium uppercase tracking-widest mb-1">{coin.name} Price</div>
                                <div className="text-4xl font-bold text-white mb-2">${coin.price.toLocaleString()}</div>
                                <div className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium", coin.change >= 0 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400")}>
                                    {coin.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                    {coin.change >= 0 ? "+" : ""}{coin.change}% (24h)
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="h-[250px] w-full -mx-4 px-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RechartsLineChart data={CHART_DATA}>
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                                            itemStyle={{ color: '#fff' }}
                                            labelStyle={{ display: 'none' }}
                                            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="value" 
                                            stroke="#818cf8" 
                                            strokeWidth={3} 
                                            dot={false}
                                            activeDot={{ r: 6, fill: '#818cf8', stroke: '#fff', strokeWidth: 2 }}
                                        />
                                    </RechartsLineChart>
                                </ResponsiveContainer>
                                <div className="flex justify-between px-4 mt-2">
                                    {['1H', '1D', '1W', '1M', '1Y', 'ALL'].map(t => (
                                        <button key={t} className={cn("text-xs font-medium px-3 py-1 rounded-full transition-colors", t === '1W' ? "bg-primary text-white" : "text-muted-foreground hover:text-white hover:bg-white/5")}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <Button className="h-12 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                                    Buy {coin.symbol}
                                </Button>
                                <Button className="h-12 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                                    Sell {coin.symbol}
                                </Button>
                            </div>

                            {/* Stats Grid */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-white">Market Stats</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-card/30 p-4 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                                            <ShoppingBag className="w-3 h-3" /> Market Cap
                                        </div>
                                        <div className="text-lg font-semibold text-white">${coin.marketCap}</div>
                                    </div>
                                    <div className="bg-card/30 p-4 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                                            <Signal className="w-3 h-3" /> Volume (24h)
                                        </div>
                                        <div className="text-lg font-semibold text-white">${coin.volume}</div>
                                    </div>
                                    <div className="bg-card/30 p-4 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                                            <Info className="w-3 h-3" /> Supply
                                        </div>
                                        <div className="text-lg font-semibold text-white">19.5M</div>
                                    </div>
                                    <div className="bg-card/30 p-4 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                                            <TrendingUp className="w-3 h-3" /> All Time High
                                        </div>
                                        <div className="text-lg font-semibold text-white">$69,000</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* About Section */}
                            <div className="bg-card/30 p-4 rounded-xl border border-white/5 space-y-2">
                                <h3 className="text-lg font-bold text-white">About {coin.name}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {coin.name} is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer network without the need for intermediaries.
                                </p>
                            </div>
                        </div>
                    );
                })()}
            </div>
        )}

      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-[#09090b]/95 backdrop-blur-xl border-t border-white/5 pb-8 pt-2 px-6 flex justify-between items-center z-50">
        <NavItem icon={HomeIcon} label="Home" onClick={() => setLocation("/")} />
        <NavItem icon={CreditCard} label="Card" onClick={() => setLocation("/cards")} />
        <div className="relative -top-5">
           <div 
             className="bg-primary rounded-full p-4 shadow-lg shadow-primary/30 border-4 border-black active:scale-95 transition-transform cursor-pointer"
             onClick={() => setLocation("/send")}
           >
              <Send className="w-6 h-6 text-white ml-0.5" />
           </div>
        </div>
        <NavItem icon={LayoutGrid} label="Hub" />
        <NavItem icon={User} label="Profile" onClick={() => setLocation("/profile")} />
      </nav>
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