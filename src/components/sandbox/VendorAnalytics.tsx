import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, Pie, PieChart, XAxis, YAxis, CartesianGrid, Legend, Cell } from "recharts";
import data from "../../../synthetic_vendor_data.json";

type Vendor = {
  vendor_name: string;
  geography: string; // "City, ST"
  pricing: string; // e.g., "$25/gallon"
  media_mentions: string[];
  average_rating: number; // 0-5
  highlight_reviews: string[];
};

const COLORS = ["#16a34a", "#ef4444"]; // green / red

export const VendorAnalytics = () => {
  const vendors = data as Vendor[];

  const stats = useMemo(() => {
    const total = vendors.length;
    const avgRating = vendors.reduce((s, v) => s + (v.average_rating || 0), 0) / (total || 1);
    const compliantCount = vendors.filter((v) => (v.average_rating || 0) >= 4).length;
    const complianceRate = total ? (compliantCount / total) * 100 : 0;

    // Category breakdown – synthetic data is paint-only
    const categories = [{ name: "paint", value: total }];

    // Compliance distribution for pie
    const compliance = [
      { name: "Compliant", value: compliantCount },
      { name: "Non-compliant", value: Math.max(0, total - compliantCount) },
    ];

    // Top locations
    const locationCounts = new Map<string, number>();
    vendors.forEach((v) => {
      const city = v.geography?.split(",")[0]?.trim() || "Unknown";
      locationCounts.set(city, (locationCounts.get(city) || 0) + 1);
    });
    const topLocations = Array.from(locationCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return { total, avgRating, complianceRate, categories, compliance, topLocations };
  }, [vendors]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Vendors</div>
          <div className="text-3xl font-bold mt-1">{stats.total}</div>
          <div className="text-xs text-muted-foreground">Across all categories</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Average Rating</div>
          <div className="text-3xl font-bold mt-1">{stats.avgRating.toFixed(1)}</div>
          <div className="text-xs text-muted-foreground">Out of 5.0 stars</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Compliance Rate</div>
          <div className="text-3xl font-bold mt-1">{stats.complianceRate.toFixed(1)}%</div>
          <div className="text-xs text-muted-foreground">Meet compliance standards</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Top Category</div>
          <div className="text-3xl font-bold mt-1">paint</div>
          <div className="text-xs text-muted-foreground">{stats.total} vendors</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="mb-2">
            <div className="text-lg font-semibold">Vendor Categories</div>
          </div>
          <ChartContainer config={{ paint: { label: "paint", color: "hsl(var(--brand))" } }}>
            <BarChart data={stats.categories}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="value" fill="hsl(var(--brand))" />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ChartContainer>
        </Card>

        <Card className="p-4">
          <div className="mb-2">
            <div className="text-lg font-semibold">Compliance Distribution</div>
          </div>
          <ChartContainer config={{ compliant: { label: "Compliant" }, non: { label: "Non-compliant" } }}>
            <PieChart>
              <Pie data={stats.compliance} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                {stats.compliance.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </Card>
      </div>

      <Card className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-lg font-semibold flex items-center gap-2">
            <span>Top Vendor Locations</span>
            <Badge variant="secondary">Top 5</Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {stats.topLocations.map((loc, idx) => (
            <div key={loc.name} className="rounded-md border p-3">
              <div className="text-xs text-muted-foreground">{idx + 1}</div>
              <div className="font-medium">{loc.name}</div>
              <div className="text-xs text-muted-foreground">{loc.count} vendors</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <div className="text-lg font-semibold mb-2">Category Breakdown</div>
        <div className="text-sm">paint</div>
        <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-foreground/80" style={{ width: "97%" }} />
        </div>
        <div className="text-xs text-muted-foreground mt-1 text-right">{stats.total} vendors (approx.)</div>
      </Card>
    </div>
  );
};

export default VendorAnalytics;


