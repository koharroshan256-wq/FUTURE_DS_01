import { DollarSign, ShoppingCart, TrendingUp, BarChart3 } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: "revenue" | "orders" | "profit" | "growth";
  trend?: { value: number; label: string };
}

const iconMap = {
  revenue: DollarSign,
  orders: ShoppingCart,
  profit: TrendingUp,
  growth: BarChart3,
};

const colorMap = {
  revenue: "bg-kpi-revenue/10 text-kpi-revenue",
  orders: "bg-kpi-orders/10 text-kpi-orders",
  profit: "bg-kpi-profit/10 text-kpi-profit",
  growth: "bg-kpi-growth/10 text-kpi-growth",
};

export function KPICard({ title, value, subtitle, icon, trend }: KPICardProps) {
  const Icon = iconMap[icon];

  return (
    <div className="kpi-card animate-count-up">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight font-mono">{value}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className={`rounded-lg p-2.5 ${colorMap[icon]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1 text-sm">
          <span className={trend.value >= 0 ? "text-kpi-orders font-semibold" : "text-destructive font-semibold"}>
            {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value).toFixed(1)}%
          </span>
          <span className="text-muted-foreground">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
