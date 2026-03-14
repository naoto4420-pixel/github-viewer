export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
}

export interface GitHubUser {
  login: string;
  id: number;
  html_url: string;
  avatar_url: string;
  public_repos: number;
}

interface UserCardProps {
  user: GitHubUser;
  repos: GitHubRepo[];
}

const UserCard = ({ user, repos }: UserCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm border border-gray-200">
      <img 
        src={user.avatar_url} 
        alt={`${user.login}のアイコン`} 
        className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-200 object-cover" 
      />
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">ユーザー名:</span> {user.login}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">ID:</span> {user.id}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">URL:</span>{' '}
        <a 
          href={user.html_url} 
          target="_blank" 
          rel="noreferrer"
          className="text-blue-500 hover:text-blue-700 hover:underline transition-colors"
        >
          {user.html_url}
        </a>
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">公開リポジトリ数:</span> {user.public_repos}
      </p>
      
      <div className="border-t border-gray-200 pt-4">
        <h2 className="text-lg font-bold text-gray-800 mb-3">最新リポジトリ (上位3件)</h2>
        {repos.length > 0 ? (
          <ul className="space-y-3">
            {repos.map((repo) => (
              <li key={repo.id} className="bg-gray-50 p-3 rounded border border-gray-200 hover:bg-gray-100 transition-colors">
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-blue-600 font-semibold hover:underline block truncate">
                  {repo.name}
                </a>
                <p className="text-sm text-gray-500 mt-1">⭐ Star: {repo.stargazers_count}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">公開リポジトリがありません。</p>
        )}
      </div>
    </div>
  );
};

export default UserCard;