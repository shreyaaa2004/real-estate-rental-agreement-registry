"use client";

import { useWallet } from "@/hooks/useWallet";
import { Button } from "./ui/button";
import Link from "next/link";
import { LayoutDashboard, LogOut, Wallet } from "lucide-react";

export function Navbar() {
  const { address, isConnected, connect, disconnect } = useWallet();

  return (
    <nav className="border-b border-border/40 bg-background/60 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Rental Registry
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/registry">
            <Button variant="ghost">Registry</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" title="Dashboard">
              <LayoutDashboard className="h-5 w-5" />
            </Button>
          </Link>
          
          {isConnected && address ? (
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 px-3 py-1.5 rounded-md text-sm font-medium border border-primary/20 flex items-center gap-2 text-primary">
                <Wallet className="h-4 w-4" />
                {address.slice(0, 5)}...{address.slice(-4)}
              </div>
              <Button variant="outline" size="icon" className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors" onClick={disconnect} title="Disconnect">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button onClick={connect}>Connect Wallet</Button>
          )}
        </div>
      </div>
    </nav>
  );
}
