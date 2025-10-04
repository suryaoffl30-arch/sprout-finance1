'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useCurrency } from '@/context/CurrencyContext';

const chartData = [
  { month: 'Jan', expense: 1860, budget: 2200 },
  { month: 'Feb', expense: 3050, budget: 3000 },
  { month: 'Mar', expense: 2370, budget: 2500 },
  { month: 'Apr', expense: 2730, budget: 2800 },
  { month: 'May', expense: 2090, budget: 2400 },
  { month: 'Jun', expense: 2140, budget: 2600 },
];



export default function ExpenseChart() {
  const { currency } = useCurrency();
  const chartConfig = {
    expense: {
      label: 'Expense',
      color: 'hsl(var(--accent))',
    },
    budget: {
      label: 'Budget',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
            <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => `${currency.symbol}${value / 1000}k`}
            />
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="budget" fill="var(--color-budget)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="var(--color-expense)" radius={[4, 4, 0, 0]} />
        </BarChart>
    </ChartContainer>
  );
}
