import { type Repository } from '@/types';
import { calculateMostStarredRepos } from '@/utils';
import { type ChartConfig } from '@/components/ui/chart';
import GenericChart, { type ChartMode } from './GenericChart';

type PopularReposProps = {
  repositories: Repository[];
  mode: ChartMode;
};

const PopularRepos = ({ repositories, mode }: PopularReposProps) => {
  const popularRepos = calculateMostStarredRepos(repositories);

  const chartConfig = {
    repo: {
      label: 'Repository',
      color: '#e11c47',
    },
  } satisfies ChartConfig;

  return (
    <GenericChart
      title="Popular Repos"
      mode={mode}
      data={popularRepos}
      xKey="repo"
      yKey="stars"
      config={chartConfig}
      colorCssVar="var(--color-repo)"
      xTickFormatter={(value: string) => value.slice(0, 10)}
    />
  );
};

export default PopularRepos;
