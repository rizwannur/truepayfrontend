import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  ArrowDownUp, 
  Settings, 
  Info, 
  Search,
  ChevronDown,
  Loader2,
  Signal,
  Wifi,
  Battery,
  CheckCircle2
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Mock data for tokens
const TOKENS = [
  { symbol: "BTC", name: "Bitcoin", balance: "0.45", price: 65430.20, color: "text-orange-500", bg: "bg-orange-500/10" },
  { symbol: "ETH", name: "Ethereum", balance: "4.2", price: 3450.10, color: "text-blue-500", bg: "bg-blue-500/10" },
  { symbol: "USDT", name: "Tether", balance: "12450.00", price: 1.00, color: "text-green-500", bg: "bg-green-500/10" },
  { symbol: "SOL", name: "Solana", balance: "145.5", price: 148.20, color: "text-purple-500", bg: "bg-purple-500/10" },
  { symbol: "DOGE", name: "Dogecoin", balance: "50000", price: 0.15, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { symbol: "XRP", name: "Ripple", balance: "2500", price: 0.62, color: "text-white", bg: "bg-white/10" },
];

export default function Swap() {
  const [, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  
  const [payAmount, setPayAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [payToken, setPayToken] = useState(TOKENS[2]); // Default USDT
  const [receiveToken, setReceiveToken] = useState(TOKENS[0]); // Default BTC
  
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Selection modals
  const [isPayTokenOpen, setIsPayTokenOpen] = useState(false);
  const [isReceiveTokenOpen, setIsReceiveTokenOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate receive amount when pay amount changes
  useEffect(() => {
    if (!payAmount) {
      setReceiveAmount("");
      return;
    }
    const val = parseFloat(payAmount);
    if (isNaN(val)) return;

    // Simple mock calculation
    const rate = payToken.price / receiveToken.price;
    setReceiveAmount((val * rate).toFixed(6));
  }, [payAmount, payToken, receiveToken]);

  const handleSwap = () => {
    const temp = payToken;
    setPayToken(receiveToken);
    setReceiveToken(temp);
    setPayAmount(receiveAmount);
  };

  const handleConfirmSwap = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setPayAmount("");
        setReceiveAmount("");
      }, 3000);
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
            <h1 className="text-lg font-bold tracking-tight">Swap</h1>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
            <Settings className="w-5 h-5" />
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6 relative">
        
        {/* Success Overlay */}
        {showSuccess && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="bg-[#1c1c1e] border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-4 text-center max-w-[80%] shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Swap Successful!</h3>
                    <p className="text-sm text-muted-foreground">
                        You successfully swapped {payToken.symbol} for {receiveToken.symbol}
                    </p>
                    <Button 
                        className="w-full mt-2 bg-white text-black hover:bg-white/90"
                        onClick={() => setShowSuccess(false)}
                    >
                        Done
                    </Button>
                </div>
            </div>
        )}

        {/* Swap Card */}
        <div className="relative space-y-1">
            
            {/* Pay Section */}
            <div className="bg-[#1c1c1e] border border-white/5 rounded-2xl p-4 space-y-4">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">You pay</span>
                    <span className="text-muted-foreground flex items-center gap-1">
                        Balance: {payToken.balance} 
                        <span className="text-primary font-bold cursor-pointer hover:text-primary/80" onClick={() => setPayAmount(payToken.balance)}>MAX</span>
                    </span>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                    <Input 
                        type="number" 
                        placeholder="0" 
                        className="text-3xl font-bold bg-transparent border-none p-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/30 text-white w-[60%]"
                        value={payAmount}
                        onChange={(e) => setPayAmount(e.target.value)}
                    />
                    
                    <Dialog open={isPayTokenOpen} onOpenChange={setIsPayTokenOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 gap-2 px-3 h-10 min-w-[110px]">
                                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", payToken.bg)}>
                                    <span className={cn("text-[8px] font-bold", payToken.color)}>{payToken.symbol[0]}</span>
                                </div>
                                <span className="font-bold">{payToken.symbol}</span>
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#1c1c1e] border-white/10 text-white sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Select Token</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search name or paste address" className="pl-9 bg-black/40 border-white/10 text-white" />
                                </div>
                                <div className="space-y-2 max-h-[300px] overflow-y-auto no-scrollbar">
                                    {TOKENS.map((token) => (
                                        <div 
                                            key={token.symbol}
                                            className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors"
                                            onClick={() => {
                                                if (token.symbol === receiveToken.symbol) {
                                                    setReceiveToken(payToken);
                                                }
                                                setPayToken(token);
                                                setIsPayTokenOpen(false);
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", token.bg)}>
                                                    <span className={cn("text-[10px] font-bold", token.color)}>{token.symbol[0]}</span>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{token.symbol}</div>
                                                    <div className="text-xs text-muted-foreground">{token.name}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium">{token.balance}</div>
                                                <div className="text-xs text-muted-foreground">${token.price.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                
                <div className="text-xs text-muted-foreground">
                    ≈ ${payAmount ? (parseFloat(payAmount) * payToken.price).toLocaleString() : "0.00"}
                </div>
            </div>

            {/* Swap Trigger */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <Button 
                    size="icon" 
                    className="rounded-xl border-4 border-black bg-[#2c2c2e] hover:bg-[#3c3c3e] h-10 w-10 shadow-lg"
                    onClick={handleSwap}
                >
                    <ArrowDownUp className="w-5 h-5" />
                </Button>
            </div>

            {/* Receive Section */}
            <div className="bg-[#1c1c1e] border border-white/5 rounded-2xl p-4 space-y-4 pt-8">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">You receive</span>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                    <Input 
                        type="number" 
                        placeholder="0" 
                        className="text-3xl font-bold bg-transparent border-none p-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/30 text-white w-[60%]"
                        value={receiveAmount}
                        readOnly
                    />
                    
                    <Dialog open={isReceiveTokenOpen} onOpenChange={setIsReceiveTokenOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 gap-2 px-3 h-10 min-w-[110px]">
                                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", receiveToken.bg)}>
                                    <span className={cn("text-[8px] font-bold", receiveToken.color)}>{receiveToken.symbol[0]}</span>
                                </div>
                                <span className="font-bold">{receiveToken.symbol}</span>
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#1c1c1e] border-white/10 text-white sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Select Token</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search name or paste address" className="pl-9 bg-black/40 border-white/10 text-white" />
                                </div>
                                <div className="space-y-2 max-h-[300px] overflow-y-auto no-scrollbar">
                                    {TOKENS.map((token) => (
                                        <div 
                                            key={token.symbol}
                                            className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors"
                                            onClick={() => {
                                                if (token.symbol === payToken.symbol) {
                                                    setPayToken(receiveToken);
                                                }
                                                setReceiveToken(token);
                                                setIsReceiveTokenOpen(false);
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", token.bg)}>
                                                    <span className={cn("text-[10px] font-bold", token.color)}>{token.symbol[0]}</span>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{token.symbol}</div>
                                                    <div className="text-xs text-muted-foreground">{token.name}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium">{token.balance}</div>
                                                <div className="text-xs text-muted-foreground">${token.price.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                
                <div className="text-xs text-muted-foreground">
                    ≈ ${receiveAmount ? (parseFloat(receiveAmount) * receiveToken.price).toLocaleString() : "0.00"}
                </div>
            </div>
        </div>

        {/* Price Info */}
        <div className="bg-card/20 rounded-xl p-3 border border-white/5 space-y-2">
            <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Rate</span>
                <span className="text-white flex items-center gap-1">
                    1 {payToken.symbol} ≈ {(payToken.price / receiveToken.price).toFixed(4)} {receiveToken.symbol}
                    <Info className="w-3 h-3 text-muted-foreground" />
                </span>
            </div>
            <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Network Fee</span>
                <span className="text-white flex items-center gap-1">
                    $1.50 <span className="line-through text-muted-foreground">$3.00</span>
                </span>
            </div>
            <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Price Impact</span>
                <span className="text-green-400">~0.05%</span>
            </div>
        </div>

        {/* Action Button */}
        <Button 
            className="w-full h-14 text-lg font-bold rounded-xl shadow-[0_0_20px_rgba(129,140,248,0.3)] bg-primary hover:bg-primary/90 transition-all active:scale-[0.98]"
            disabled={!payAmount || isLoading}
            onClick={handleConfirmSwap}
        >
            {isLoading ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Swapping...</>
            ) : (
                "Preview Swap"
            )}
        </Button>

      </main>
    </div>
  );
}