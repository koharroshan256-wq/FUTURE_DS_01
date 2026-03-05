import { BarChart3 } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { TopProductsChart } from "@/components/dashboard/TopProductsChart";
import { CategoryPieChart } from "@/components/dashboard/CategoryPieChart";
import { RegionalSalesChart } from "@/components/dashboard/RegionalSalesChart";
import { BusinessInsights } from "@/components/dashboard/BusinessInsights";
import { ReportStructure } from "@/components/dashboard/ReportStructure";
import {
  salesData,
  getTotalRevenue,
  getTotalOrders,
  getTotalProfit,
  getAvgOrderValue,
  getMonthlyRevenue,
  getTopProducts,
  getCategoryBreakdown,
  getRegionalSales,
  getSalesGrowthRate,
} from "@/data/salesData";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

const Index = () => {
  const totalRevenue = getTotalRevenue(salesData);
  const totalOrders = getTotalOrders(salesData);
  const totalProfit = getTotalProfit(salesData);
  const avgOrderValue = getAvgOrderValue(salesData);
  const growthRate = getSalesGrowthRate(salesData);
  const monthlyRevenue = getMonthlyRevenue(salesData);
  const topProducts = getTopProducts(salesData);
  const categories = getCategoryBreakdown(salesData);
  const regions = getRegionalSales(salesData);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary p-2">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Sales Performance Analytics</h1>
              <p className="text-sm text-muted-foreground">Business Intelligence Dashboard · 2023–2024</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-mono">{salesData.length.toLocaleString()}</span> records analyzed
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Revenue"
            value={formatCurrency(totalRevenue)}
            subtitle="All-time sales revenue"
            icon="revenue"
            trend={{ value: growthRate, label: "vs last month" }}
          />
          <KPICard
            title="Total Orders"
            value={totalOrders.toLocaleString()}
            subtitle="Completed transactions"
            icon="orders"
          />
          <KPICard
            title="Total Profit"
            value={formatCurrency(totalProfit)}
            subtitle={`${((totalProfit / totalRevenue) * 100).toFixed(1)}% margin`}
            icon="profit"
          />
          <KPICard
            title="Avg Order Value"
            value={formatCurrency(avgOrderValue)}
            subtitle="Revenue per transaction"
            icon="growth"
          />
        </div>

        {/* Revenue Trend */}
        <RevenueChart data={monthlyRevenue} />

        {/* Top Products & Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopProductsChart data={topProducts} />
          <CategoryPieChart data={categories} />
        </div>

        {/* Regional Sales */}
        <RegionalSalesChart data={regions} />

        {/* Business Insights */}
        <BusinessInsights />

        {/* Report Structure */}
        <ReportStructure />

        {/* Footer */}
        <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border">
          Sales Performance Analytics Dashboard · Built for internship project analysis
        </footer>
      </main>
    </div>
  );
};

export default Index;
