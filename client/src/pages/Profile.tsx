import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Camera,
  User,
  Mail,
  Phone,
  Lock,
  ChevronRight,
  LogOut,
  CreditCard,
  LayoutGrid,
  Send,
  Home as HomeIcon,
  Wifi,
  Signal,
  Battery
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Profile() {
  const [location, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  
  // Mock User Data
  const [user, setUser] = useState({
    name: "John Doe",
    username: "@johndoe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://github.com/shadcn.png"
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
      <header className="sticky top-[44px] z-50 bg-black/80 backdrop-blur-lg border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold tracking-tight">Profile</h1>
        <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full">
            <LogOut className="w-5 h-5" />
        </Button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
        
        {/* Profile Picture */}
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative group cursor-pointer">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/5 shadow-[0_0_30px_rgba(129,140,248,0.3)]">
                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <Camera className="w-8 h-8 text-white drop-shadow-md" />
                </div>
                <div className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg border border-black">
                    <Camera className="w-4 h-4" />
                </div>
            </div>
            <div className="text-center">
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <p className="text-primary font-medium">{user.username}</p>
            </div>
        </div>

        {/* Settings Groups */}
        <div className="space-y-6">
            <div className="bg-card/30 border border-white/5 rounded-2xl overflow-hidden">
                <ProfileItem 
                    icon={User} 
                    label="Username" 
                    value={user.username} 
                    onClick={() => {}} 
                />
                <ProfileItem 
                    icon={Mail} 
                    label="Email" 
                    value={user.email} 
                    onClick={() => {}} 
                />
                <ProfileItem 
                    icon={Phone} 
                    label="Phone Number" 
                    value={user.phone} 
                    onClick={() => {}} 
                />
                <ProfileItem 
                    icon={Lock} 
                    label="Password" 
                    value="••••••••••••" 
                    onClick={() => {}} 
                    isLast
                />
            </div>
        </div>

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
        <NavItem icon={User} label="Profile" active />
      </nav>
    </div>
  );
}

function ProfileItem({ icon: Icon, label, value, onClick, isLast }: { icon: any, label: string, value: string, onClick: () => void, isLast?: boolean }) {
    return (
        <div 
            className={cn(
                "flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors active:bg-white/10 group",
                !isLast && "border-b border-white/5"
            )}
            onClick={onClick}
        >
            <div className="flex items-center gap-4 overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <span className="text-base font-medium text-white truncate pr-2">{value}</span>
                </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors flex-shrink-0" />
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