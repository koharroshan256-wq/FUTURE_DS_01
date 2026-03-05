// Sample Business Sales Dataset
// Simulates 2 years of sales across products, categories, and regions

export interface SalesRecord {
  id: number;
  date: string;
  product: string;
  category: string;
  region: string;
  quantity: number;
  unitPrice: number;
  revenue: number;
  cost: number;
  profit: number;
}

const products: Record<string, { category: string; price: number; cost: number }> = {
  "Laptop Pro 15": { category: "Electronics", price: 1299, cost: 850 },
  "Wireless Mouse": { category: "Electronics", price: 49, cost: 18 },
  "USB-C Hub": { category: "Electronics", price: 79, cost: 32 },
  "Monitor 27\"": { category: "Electronics", price: 549, cost: 320 },
  "Mechanical Keyboard": { category: "Electronics", price: 149, cost: 62 },
  "Office Chair Ergonomic": { category: "Furniture", price: 449, cost: 210 },
  "Standing Desk": { category: "Furniture", price: 699, cost: 350 },
  "Desk Lamp LED": { category: "Furniture", price: 89, cost: 28 },
  "Filing Cabinet": { category: "Furniture", price: 199, cost: 95 },
  "Bookshelf Modern": { category: "Furniture", price: 259, cost: 120 },
  "Printer Paper A4": { category: "Office Supplies", price: 29, cost: 12 },
  "Ink Cartridge Set": { category: "Office Supplies", price: 65, cost: 22 },
  "Sticky Notes Pack": { category: "Office Supplies", price: 12, cost: 3 },
  "Binder Clips Box": { category: "Office Supplies", price: 8, cost: 2 },
  "Whiteboard Markers": { category: "Office Supplies", price: 15, cost: 4 },
  "Project Management Software": { category: "Software", price: 199, cost: 20 },
  "Antivirus License": { category: "Software", price: 79, cost: 8 },
  "Cloud Storage Plan": { category: "Software", price: 120, cost: 15 },
  "Design Suite Pro": { category: "Software", price: 349, cost: 35 },
  "CRM Platform": { category: "Software", price: 499, cost: 50 },
};

const regions = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateSalesData(): SalesRecord[] {
  const records: SalesRecord[] = [];
  const productNames = Object.keys(products);
  let id = 1;
  let seed = 42;

  for (let year = 2023; year <= 2024; year++) {
    for (let month = 1; month <= 12; month++) {
      // Skip future months in 2024
      if (year === 2024 && month > 11) continue;

      const daysInMonth = new Date(year, month, 0).getDate();
      // More orders in Q4 (holiday season)
      const seasonMultiplier = month >= 10 ? 1.6 : month >= 6 ? 1.2 : 1.0;
      // Growth in 2024
      const yearMultiplier = year === 2024 ? 1.15 : 1.0;
      const ordersThisMonth = Math.floor(18 * seasonMultiplier * yearMultiplier);

      for (let o = 0; o < ordersThisMonth; o++) {
        seed++;
        const day = Math.floor(seededRandom(seed) * daysInMonth) + 1;
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        seed++;
        const productName = productNames[Math.floor(seededRandom(seed) * productNames.length)];
        const product = products[productName];

        seed++;
        const region = regions[Math.floor(seededRandom(seed) * regions.length)];

        seed++;
        const quantity = Math.floor(seededRandom(seed) * 10) + 1;

        // Small price variation
        seed++;
        const priceVar = 1 + (seededRandom(seed) - 0.5) * 0.1;
        const unitPrice = Math.round(product.price * priceVar * 100) / 100;
        const revenue = Math.round(unitPrice * quantity * 100) / 100;
        const cost = Math.round(product.cost * quantity * 100) / 100;
        const profit = Math.round((revenue - cost) * 100) / 100;

        records.push({ id: id++, date: dateStr, product: productName, category: product.category, region, quantity, unitPrice, revenue, cost, profit });
      }
    }
  }

  return records;
}

export const salesData = generateSalesData();

// Aggregation helpers
export function getTotalRevenue(data: SalesRecord[]) {
  return data.reduce((sum, r) => sum + r.revenue, 0);
}

export function getTotalOrders(data: SalesRecord[]) {
  return data.length;
}

export function getTotalProfit(data: SalesRecord[]) {
  return data.reduce((sum, r) => sum + r.profit, 0);
}

export function getAvgOrderValue(data: SalesRecord[]) {
  return data.length ? getTotalRevenue(data) / data.length : 0;
}

export function getMonthlyRevenue(data: SalesRecord[]) {
  const map = new Map<string, { revenue: number; profit: number; orders: number }>();
  data.forEach(r => {
    const key = r.date.slice(0, 7); // YYYY-MM
    const existing = map.get(key) || { revenue: 0, profit: 0, orders: 0 };
    existing.revenue += r.revenue;
    existing.profit += r.profit;
    existing.orders += 1;
    map.set(key, existing);
  });
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({ month, ...data }));
}

export function getTopProducts(data: SalesRecord[], limit = 5) {
  const map = new Map<string, number>();
  data.forEach(r => map.set(r.product, (map.get(r.product) || 0) + r.revenue));
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([product, revenue]) => ({ product, revenue }));
}

export function getCategoryBreakdown(data: SalesRecord[]) {
  const map = new Map<string, { revenue: number; orders: number; profit: number }>();
  data.forEach(r => {
    const existing = map.get(r.category) || { revenue: 0, orders: 0, profit: 0 };
    existing.revenue += r.revenue;
    existing.orders += 1;
    existing.profit += r.profit;
    map.set(r.category, existing);
  });
  return Array.from(map.entries())
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .map(([category, data]) => ({ category, ...data }));
}

export function getRegionalSales(data: SalesRecord[]) {
  const map = new Map<string, { revenue: number; orders: number; profit: number }>();
  data.forEach(r => {
    const existing = map.get(r.region) || { revenue: 0, orders: 0, profit: 0 };
    existing.revenue += r.revenue;
    existing.orders += 1;
    existing.profit += r.profit;
    map.set(r.region, existing);
  });
  return Array.from(map.entries())
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .map(([region, data]) => ({ region, ...data }));
}

export function getSalesGrowthRate(data: SalesRecord[]) {
  const monthly = getMonthlyRevenue(data);
  if (monthly.length < 2) return 0;
  const last = monthly[monthly.length - 1].revenue;
  const prev = monthly[monthly.length - 2].revenue;
  return prev ? ((last - prev) / prev) * 100 : 0;
}
