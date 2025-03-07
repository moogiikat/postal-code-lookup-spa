"use client";
import { useState } from "react";

import { validateZipcode } from "@/lib/utils";

import "./Home.scss";
import SearchHistory from "./components/search_history";
import SearchResultComponent from "./components/search_result";
import { SearchResult, SearchHistoryItem, ApiResponse } from "./types";

export default function Home() {
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

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
      const data: ApiResponse = await response.json();

      if (data.status === 200) {
        if (data.results) {
          setAddress(data.results);

          // Add to search history
          setSearchHistory((prev) => [
            {
              zipcode: cleanZipcode,
              results: data.results || [],
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
          <SearchResultComponent address={address} />
        )}
        {loading && (
          <p className="loading">
            <span className="spinner"></span>
          </p>
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
