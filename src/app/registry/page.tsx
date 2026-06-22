"use client";

import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Building2, Plus } from "lucide-react";
import { getPropertyCount, getProperty, submitTransaction } from "@/lib/soroban";
import { nativeToScVal } from "@stellar/stellar-sdk";

export default function Registry() {
  const { address, isConnected } = useWallet();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isListingOpen, setIsListingOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [rent, setRent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const count = await getPropertyCount();
      const props = [];
      for (let i = 1; i <= count; i++) {
        try {
          const prop = await getProperty(i);
          if (prop) {
             // prop is an array/map depending on how rust struct is serialized, 
             // but we'll safely try to extract
             props.push({ id: i, ...prop });
          }
        } catch (e) {
          console.error(e);
        }
      }
      setProperties(props);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleListProperty = async () => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }
    if (!title || !rent) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      toast.loading("Submitting transaction...", { id: "list_tx" });
      
      const args = [
        nativeToScVal(address, { type: "address" }),
        nativeToScVal(title, { type: "string" }),
        nativeToScVal(Number(rent), { type: "i128" })
      ];

      const hash = await submitTransaction("list_property", args, address);
      
      toast.success("Property listed successfully!", { id: "list_tx" });
      setIsListingOpen(false);
      fetchProperties();
    } catch (error: any) {
      toast.error(error.message || "Failed to list property", { id: "list_tx" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Property Registry</h1>
          <p className="text-muted-foreground mt-1">Browse and list properties on the Soroban smart contract.</p>
        </div>
        
        <Dialog open={isListingOpen} onOpenChange={setIsListingOpen}>
          <DialogTrigger render={<Button className="gap-2" />}>
            <Plus className="h-4 w-4" /> List Property
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>List a New Property</DialogTitle>
              <DialogDescription>
                Add your real estate to the decentralized registry.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input id="title" placeholder="e.g. 2BHK Apartment in NY" className="col-span-3" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rent" className="text-right">Rent / Month</Label>
                <Input id="rent" type="number" placeholder="1000" className="col-span-3" value={rent} onChange={(e) => setRent(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleListProperty} disabled={isSubmitting || !isConnected}>
                {isSubmitting ? "Submitting..." : "List Property"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
             <Card key={i} className="animate-pulse h-48 bg-muted/20" />
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20 bg-muted/10 rounded-xl border border-dashed">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Properties Listed</h3>
          <p className="text-muted-foreground">Be the first to list a property on the registry.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {properties.map((p) => (
            <Card key={p.id}>
              <CardHeader>
                <CardTitle>{p.title || `Property #${p.id}`}</CardTitle>
                <CardDescription>ID: {p.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{p.rent_amount ? p.rent_amount.toString() : "N/A"} XLM<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="secondary">Request Agreement</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
