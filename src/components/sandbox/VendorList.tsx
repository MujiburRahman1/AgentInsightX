import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import data from "../../../synthetic_vendor_data.json";
import { Sheet, SheetContent } from "@/components/ui/sheet";

type Vendor = {
  vendor_name: string;
  geography: string;
  pricing: string;
  media_mentions: string[];
  average_rating: number;
  highlight_reviews: string[];
};

function parsePriceUSD(s: string): number | null {
  const m = s.match(/\$([0-9]+(?:\.[0-9]+)?)/);
  return m ? Number(m[1]) : null;
}

export const VendorList = () => {
  const vendors = data as Vendor[];
  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [location, setLocation] = useState("");
  const [compliantOnly, setCompliantOnly] = useState(false);

  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      if (query && !v.vendor_name.toLowerCase().includes(query.toLowerCase())) return false;
      if (location && !v.geography.toLowerCase().includes(location.toLowerCase())) return false;
      if (v.average_rating < minRating) return false;
      const price = parsePriceUSD(v.pricing || "");
      if (price !== null && price > maxPrice) return false;
      if (compliantOnly && v.average_rating < 4) return false;
      return true;
    });
  }, [vendors, query, minRating, maxPrice, location, compliantOnly]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input placeholder="Search vendors by name, location, or keywords..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <Button onClick={() => { /* no-op, reactive filters */ }}>Search</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Min Rating</div>
          <Input type="number" min={0} max={5} value={minRating} onChange={(e) => setMinRating(Number(e.target.value || 0))} />
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Max Price</div>
          <Input type="number" min={0} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value || 0))} />
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Location</div>
          <Input placeholder="e.g., Wyoming" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <label className="flex items-center gap-2 text-sm mt-6">
          <Checkbox checked={compliantOnly} onCheckedChange={(v) => setCompliantOnly(Boolean(v))} />
          Compliant Only
        </label>
      </div>
      <div className="text-sm text-muted-foreground">Found {filtered.length} vendors</div>
      <div className="space-y-3">
        {filtered.map((v) => {
          const price = parsePriceUSD(v.pricing || "");
          const compliant = v.average_rating >= 4;
          return (
            <Card key={v.vendor_name} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{v.vendor_name}</div>
                  <div className="text-xs text-muted-foreground">{v.geography}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={compliant ? "default" : "secondary"}>{compliant ? "Compliant" : "Review"}</Badge>
                  <div className="text-sm">⭐ {v.average_rating.toFixed(1)}</div>
                </div>
              </div>
              <div className="mt-2 text-sm">{price !== null ? `$${price.toFixed(2)}` : v.pricing}</div>
              {v.highlight_reviews?.[0] && (
                <div className="mt-2 text-sm italic text-muted-foreground">"{v.highlight_reviews[0]}"</div>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                {v.media_mentions?.slice(0, 3).map((m) => (
                  <Badge key={m} variant="outline">{m}</Badge>
                ))}
              </div>
              <div className="mt-3">
                <VendorProfileButton vendor={v} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default VendorList;

function VendorProfileButton({ vendor }: { vendor: Vendor }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>View Profile</Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[360px] sm:w-[420px]">
          <div className="space-y-3">
            <div className="text-lg font-semibold">{vendor.vendor_name}</div>
            <div className="text-sm text-muted-foreground">{vendor.geography}</div>
            <div className="text-sm">Price: {vendor.pricing}</div>
            <div className="text-sm">Rating: ⭐ {vendor.average_rating.toFixed(1)}</div>
            <div>
              <div className="text-sm font-medium mb-1">Media Mentions</div>
              <div className="flex flex-wrap gap-2">
                {vendor.media_mentions?.map((m) => (
                  <Badge key={m} variant="outline">{m}</Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Highlighted Reviews</div>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {vendor.highlight_reviews?.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="text-xs text-muted-foreground">
              Attached Docs: Sample vendor brochure, compliance certificate (mock)
            </div>
            <div>
              <Button variant="outline" onClick={() => window.print()}>Export as PDF</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}


