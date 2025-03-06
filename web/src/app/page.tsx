"use client";
import { useState } from "react";
import "./Home.scss";

export default function Home() {
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState<{
    zipcode: string;
    address1: string;
    address2: string;
    address3: string;
    kana1: string;
    kana2: string;
    kana3: string;
  }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchAddress = async () => {
    // Reset states
    setAddress([]);
    setError("");
    setLoading(true);

    try {
      // Remove hyphens if present
      const cleanZipcode = zipcode.replace(/-/g, "");
      
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleanZipcode}`
      );
      const data = await response.json();

      if (data.status === 200) {
        setAddress(data.results);
      } else {
        setError(data.message || "検索中にエラーが発生しました。");
      }
    } catch (error) {
      setError("APIリクエスト中にエラーが発生しました。");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>住所検索</h1>
      
      <p className="description">
        郵便番号を入力して住所を検索できます。<br />
        郵便番号はハイフン「-」有無どちらでも検索可能です。<br />
        (000-0000, 0000000 の形式で入力してください。)
      </p>

      <div className="search-form">
        <input
          type="text"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          placeholder="郵便番号を入力してください。"
        />
        <button
          onClick={searchAddress}
          disabled={loading}
        >
          {loading ? "検索中..." : "検索"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {address && address.length > 0 && (
        <div className="results">
          <h2>検索結果:</h2>
          {address.map((item, index) => (
            <div key={index} className="address-item">
              <p>〒{item.zipcode}</p>
              <p>{item.address1} {item.address2} {item.address3}</p>
              <p className="kana">{item.kana1} {item.kana2} {item.kana3}</p>
            </div>
          ))}
        </div>
      )}

      {address && address.length === 0 && (
        <p className="no-results">該当する住所が見つかりませんでした。</p>
      )}
    </div>
  );
}
