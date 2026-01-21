import { Badge } from "./badge";
import type { RiskLevelType } from "@/types/project";
import { riskLabels } from "@/types/project";

interface RiskBadgeProps {
  level: RiskLevelType;
}

export function RiskBadge({ level }: RiskBadgeProps) {
  const variant =
    level === "low" ? "success" : level === "medium" ? "warning" : "danger";

  return <Badge variant={variant}>{riskLabels[level]}</Badge>;
}
