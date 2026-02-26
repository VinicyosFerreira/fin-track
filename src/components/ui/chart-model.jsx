import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { generateFinancialMix } from '@/helpers/financial-mix';

import LegendItems from '../legend-items';

const chartConfig = {
  percentage: {
    label: 'Percentage',
  },
  earnings: {
    label: 'Receitas',
    color: 'hsl(var(--chart-2))',
  },
  expenses: {
    label: 'Gastos',
    color: 'hsl(var(--chart-5))',
  },
  investments: {
    label: 'Investimentos',
    color: 'hsl(var(--chart-1))',
  },
};

export function ChartPieDonutText({ data }) {
  const chartData = useMemo(() => {
    if (
      Number(data.earnings) === 0 &&
      Number(data.expenses) === 0 &&
      Number(data.investments) === 0
    ) {
      return [];
    }

    return generateFinancialMix(data);
  }, [data]);

  if (chartData.length === 0 || !chartData) {
    return null;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-center">Composição Financeira</CardTitle>
      </CardHeader>

      <CardContent className="flex max-h-[300px] min-h-[250px] items-center justify-center p-3 lg:flex-row">
        <ChartContainer
          config={chartConfig}
          className="aspect-square h-full w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="type"
                  valueKey="percentage"
                />
              }
            />
            {JSON.stringify(chartData)}
            <Pie
              data={chartData}
              dataKey="percentage"
              nameKey="type"
              outerRadius={75}
              innerRadius={60}
              strokeWidth={3}
            >
              <Label
                content={({ viewBox }) => {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      ></tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      ></tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="space-y-2">
          <LegendItems
            item={chartData[0]}
            icon={<TrendingUpIcon className="text-primary-green" />}
          />
          <LegendItems
            item={chartData[1]}
            icon={<TrendingDownIcon className="text-primary-red" />}
          />
          <LegendItems
            item={chartData[2]}
            icon={<PiggyBankIcon className="text-primary-blue" />}
          />
        </div>
      </CardContent>
    </Card>
  );
}
