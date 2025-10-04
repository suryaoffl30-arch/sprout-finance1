'use client';
import * as React from 'react';
import { Pie, PieChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';

const chartData = [
  { category: 'Food', amount: 850, fill: 'var(--color-food)' },
  { category: 'Shopping', amount: 600, fill: 'var(--color-shopping)' },
  { category: 'Transport', amount: 450, fill: 'var(--color-transport)' },
  { category: 'Bills', amount: 980, fill: 'var(--color-bills)' },
  { category: 'Other', amount: 415, fill: 'var(--color-other)' },
];

const chartConfig = {
  amount: {
    label: 'Amount ($)',
  },
  food: {
    label: 'Food',
    color: 'hsl(var(--chart-1))',
  },
  shopping: {
    label: 'Shopping',
    color: 'hsl(var(--chart-2))',
  },
  transport: {
    label: 'Transport',
    color: 'hsl(var(--chart-3))',
  },
  bills: {
    label: 'Bills',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
};

export default function CategoryChart() {
  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="category" />}
        />
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="category"
          innerRadius={60}
          strokeWidth={5}
        >
        </Pie>
        <ChartLegend
            content={<ChartLegendContent nameKey="category" />}
            className="-mt-4 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground text-center"
        >
          <tspan x="50%" dy="-0.6em" className="text-2xl font-bold">
            ${total.toLocaleString()}
          </tspan>
          <tspan x="50%" dy="1.2em" className="text-xs text-muted-foreground">
            Total Spent
          </tspan>
        </text>
      </PieChart>
    </ChartContainer>
  );
}
