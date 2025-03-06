import React from "react";

interface SearchResult {
  address1: string;
  address2: string;
  address3: string;
  kana1: string;
  kana2: string;
  kana3: string;
}

interface SearchHistoryItem {
  zipcode: string;
  results: SearchResult[];
  timestamp: number;
}

interface SearchHistoryProps {
  searchHistory: SearchHistoryItem[];
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ searchHistory }) => {
  return (
    <div className="search-history">
      <h2>検索履歴</h2>
      <div className="history-cards">
        {searchHistory.map((item, index) => (
          <div key={index} className="history-card">
            <p className="zipcode-label">郵便番号: {item.zipcode}</p>
            <div className="history-results">
              {item.results.map((result, resultIndex) => (
                <div key={resultIndex} className="history-address">
                  <p className="address-line">
                    <span className="address-label">住所: </span>
                    {result.address1}
                    {result.address2}
                    {result.address3}
                  </p>
                  <p className="kana">
                    <span className="kana-label">カナ: </span>
                    {result.kana1}
                    {result.kana2}
                    {result.kana3}
                  </p>
                </div>
              ))}
            </div>
            <p className="timestamp">
              {new Date(item.timestamp).toLocaleString("ja-JP")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
