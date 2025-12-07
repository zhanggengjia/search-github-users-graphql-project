import { useState } from 'react';
import { GET_USER } from '@/queries';
import { type UserData } from '@/types';
import { useQuery } from '@apollo/client/react';
import UserCard from './UserCard';
import StatsContainer from './StatsContainer';
import ForkedRepos from '../charts/ForkedRepos';
import PopularRepos from '../charts/PopularRepos';
import UsedLanguages from '../charts/UsedLanguages';
import Loading from './Loading';
import type { ChartMode } from '../charts/GenericChart';

type UserProfileProps = {
  userName: string;
};

const chartModes: ChartMode[] = ['bar', 'line', 'pie', 'area', 'radar'];

const UserProfile = ({ userName }: UserProfileProps) => {
  const { data, loading, error } = useQuery<UserData>(GET_USER, {
    variables: { login: userName },
  });

  const [chartMode, setChartMode] = useState<ChartMode>('bar');

  if (loading) return <Loading />;
  if (error) return <h2 className="text-xl">{error.message}</h2>;
  if (!data) return <h2 className="text-xl">User Not Found.</h2>;

  const {
    avatarUrl,
    name,
    bio,
    url,
    repositories,
    followers,
    following,
    gists,
  } = data.user;

  return (
    <>
      <UserCard avatarUrl={avatarUrl} name={name} bio={bio} url={url} />
      <StatsContainer
        totalRepos={repositories.totalCount}
        followers={followers.totalCount}
        following={following.totalCount}
        gists={gists.totalCount}
      />

      {/* 圖表模式切換按鈕 */}
      <div className="flex gap-2 my-4 justify-center flex-wrap">
        {chartModes.map((mode) => (
          <button
            key={mode}
            onClick={() => setChartMode(mode)}
            className={`px-4 py-2 rounded border text-sm md:text-base
              ${
                chartMode === mode
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}
          >
            {mode.toUpperCase()}
          </button>
        ))}
      </div>

      {repositories.totalCount > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          <UsedLanguages repositories={repositories.nodes} mode={chartMode} />
          <PopularRepos repositories={repositories.nodes} mode={chartMode} />
          <ForkedRepos repositories={repositories.nodes} mode={chartMode} />
        </div>
      )}
    </>
  );
};

export default UserProfile;
