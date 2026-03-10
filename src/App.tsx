// src/App.tsx
import { useState, useEffect } from 'react';

interface GitHubUser {
  login: string;
  id: number;
  html_url: string;
  avatar_url: string;
  public_repos: number;
}

const App = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [inputText, setInputText] = useState('');
  const [searchName, setSearchName] = useState('naoto4420-pixel');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      // 初期化
      setUser(null);
      setError(null);
      
      try{
        // データ取得
        const response = await fetch(`https://api.github.com/users/${searchName}`);
        if (!response.ok) {
          setError('ユーザーが見つかりませんでした。');
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUserInfo();
  }, [searchName]);

  // 検索ボタン処理
  const handleSearch = () => {
    if (inputText.trim() !== ''){
      setSearchName(inputText);
    }
  }

return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">GitHub ユーザー検索</h1>
      
      {/* --- 新規追加：検索バーのUI --- */}
      <div className="flex gap-2 mb-8 w-full max-w-sm">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)} // 入力されるたびにinputTextの箱を更新
          placeholder="ユーザー名を入力..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch} // クリックされたら検索を実行
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          検索
        </button>
      </div>
      {/* ----------------------------- */}

      {/* エラーがある場合はエラーメッセージを表示 */}
      {error && (
        <div className="text-red-500 font-bold mb-4">
          {error}
        </div>
      )}

      {/* エラーがなく、かつuserデータが存在する場合にカードを表示 */}
      {!error && user ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm border border-gray-200">
          {/* プロフィール画像 */}
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
      ) : (
        /* エラーがなく、データもまだ無い場合はローディングを表示 */
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