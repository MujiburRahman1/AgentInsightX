import { useCallback, useMemo, useRef, useState } from "react";
import { AIFlowCanvas, type EditHistory } from "@/components/sandbox/AIFlowCanvas";
import { MetricChart, type MetricPoint } from "@/components/sandbox/MetricChart";
import { ActionTimeline, type ActionItem } from "@/components/sandbox/ActionTimeline";
import { EditHistory as EditHistoryComponent } from "@/components/sandbox/EditHistory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import VendorAnalytics from "@/components/sandbox/VendorAnalytics";
import VendorList from "@/components/sandbox/VendorList";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BranchCompare, { type BranchTimePoint } from "@/components/sandbox/BranchCompare";
import RuleBuilder, { type ComplianceRule } from "@/components/sandbox/RuleBuilder";

const Index = () => {
  const [metrics, setMetrics] = useState<MetricPoint[]>([]);
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [editHistory, setEditHistory] = useState<EditHistory[]>([]);
  const tick = useRef(1);
  const [chatText, setChatText] = useState("");
  const [chatQuery, setChatQuery] = useState<string | undefined>(undefined);
  const [chatVersion, setChatVersion] = useState(0);
  const [rules, setRules] = useState<ComplianceRule[]>([]);

  const handleStepChange = useCallback((id: string, payload: { label: string; param: number; correctness: number }) => {
    const ts = new Date().toLocaleTimeString();
    setActions((a) => [
      { id: `${Date.now()}`, ts, stepId: id.replace("n", "#"), label: `${payload.label} updated`, value: payload.correctness },
      ...a,
    ].slice(0, 40));
    toast({ title: "Step updated", description: `${payload.label}: ${Math.round(payload.correctness)}%` });
  }, []);

  const handleInspect = useCallback((info: { id: string; label: string; param: number; correctness: number }) => {
    toast({ title: `Inspect • ${info.label}`, description: `Param: ${info.param} | Correctness: ${Math.round(info.correctness)}%` });
  }, []);

  const reset = useCallback(() => {
    setMetrics([]);
    setActions([]);
    setEditHistory([]);
    setChatQuery(undefined);
    setChatText("");
    tick.current = 1;
  }, []);

  const submitChat = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatText.trim()) return;
    setChatQuery(chatText.trim());
    setChatVersion((v) => v + 1);
  }, [chatText]);

  const onPointerMove = useCallback((e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--pointer-x", `${e.clientX - rect.left}px`);
    target.style.setProperty("--pointer-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <main className="min-h-screen py-10">
      <div className="container">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">AgentInsightX</h1>
            <p className="text-muted-foreground mt-1">Visualize, inspect, and replay AI decision-making steps. Vendor analytics powered by GPT-5.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary">Backend Connected</Button>
            <Button variant="outline">Mock Data (Active)</Button>
            <Button variant="hero" onClick={reset}>Reset sandbox</Button>
          </div>
        </header>

        <section className="mb-6" onMouseMove={onPointerMove}>
          <form className="mb-3 flex items-center gap-2" onSubmit={submitChat} aria-label="Ask a question">
            <Input
              placeholder="Find the best paint vendors in Wyoming who are highly compliant with regulations, climate-friendly, and within budget."
              value={chatText}
              onChange={(e) => setChatText(e.target.value)}
            />
            <Button type="submit">Send</Button>
          </form>
          <AIFlowCanvas 
            onStepChange={handleStepChange} 
            onInspect={handleInspect} 
            onHistoryUpdate={setEditHistory}
            onTimeDataUpdate={setMetrics}
            onReset={() => {
              setMetrics([]);
              setActions([]);
              setEditHistory([]);
            }}
            chatQuery={chatQuery} 
            chatVersion={chatVersion} 
          />
        </section>

        <Tabs defaultValue="workflow" className="mt-2">
          <TabsList>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="workflow">
            <Card className="p-4 text-sm text-muted-foreground">Use the canvas above to edit steps and view results.</Card>
          </TabsContent>
          <TabsContent value="metrics">
            <MetricChart data={metrics} />
          </TabsContent>
          <TabsContent value="timeline">
            <ActionTimeline items={actions} />
          </TabsContent>
          <TabsContent value="history">
            <EditHistoryComponent history={editHistory} />
          </TabsContent>
          <TabsContent value="analytics">
            <div className="space-y-6">
              <VendorAnalytics />
              <Card className="p-4">
                <div className="text-lg font-semibold mb-3">Found Vendors</div>
                <VendorList />
              </Card>
              <BranchCompare data={metrics as unknown as BranchTimePoint[]} />
              <RuleBuilder rules={rules} onChange={setRules} />
            </div>
          </TabsContent>
        </Tabs>

        <footer className="mt-10">
          <Card className="p-4 text-sm text-muted-foreground">
            Tip: Adjust node parameters above to see correctness evolve in the chart and actions populate in the timeline.
          </Card>
        </footer>
      </div>
    </main>
  );
};

export default Index;
