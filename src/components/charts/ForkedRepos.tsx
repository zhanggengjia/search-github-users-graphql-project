import type { Repository } from '@/types';
import { calculateMostForkedRepos } from '@/utils';
import { type ChartConfig } from '@/components/ui/chart';
import GenericChart, { type ChartMode } from './GenericChart';

type ForkedReposProps = {
  repositories: Repository[];
  mode: ChartMode;
};

const ForkedRepos = ({ repositories, mode }: ForkedReposProps) => {
  const mostForkedRepos = calculateMostForkedRepos(repositories);

  const chartConfig = {
    repo: {
      label: 'Repository',
      color: '#facd12',
    },
  } satisfies ChartConfig;

  return (
    <GenericChart
      title="Forked Repos"
      mode={mode}
      data={mostForkedRepos}
      xKey="repo"
      yKey="count"
      config={chartConfig}
      colorCssVar="var(--color-repo)"
      xTickFormatter={(value: string) => value.slice(0, 10)}
    />
  );
};

export default ForkedRepos;
