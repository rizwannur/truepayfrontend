import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { 
  ArrowLeft, 
  Calendar, 
  ChevronRight, 
  Info, 
  CheckCircle2,
  Signal,
  Wifi,
  Battery,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RepaymentSchedule() {
  const [, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  
  const [loanAmount, setLoanAmount] = useState(5000);
  const [months, setMonths] = useState([12]);
  const [interestRate] = useState(5.5); // 5.5% APR

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const monthlyPayment = (loanAmount * (1 + interestRate / 100)) / months[0];
  const totalRepayment = loanAmount * (1 + interestRate / 100);

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
        <h1 className="text-lg font-bold tracking-tight">Repayment Schedule</h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
        
        {/* Loan Summary */}
        <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Total Outstanding Balance</div>
            <div className="text-4xl font-bold text-white tracking-tight flex items-center justify-center gap-1 drop-shadow-[0_0_15px_rgba(129,140,248,0.3)]">
                <span className="text-2xl text-muted-foreground">$</span>{loanAmount.toLocaleString()}
            </div>
            <div className="text-xs text-green-400 font-medium bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-full inline-block">
                No penalty for early repayment
            </div>
        </div>

        {/* Sliders */}
        <div className="space-y-6 bg-[#1c1c1e] border border-white/5 p-6 rounded-2xl">
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <label className="text-sm font-medium text-white">Repayment Duration</label>
                    <span className="text-xl font-bold text-primary">{months[0]} Months</span>
                </div>
                <Slider 
                    value={months} 
                    onValueChange={setMonths} 
                    min={3} 
                    max={36} 
                    step={1}
                    className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>3 Months</span>
                    <span>36 Months</span>
                </div>
            </div>

            <div className="h-px w-full bg-white/5" />

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Monthly Payment</div>
                    <div className="text-xl font-bold text-white">${monthlyPayment.toFixed(2)}</div>
                </div>
                <div className="space-y-1 text-right">
                    <div className="text-xs text-muted-foreground">Total Repayment</div>
                    <div className="text-xl font-bold text-white">${totalRepayment.toFixed(2)}</div>
                </div>
            </div>
        </div>

        {/* Schedule Preview */}
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider ml-1">Upcoming Payments</h3>
            <div className="space-y-2">
                {[1, 2, 3].map((i) => {
                    const date = new Date();
                    date.setMonth(date.getMonth() + i);
                    return (
                        <div key={i} className="flex items-center justify-between p-4 bg-card/30 border border-white/5 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-white">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                    <div className="text-xs text-muted-foreground">Installment {i} of {months[0]}</div>
                                </div>
                            </div>
                            <div className="font-bold text-white">${monthlyPayment.toFixed(2)}</div>
                        </div>
                    );
                })}
                {months[0] > 3 && (
                    <div className="text-center text-xs text-muted-foreground py-2">
                        + {months[0] - 3} more installments
                    </div>
                )}
            </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
            <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(129,140,248,0.3)] flex items-center justify-center gap-2">
                Update Schedule <ChevronRight className="w-5 h-5" />
            </Button>
            <p className="text-[10px] text-center text-muted-foreground mt-3">
                By updating, you agree to the new repayment terms. Interest rate: {interestRate}% APR.
            </p>
        </div>

      </main>
    </div>
  );
}