import { Lightbulb, TrendingUp, Target, Globe, Package, BarChart3 } from "lucide-react";

const insights = [
  {
    icon: TrendingUp,
    title: "Q4 Revenue Surge",
    description: "Sales increase by ~60% during Q4 (Oct-Dec) due to holiday seasonality. Recommendation: Increase inventory and marketing spend 30 days before Q4 to capture maximum demand.",
    priority: "High",
  },
  {
    icon: Package,
    title: "Electronics Dominates Revenue",
    description: "Electronics category contributes the highest revenue share but also has the highest cost base. Consider negotiating volume discounts with suppliers to improve margins by 5-8%.",
    priority: "High",
  },
  {
    icon: Globe,
    title: "Untapped Regional Markets",
    description: "Latin America and Middle East show lower sales volumes but healthy profit margins. Investing in localized marketing could unlock 15-20% revenue growth in these regions.",
    priority: "Medium",
  },
  {
    icon: Target,
    title: "Software Has Best Margins",
    description: "Software products show the highest profit margin (~85%) with minimal COGS. Prioritize upselling software bundles with hardware purchases to boost overall profitability.",
    priority: "High",
  },
  {
    icon: BarChart3,
    title: "Average Order Value Optimization",
    description: "Current AOV can be improved by implementing product bundling strategies. Cross-selling accessories with high-value electronics could increase AOV by 12-18%.",
    priority: "Medium",
  },
  {
    icon: Lightbulb,
    title: "Year-over-Year Growth",
    description: "2024 shows a 15% baseline growth over 2023. Maintain momentum by expanding the product catalog in high-performing categories and improving customer retention programs.",
    priority: "Medium",
  },
];

const priorityStyles = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-kpi-profit/10 text-kpi-profit",
};

export function BusinessInsights() {
  return (
    <div className="chart-container">
      <h3 className="section-title mb-4">📊 Business Insights & Recommendations</h3>
      <div className="grid gap-3">
        {insights.map((insight, i) => (
          <div key={i} className="insight-card flex gap-4">
            <div className="flex-shrink-0 mt-0.5">
              <insight.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-sm">{insight.title}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityStyles[insight.priority as keyof typeof priorityStyles]}`}>
                  {insight.priority}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
