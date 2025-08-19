import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type ComplianceRule = {
  id: string;
  field: string; // e.g., average_rating, pricing
  operator: string; // ">=", "<=", "contains"
  value: string; // store as string, parse where needed
};

interface RuleBuilderProps {
  rules: ComplianceRule[];
  onChange: (rules: ComplianceRule[]) => void;
}

export const RuleBuilder = ({ rules, onChange }: RuleBuilderProps) => {
  const [field, setField] = useState("");
  const [operator, setOperator] = useState(">=");
  const [value, setValue] = useState("");

  const addRule = () => {
    if (!field || !operator || !value) return;
    const rule: ComplianceRule = { id: `${Date.now()}`, field, operator, value };
    onChange([rule, ...rules].slice(0, 20));
    setField("");
    setOperator(">=");
    setValue("");
  };

  const removeRule = (id: string) => onChange(rules.filter((r) => r.id !== id));

  return (
    <Card className="p-4">
      <div className="text-lg font-semibold mb-2">Compliance Rule Builder</div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
        <Input placeholder="field (e.g., average_rating, pricing)" value={field} onChange={(e) => setField(e.target.value)} />
        <Input placeholder="operator (>=, <=, contains)" value={operator} onChange={(e) => setOperator(e.target.value)} />
        <Input placeholder="value" value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={addRule}>Add Rule</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {rules.map((r) => (
          <Badge key={r.id} variant="outline">
            {r.field} {r.operator} {r.value}
            <button className="ml-2" onClick={() => removeRule(r.id)}>×</button>
          </Badge>
        ))}
        {!rules.length && <div className="text-sm text-muted-foreground">No rules yet.</div>}
      </div>
    </Card>
  );
};

export default RuleBuilder;


