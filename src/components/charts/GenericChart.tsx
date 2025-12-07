import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

// 統一定義你要支援的圖表模式
export type ChartMode = 'bar' | 'line' | 'pie' | 'area' | 'radar';

type GenericChartProps = {
  title: string;
  mode: ChartMode;
  data: any[];
  xKey: string; // x 軸 / 名稱欄位，例如 'language' 或 'repo'
  yKey: string; // 數值欄位，例如 'count' 或 'stars'
  config: ChartConfig; // 給 ChartContainer 用的設定
  colorCssVar?: string; // 例如 'var(--color-repo)' 或 'var(--color-language)'
  xTickFormatter?: (value: any) => string; // 例如 repo 截斷用
};

const GenericChart = ({
  title,
  mode,
  data,
  xKey,
  yKey,
  config,
  colorCssVar,
  xTickFormatter,
}: GenericChartProps) => {
  // 如果沒傳 colorCssVar，就從 config 的第一個 key 推一個預設
  const fallbackKey = Object.keys(config)[0];
  const color = colorCssVar ?? `var(--color-${fallbackKey})`;

  const renderChart = () => {
    switch (mode) {
      case 'line':
        return (
          <LineChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xKey}
              tickLine={false}
              tickMargin={10}
              tickFormatter={xTickFormatter}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey={yKey}
              stroke={color}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xKey}
              tickLine={false}
              tickMargin={10}
              tickFormatter={xTickFormatter}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey={yKey} fill={color} radius={4} />
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={data}
              dataKey={yKey}
              nameKey={xKey}
              outerRadius={80}
              fill={color}
              label
            />
          </PieChart>
        );

      case 'area':
        return (
          <AreaChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xKey}
              tickLine={false}
              tickMargin={10}
              tickFormatter={xTickFormatter}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area dataKey={yKey} fill={color} stroke={color} strokeWidth={2} />
          </AreaChart>
        );

      case 'radar':
        return (
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={xKey} />
            <PolarRadiusAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Radar
              dataKey={yKey}
              stroke={color}
              fill={color}
              fillOpacity={0.6}
            />
          </RadarChart>
        );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>
      <ChartContainer config={config} className="h-100 w-full">
        {renderChart()}
      </ChartContainer>
    </div>
  );
};

export default GenericChart;
