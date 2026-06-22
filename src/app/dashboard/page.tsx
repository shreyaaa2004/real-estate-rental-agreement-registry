"use client";

import { useWallet } from "@/hooks/useWallet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActivityFeed } from "@/components/ActivityFeed";
import { Wallet, Key, Network, ArrowRight, Building, FileSignature } from "lucide-react";
import { CONTRACT_ID } from "@/lib/config";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const { address, isConnected, connect } = useWallet();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (isConnected) {
      setEvents([
        { id: "1", type: "Agreement Created", address: address || "G...", propertyId: 1, timestamp: new Date(Date.now() - 1000 * 60 * 5) },
        { id: "2", type: "Property Listed", address: address || "G...", propertyId: 1, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
      ] as any);
    } else {
      setEvents([]);
    }
  }, [isConnected, address]);

  if (!isConnected || !address) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-grid-pattern overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center max-w-lg text-center animate-in fade-in slide-in-from-bottom-4 duration-700 p-8 rounded-3xl bg-card/30 backdrop-blur-md border border-border/50 shadow-2xl">
          <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20">
            <Wallet className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-foreground">Connect your wallet</h2>
          <p className="text-muted-foreground mb-8 text-base">
            Securely connect your Freighter wallet to access your smart contract dashboard, manage properties, and sign agreements on the Stellar network.
          </p>
          <Button size="lg" className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold group" onClick={connect}>
            Connect Freighter
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your connected wallet and smart contract assets.</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:border-primary/30 transition-colors shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Key className="h-4 w-4 text-primary" /> Connected Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-medium tracking-tight truncate text-foreground" title={address}>
              {address.slice(0, 8)}...{address.slice(-8)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:border-primary/30 transition-colors shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Network className="h-4 w-4 text-primary" /> Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <div className="text-xl font-medium tracking-tight text-foreground">Stellar Testnet</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:border-primary/30 transition-colors shadow-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <FileSignature className="w-16 h-16" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileSignature className="h-4 w-4 text-primary" /> Contract ID
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-mono tracking-tight truncate text-foreground" title={CONTRACT_ID}>
              {CONTRACT_ID}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
           <Card className="bg-card/40 backdrop-blur-sm border-border/50 shadow-none">
            <CardHeader>
              <CardTitle>My Properties & Agreements</CardTitle>
              <CardDescription>Manage your real estate listings and rental agreements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16 text-muted-foreground bg-background/50 rounded-2xl border border-dashed border-border/60">
                <Building className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium text-foreground mb-2">No active assets</h3>
                <p className="max-w-sm mx-auto mb-6">You don't have any properties listed or active rental agreements on this address yet.</p>
                <Link href="/registry">
                  <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6">
                    Go to Registry
                  </Button>
                </Link>
              </div>
            </CardContent>
           </Card>
        </div>
        <div className="md:col-span-1">
          <div className="h-full">
            <ActivityFeed events={events} />
          </div>
        </div>
      </div>
    </div>
  );
}
