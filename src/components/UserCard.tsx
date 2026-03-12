export interface GitHubUser {
  login: string;
  id: number;
  html_url: string;
  avatar_url: string;
  public_repos: number;
}

interface UserCardProps {
  user: GitHubUser;
}

const UserCard = ({ user }: UserCardProps) => {
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
    </div>
  );
};

export default UserCard;