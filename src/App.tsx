// src/App.tsx
import { useState, useEffect } from 'react';
import UserCard, { type GitHubUser, type GitHubRepo } from './components/UserCard';
import SkeletonCard from './components/SkeletonCard';

const App = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [inputText, setInputText] = useState('');
  const [searchName, setSearchName] = useState('naoto4420-pixel');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setUser(null);
      setError(null);
      setIsLoading(true);
      
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${searchName}`),
          fetch(`https://api.github.com/users/${searchName}/repos?sort=updated&per_page=3`)
        ]);
        if (!userResponse.ok) {
          throw new Error('ユーザーが見つかりませんでした。');
        }

        const data = await userResponse.json();
        const reposData = await reposResponse.json();
        setUser(data);
        setRepos(reposData);

      } catch (err: any) {
        setError(err.message);
        setUser(null);
        setRepos([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, [searchName]);

  const handleSearch = () => {
    if (inputText.trim() !== '') {
      setSearchName(inputText);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">GitHub ユーザー検索</h1>
      
      <div className="flex gap-2 mb-8 w-full max-w-sm">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="ユーザー名を入力..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          検索
        </button>
      </div>

      {isLoading ? 
        (<SkeletonCard />)
      : error ? (
        <div className="text-red-500 font-bold mb-4">
          {error}
        </div>
      )
      : user ? (
        <UserCard user={user} repos={repos}/>
      ) 
      : null }
    </div>
  );
};

export default App;