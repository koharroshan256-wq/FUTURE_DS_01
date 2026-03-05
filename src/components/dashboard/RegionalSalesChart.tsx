import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface RegionalSalesChartProps {
  data: { region: string; revenue: number; orders: number; profit: number }[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" }).format(value);

export function RegionalSalesChart({ data }: RegionalSalesChartProps) {
  return (
    <div className="chart-container">
      <h3 className="section-title mb-4">Regional Sales Performance</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="region" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} tickFormatter={formatCurrency} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: 13,
              }}
              formatter={(value: number) => [formatCurrency(value)]}
            />
            <Legend />
            <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={[6, 6, 0, 0]} name="Revenue" />
            <Bar dataKey="profit" fill="hsl(var(--chart-2))" radius={[6, 6, 0, 0]} name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
