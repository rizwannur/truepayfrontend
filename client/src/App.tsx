import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Cards from "@/pages/Cards";
import Deposit from "@/pages/Deposit";
import Send from "@/pages/Send";
import Earn from "@/pages/Earn";
import P2P from "@/pages/P2P";
import Referral from "@/pages/Referral";
import Credit from "@/pages/Credit";
import Swap from "@/pages/Swap";
import More from "@/pages/More";
import CardManage from "@/pages/CardManage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/cards" component={Cards} />
      <Route path="/card-manage" component={CardManage} />
      <Route path="/deposit" component={Deposit} />
      <Route path="/send" component={Send} />
      <Route path="/earn" component={Earn} />
      <Route path="/p2p" component={P2P} />
      <Route path="/referral" component={Referral} />
      <Route path="/credit" component={Credit} />
      <Route path="/swap" component={Swap} />
      <Route path="/more" component={More} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;