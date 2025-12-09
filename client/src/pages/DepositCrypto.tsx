import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Copy, 
  CheckCircle2, 
  QrCode, 
  AlertCircle,
  ChevronDown,
  Info,
  Signal,
  Wifi,
  Battery
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const CRYPTO_OPTIONS = [
  { symbol: "BTC", name: "Bitcoin", network: "Bitcoin", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", color: "text-orange-500", bg: "bg-orange-500/10" },
  { symbol: "ETH", name: "Ethereum", network: "ERC-20", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", color: "text-blue-500", bg: "bg-blue-500/10" },
  { symbol: "USDT", name: "Tether", network: "TRC-20", address: "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb", color: "text-green-500", bg: "bg-green-500/10" },
  { symbol: "SOL", name: "Solana", network: "Solana", address: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrp", color: "text-purple-500", bg: "bg-purple-500/10" },
];

export default function DepositCrypto() {
  const [, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTO_OPTIONS[0]);
  const [copied, setCopied] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedCrypto.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <header className="sticky top-[44px] z-50 bg-black/80 backdrop-blur-lg border-b border-white/5 px-4 py-3 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full text-muted-foreground hover:text-white"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold tracking-tight">Deposit Crypto</h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
        
        {/* Info Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex gap-3">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Unlock Liquidity</h4>
            <p className="text-xs text-muted-foreground">
              Deposit crypto assets to instantly unlock a credit line. Your assets are stored safely in cold storage.
            </p>
          </div>
        </div>

        {/* Crypto Selector */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground ml-1">Select Asset</label>
            <Dialog open={isSelectorOpen} onOpenChange={setIsSelectorOpen}>
                <DialogTrigger asChild>
                    <Button 
                        variant="outline" 
                        className="w-full h-14 justify-between bg-[#1c1c1e] border-white/10 hover:bg-white/5 text-white rounded-xl px-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", selectedCrypto.bg)}>
                                <span className={cn("text-[10px] font-bold", selectedCrypto.color)}>{selectedCrypto.symbol[0]}</span>
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-sm">{selectedCrypto.name}</div>
                                <div className="text-[10px] text-muted-foreground">{selectedCrypto.network} Network</div>
                            </div>
                        </div>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#1c1c1e] border-white/10 text-white sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Select Cryptocurrency</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2 pt-4">
                        {CRYPTO_OPTIONS.map((crypto) => (
                            <div 
                                key={crypto.symbol}
                                className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors"
                                onClick={() => {
                                    setSelectedCrypto(crypto);
                                    setIsSelectorOpen(false);
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", crypto.bg)}>
                                        <span className={cn("text-[10px] font-bold", crypto.color)}>{crypto.symbol[0]}</span>
                                    </div>
                                    <div>
                                        <div className="font-bold">{crypto.name}</div>
                                        <div className="text-xs text-muted-foreground">{crypto.network}</div>
                                    </div>
                                </div>
                                {selectedCrypto.symbol === crypto.symbol && <CheckCircle2 className="w-4 h-4 text-primary" />}
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center justify-center space-y-6 py-4">
            <div className="relative group cursor-pointer" onClick={handleCopy}>
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white p-4 rounded-2xl shadow-xl">
                    <QrCode className="w-48 h-48 text-black" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-2xl">
                        <span className="text-black font-bold text-sm">Tap to Copy</span>
                    </div>
                </div>
            </div>
            
            <div className="w-full space-y-2">
                <div className="text-center text-xs text-muted-foreground mb-1">Deposit Address ({selectedCrypto.network})</div>
                <div 
                    className="bg-[#1c1c1e] border border-white/10 p-4 rounded-xl flex items-center justify-between gap-3 cursor-pointer hover:bg-white/5 transition-colors group"
                    onClick={handleCopy}
                >
                    <div className="font-mono text-xs text-white break-all">{selectedCrypto.address}</div>
                    <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8 text-muted-foreground group-hover:text-white">
                        {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                </div>
            </div>
        </div>

        {/* Warning */}
        <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0" />
            <p className="text-xs text-yellow-200/80">
                Only send <span className="font-bold text-yellow-200">{selectedCrypto.name} ({selectedCrypto.symbol})</span> to this address. Sending any other asset may result in permanent loss.
            </p>
        </div>

      </main>
    </div>
  );
}