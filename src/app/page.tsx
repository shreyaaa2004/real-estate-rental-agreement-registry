import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background bg-grid-pattern">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center pt-20 pb-16 px-4">
        <div className="max-w-4xl text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm mb-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">Stellar Soroban Testnet Ready</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-foreground leading-[1.1]">
            Powerful smart contracts.<br />
            <span className="text-foreground/50">Simple renting.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto pt-2 pb-6">
            Decentralized real estate agreements — from standard residential leases to large commercial properties.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            <Link href="/registry">
              <Button size="lg" className="h-14 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold group text-base shadow-lg shadow-foreground/10">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 text-foreground font-semibold text-base">
                Read Documentation
              </Button>
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left w-full mt-8">
            
            {/* Card 1 */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 flex flex-col hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xl">👀</span>
                </div>
                <h3 className="text-xl font-medium text-foreground">Explorer</h3>
              </div>
              <div className="text-5xl font-bold text-foreground mb-2">Free</div>
              <p className="text-muted-foreground text-sm mb-8">View all listed properties on the ledger</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-foreground/80"><Check className="h-4 w-4 text-primary" /> View Property details</li>
                <li className="flex items-center gap-3 text-sm text-foreground/80"><Check className="h-4 w-4 text-primary" /> Track Agreement history</li>
              </ul>
              
              <Link href="/registry" className="mt-auto">
                <Button className="w-full rounded-xl h-12 bg-muted text-foreground hover:bg-muted/80">Browse Registry</Button>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-card/80 backdrop-blur-md border border-primary/40 shadow-[0_0_40px_rgba(var(--primary),0.15)] rounded-3xl p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-xl">✨</span>
                  </div>
                  <h3 className="text-xl font-medium text-foreground">Standard</h3>
                </div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">Most popular</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-bold text-foreground">10</span>
                <span className="text-muted-foreground text-lg">XLM</span>
              </div>
              <p className="text-muted-foreground text-sm mb-8">Create and list a new rental property</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-foreground/80"><Check className="h-4 w-4 text-primary" /> Everything in Explorer</li>
                <li className="flex items-center gap-3 text-sm text-foreground/80"><Check className="h-4 w-4 text-primary" /> Deploy Agreements</li>
                <li className="flex items-center gap-3 text-sm text-foreground/80"><Check className="h-4 w-4 text-primary" /> Receive Rent directly</li>
              </ul>
              
              <Link href="/dashboard" className="mt-auto">
                <Button className="w-full rounded-xl h-12 bg-primary text-primary-foreground hover:bg-primary/90">Connect Wallet</Button>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 flex flex-col hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xl">🏢</span>
                </div>
                <h3 className="text-xl font-medium text-foreground">Enterprise</h3>
              </div>
              <div className="text-5xl font-bold text-foreground mb-2">Custom</div>
              <p className="text-muted-foreground text-sm mb-8">For agencies and property managers</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-foreground/80"><Check className="h-4 w-4 text-primary" /> Bulk property listing</li>
                <li className="flex items-center gap-3 text-sm text-foreground/80"><Check className="h-4 w-4 text-primary" /> API Access</li>
                <li className="flex items-center gap-3 text-sm text-foreground/80"><Check className="h-4 w-4 text-primary" /> Custom SLA</li>
              </ul>
              
              <Link href="/registry" className="mt-auto">
                <Button className="w-full rounded-xl h-12 bg-muted text-foreground hover:bg-muted/80">Contact Sales</Button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
