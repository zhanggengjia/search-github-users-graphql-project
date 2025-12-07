import { type Repository } from '@/types';
import { calculatePopularLanguages } from '@/utils';
import { type ChartConfig } from '@/components/ui/chart';
import GenericChart, { type ChartMode } from './GenericChart';

type UsedLanguagesProps = {
  repositories: Repository[];
  mode: ChartMode;
};

const UsedLanguages = ({ repositories, mode }: UsedLanguagesProps) => {
  const popularLanguages = calculatePopularLanguages(repositories);

  const chartConfig = {
    language: {
      label: 'Language',
      color: '#2563eb',
    },
  } satisfies ChartConfig;

  return (
    <GenericChart
      title="Used Languages"
      mode={mode}
      data={popularLanguages}
      xKey="language"
      yKey="count"
      config={chartConfig}
      colorCssVar="var(--color-language)"
    />
  );
};

export default UsedLanguages;
