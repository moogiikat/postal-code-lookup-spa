"use client";
import { useState } from "react";
import "./Home.scss";
import SearchHistory from "./components/search_history";

export default function Home() {
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState<
    {
      zipcode: string;
      address1: string;
      address2: string;
      address3: string;
      kana1: string;
      kana2: string;
      kana3: string;
      prefcode: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState<
    {
      zipcode: string;
      results: typeof address;
      timestamp: number;
    }[]
  >([]);

  // Validate zipcode format
  const validateZipcode = (
    code: string
  ): { isValid: boolean; message: string } => {
    // Check if input contains only numbers and hyphens
    if (!/^[0-9-]+$/.test(code)) {
      return {
        isValid: false,
        message:
          "郵便番号は半角数字のみまたは半角数字とハイフンのみで入力してください。",
      };
    }

    // Check if format is either 000-0000 or 0000000
    const cleanCode = code.replace(/-/g, "");
    if (cleanCode.length !== 7 || (code.includes("-") && code.length !== 8)) {
      return {
        isValid: false,
        message:
          "郵便番号は半角数字でハイフンありの8桁かハイフンなしの7桁で入力してください。",
      };
    }

    return { isValid: true, message: "" };
  };

  const searchAddress = async () => {
    // Reset states
    setAddress([]);
    setError("");

    // Validate zipcode before making API call
    const validation = validateZipcode(zipcode);
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    setLoading(true);

    try {
      // Remove hyphens if present
      const cleanZipcode = zipcode.replace(/-/g, "");

      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleanZipcode}`
      );
      const data = await response.json();

      if (data.status === 200) {
        if (data.results) {
          setAddress(data.results);

          // Add to search history
          setSearchHistory((prev) => [
            {
              zipcode: cleanZipcode,
              results: data.results,
              timestamp: Date.now(),
            },
            ...prev,
          ]);
        } else {
          setError("郵便番号が存在しません。");
        }
      } else {
        setError(data.message || "エラーが発生しました。");
      }
    } catch (error) {
      setError("エラーが発生しました。");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change with max length restriction
  const handleZipcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Limit input to 8 characters (including possible hyphen)
    if (value.length <= 8) {
      setZipcode(value);
      // Clear error when user starts typing again
      if (error) setError("");
    }
  };

  // Check if button should be disabled
  const isButtonDisabled = loading || !zipcode.length;

  return (
    <div>
      <div className="search-container">
        <h1>住所検索</h1>
        <p className="description">
          郵便番号を入力して住所を検索できます。
          <br />
          郵便番号はハイフン「-」有無どちらでも検索可能です。
          <br />
          (000-0000, 0000000 の形式で入力してください。)
        </p>

        <div className="search-form">
          <input
            type="text"
            value={zipcode}
            onChange={handleZipcodeChange}
            placeholder="郵便番号を入力してください。"
          />
          <button onClick={searchAddress} disabled={isButtonDisabled}>
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
                <p>
                  {item.address1} {item.address2} {item.address3}
                </p>
                <p className="kana">
                  {item.kana1} {item.kana2} {item.kana3}
                </p>
              </div>
            ))}
          </div>
        )}
        {address && address.length === 0 && !error && !loading && (
          <p className="no-results">該当する住所が見つかりませんでした。</p>
        )}
      </div>
      <div className="search-history-container">
        {/* Search History Section */}
        {searchHistory.length > 0 && (
          <SearchHistory searchHistory={searchHistory} />
        )}
      </div>
    </div>
  );
}
