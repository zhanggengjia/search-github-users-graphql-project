import { type Repository } from '@/types';
import { calculatePopularLanguages } from '@/utils';
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const UsedLanguages = ({ repositories }: { repositories: Repository[] }) => {
  const popularLanguages = calculatePopularLanguages(repositories);

  const chartConfig = {
    language: {
      label: 'Language',
      color: '#2563eb',
    },
  } satisfies ChartConfig;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">
        Used Languages
      </h2>
      <ChartContainer config={chartConfig} className="h-100 w-full">
        <LineChart accessibilityLayer data={popularLanguages}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="language" tickLine={false} tickMargin={10} />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="var(--color-language)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default UsedLanguages;
