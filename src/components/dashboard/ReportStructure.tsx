import { FileText, CheckCircle, AlertCircle } from "lucide-react";

export function ReportStructure() {
  const sections = [
    { title: "1. Executive Summary", items: ["Key findings overview", "Revenue & profit highlights", "Top 3 recommendations"] },
    { title: "2. Data Overview & Methodology", items: ["Dataset description (rows, columns, time range)", "Data cleaning steps performed", "Tools & techniques used"] },
    { title: "3. KPI Summary", items: ["Total Revenue, Orders, Profit, AOV", "Sales Growth Rate (MoM, YoY)", "Comparative benchmarks"] },
    { title: "4. Trend Analysis", items: ["Monthly/quarterly revenue trends", "Seasonality patterns", "Year-over-year comparison"] },
    { title: "5. Product Analysis", items: ["Top 5 products by revenue & profit", "Product performance matrix", "Underperforming products"] },
    { title: "6. Category Analysis", items: ["Category contribution breakdown", "Margin analysis by category", "Growth opportunities"] },
    { title: "7. Regional Performance", items: ["Region-wise revenue comparison", "Market penetration insights", "Regional growth potential"] },
    { title: "8. Recommendations", items: ["Actionable business strategies", "Prioritized by impact & effort", "Implementation timeline"] },
    { title: "9. Appendix", items: ["Raw data tables", "Detailed methodology", "Additional charts"] },
  ];

  return (
    <div className="chart-container">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="section-title">Client-Ready Report Structure</h3>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {sections.map((section, i) => (
          <div key={i} className="insight-card">
            <h4 className="font-semibold text-sm mb-2">{section.title}</h4>
            <ul className="space-y-1">
              {section.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle className="h-3 w-3 mt-0.5 text-kpi-orders flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
