import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface RevenueChartProps {
  data: { month: string; revenue: number; profit: number }[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" }).format(value);

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="chart-container">
      <h3 className="section-title mb-4">Revenue & Profit Trends</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(v) => {
                const [y, m] = v.split("-");
                return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(m)-1]} ${y.slice(2)}`;
              }}
            />
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
            <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2.5} dot={false} name="Revenue" />
            <Line type="monotone" dataKey="profit" stroke="hsl(var(--chart-2))" strokeWidth={2.5} dot={false} name="Profit" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
