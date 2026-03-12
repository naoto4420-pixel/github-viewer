// src/App.tsx
import { useState, useEffect } from 'react';
import UserCard, { type GitHubUser } from './components/UserCard';


const App = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [inputText, setInputText] = useState('');
  const [searchName, setSearchName] = useState('naoto4420-pixel');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setUser(null);
      setError(null);
      try {
        const response = await fetch(`https://api.github.com/users/${searchName}`);
        if (!response.ok) {
          throw new Error('ユーザーが見つかりませんでした。');
        }
        const data = await response.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
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

      {error && (
        <div className="text-red-500 font-bold mb-4">
          {error}
        </div>
      )}

      {!error && user ? (
        <UserCard user={user} />
      ) : (
        !error && (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-500 animate-pulse">読み込み中（ローディング）...</p>
          </div>
        )
      )}
    </div>
  );
};

export default App;