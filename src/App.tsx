// src/App.tsx
import { useState, useEffect } from 'react';

interface GitHubUser {
  login: string;
  id: number;
  html_url: string;
  public_repos: number;
}

const App = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch('https://api.github.com/users/naoto4420-pixel');
      const data = await response.json();
      setUser(data);
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">GitHub ユーザー情報</h1>
      
      {user ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm border border-gray-200">
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
      ) : (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500 animate-pulse">読み込み中（ローディング）...</p>
        </div>
      )}
    </div>
  );
};

export default App;