import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Send, 
  Image as ImageIcon, 
  Mic, 
  Smile,
  Check,
  CheckCheck,
  Signal,
  Wifi,
  Battery
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const FRIENDS = [
  { id: 1, name: "Alex Johnson", avatar: "https://i.pravatar.cc/150?u=1", status: "online", lastMessage: "Hey, did you get the transfer?", time: "10:30 AM", unread: 2 },
  { id: 2, name: "Sarah Williams", avatar: "https://i.pravatar.cc/150?u=2", status: "offline", lastMessage: "Thanks for the dinner! 🍕", time: "Yesterday", unread: 0 },
  { id: 3, name: "Mike Brown", avatar: "https://i.pravatar.cc/150?u=3", status: "online", lastMessage: "Can you send me the invoice?", time: "Yesterday", unread: 0 },
  { id: 4, name: "Emily Davis", avatar: "https://i.pravatar.cc/150?u=4", status: "offline", lastMessage: "See you tomorrow at 9", time: "Oct 24", unread: 0 },
  { id: 5, name: "David Wilson", avatar: "https://i.pravatar.cc/150?u=5", status: "online", lastMessage: "The project is ready 🚀", time: "Oct 23", unread: 1 },
];

const MESSAGES = [
  { id: 1, sender: "them", text: "Hey! How are you doing?", time: "10:00 AM", status: "read" },
  { id: 2, sender: "me", text: "I'm good, just working on the new update. How about you?", time: "10:05 AM", status: "read" },
  { id: 3, sender: "them", text: "Pretty good! Just wanted to check if you received the transfer I sent yesterday.", time: "10:15 AM", status: "read" },
  { id: 4, sender: "me", text: "Yes, I got it. Thanks! 🙏", time: "10:20 AM", status: "read" },
  { id: 5, sender: "them", text: "Awesome. Let me know when we can meet up.", time: "10:25 AM", status: "read" },
  { id: 6, sender: "them", text: "Hey, did you get the transfer?", time: "10:30 AM", status: "delivered" },
];

export default function Chat() {
  const [, setLocation] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState(MESSAGES);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(" AM", "").replace(" PM", ""));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedChat) {
      scrollToBottom();
    }
  }, [selectedChat, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: "me",
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  const activeFriend = FRIENDS.find(f => f.id === selectedChat);

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

      {selectedChat ? (
        // Chat Interface
        <div className="flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Chat Header */}
            <header className="sticky top-[44px] z-50 bg-black/80 backdrop-blur-lg border-b border-white/5 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full text-muted-foreground hover:text-white -ml-2"
                        onClick={() => setSelectedChat(null)}
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Avatar className="w-9 h-9 border border-white/10">
                                <AvatarImage src={activeFriend?.avatar} />
                                <AvatarFallback>{activeFriend?.name[0]}</AvatarFallback>
                            </Avatar>
                            {activeFriend?.status === "online" && (
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black" />
                            )}
                        </div>
                        <div>
                            <div className="font-bold text-sm text-white">{activeFriend?.name}</div>
                            <div className="text-[10px] text-muted-foreground">{activeFriend?.status === "online" ? "Online" : "Offline"}</div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                        <Phone className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                        <Video className="w-5 h-5" />
                    </Button>
                </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-black to-[#0a0a0a]">
                <div className="text-center text-xs text-muted-foreground py-4">Today</div>
                
                {messages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={cn(
                            "flex mb-4",
                            msg.sender === "me" ? "justify-end" : "justify-start"
                        )}
                    >
                        <div 
                            className={cn(
                                "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm relative shadow-sm",
                                msg.sender === "me" 
                                    ? "bg-primary text-white rounded-tr-none" 
                                    : "bg-[#2c2c2e] text-white rounded-tl-none border border-white/5"
                            )}
                        >
                            {msg.text}
                            <div className={cn(
                                "text-[10px] flex items-center justify-end gap-1 mt-1",
                                msg.sender === "me" ? "text-white/70" : "text-muted-foreground"
                            )}>
                                {msg.time}
                                {msg.sender === "me" && (
                                    <span>
                                        {msg.status === "read" ? <CheckCheck className="w-3 h-3 text-blue-200" /> : <Check className="w-3 h-3" />}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-3 bg-black/90 border-t border-white/10 backdrop-blur-lg flex items-center gap-3">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white shrink-0">
                    <ImageIcon className="w-6 h-6" />
                </Button>
                <div className="flex-1 relative">
                    <Input 
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type a message..." 
                        className="bg-[#1c1c1e] border-white/10 text-white rounded-full pl-4 pr-10 h-10 focus-visible:ring-primary/50"
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-white"
                    >
                        <Smile className="w-5 h-5" />
                    </Button>
                </div>
                {messageInput.trim() ? (
                     <Button 
                        size="icon" 
                        className="rounded-full bg-primary hover:bg-primary/90 text-white shrink-0 shadow-[0_0_10px_rgba(129,140,248,0.5)]"
                        onClick={handleSendMessage}
                    >
                        <Send className="w-5 h-5 ml-0.5" />
                    </Button>
                ) : (
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white shrink-0">
                        <Mic className="w-6 h-6" />
                    </Button>
                )}
            </div>
        </div>
      ) : (
        // Chat List
        <>
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
                    <h1 className="text-lg font-bold tracking-tight">Chats</h1>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                    <MoreVertical className="w-5 h-5" />
                </Button>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search chats..." className="pl-9 bg-[#1c1c1e] border-white/10 text-white rounded-xl h-11" />
                </div>

                <div className="space-y-1">
                    {FRIENDS.map((friend) => (
                        <div 
                            key={friend.id}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors active:scale-[0.98]"
                            onClick={() => setSelectedChat(friend.id)}
                        >
                            <div className="relative">
                                <Avatar className="w-12 h-12 border border-white/10">
                                    <AvatarImage src={friend.avatar} />
                                    <AvatarFallback>{friend.name[0]}</AvatarFallback>
                                </Avatar>
                                {friend.status === "online" && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="font-semibold text-white truncate">{friend.name}</h3>
                                    <span className="text-xs text-muted-foreground shrink-0">{friend.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className={cn(
                                        "text-sm truncate pr-2",
                                        friend.unread > 0 ? "text-white font-medium" : "text-muted-foreground"
                                    )}>
                                        {friend.lastMessage}
                                    </p>
                                    {friend.unread > 0 && (
                                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                                            {friend.unread}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
      )}
    </div>
  );
}