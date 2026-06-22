import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface Event {
  id: string;
  type: "Agreement Created" | "Rent Paid" | "Property Listed" | "Agreement Signed";
  address: string;
  timestamp: Date;
  propertyId: number;
}

export function ActivityFeed({ events }: { events: Event[] }) {
  if (events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
          <CardDescription>Recent contract interactions</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
          <Clock className="h-8 w-8 mb-4 opacity-20" />
          <p>No activity yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
        <CardDescription>Real-time contract events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none flex items-center gap-2">
                  <Badge variant={
                    event.type === "Rent Paid" ? "default" :
                    event.type === "Property Listed" ? "secondary" : "outline"
                  }>
                    {event.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Property #{event.propertyId}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  By: {event.address.slice(0, 5)}...{event.address.slice(-4)}
                </p>
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(event.timestamp, { addSuffix: true })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
