import { useMemo } from "react";
import { Card } from "@/components/ui/card";

export type BranchTimePoint = {
  stepId: string;
  stepName: string;
  timeTaken: number;
  timestamp: string;
  branch?: string;
};

interface BranchCompareProps {
  data: BranchTimePoint[];
}

export const BranchCompare = ({ data }: BranchCompareProps) => {
  const summary = useMemo(() => {
    const byBranch = new Map<string, { total: number; steps: number }>();
    data.forEach((d) => {
      const key = d.branch || "Main";
      const curr = byBranch.get(key) || { total: 0, steps: 0 };
      curr.total += d.timeTaken || 0;
      curr.steps += 1;
      byBranch.set(key, curr);
    });

    const rows = Array.from(byBranch.entries()).map(([branch, v]) => ({
      branch,
      total: Number(v.total.toFixed(2)),
      avg: Number((v.total / Math.max(1, v.steps)).toFixed(2)),
      steps: v.steps,
    }));
    rows.sort((a, b) => a.total - b.total);
    return rows;
  }, [data]);

  return (
    <Card className="p-4">
      <div className="text-lg font-semibold mb-2">Branch Comparison</div>
      <div className="text-sm text-muted-foreground mb-3">Compare total and average time per branch</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {summary.map((r) => (
          <div key={r.branch} className="rounded-md border p-3">
            <div className="text-xs text-muted-foreground">Branch</div>
            <div className="font-medium">{r.branch}</div>
            <div className="mt-2 text-xs text-muted-foreground">Steps: {r.steps}</div>
            <div className="mt-1">Total: <span className="font-mono">{r.total}s</span></div>
            <div className="mt-1">Avg/step: <span className="font-mono">{r.avg}s</span></div>
          </div>
        ))}
        {!summary.length && (
          <div className="text-sm text-muted-foreground">No data yet. Run a prompt to initialize branches.</div>
        )}
      </div>
    </Card>
  );
};

export default BranchCompare;


