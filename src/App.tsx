// src/App.tsx
import { useState, useEffect } from "react";

interface GitHubUser {
  login: string;
  id: number;
  html_url: string;
  public_repos: number;
};

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
    <div style ={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>GitHub ユーザー情報</h1>
      {/* userデータが存在するかどうかで、表示を切り替える*/}
      {user ? (
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
          <p><strong>ユーザー名:</strong> {user.login}</p>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>URL:</strong> <a href={user.html_url} target="_blank" rel="noreferrer">{user.html_url}</a></p>
          <p><strong>公開リポジトリ数:</strong> {user.public_repos}</p>
        </div>
      ) : (
        <p>読み込み中（ローディング）...</p>
      )}
    </div>
  );
};

export default App;