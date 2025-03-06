import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  // 検索履歴を3件ずつのグループに分ける
  const groupedHistory = [];
  for (let i = 0; i < searchHistory.length; i += 3) {
    groupedHistory.push(searchHistory.slice(i, i + 3));
  }

  return (
    <div className="search-history">
      <h2 className="search-history-title">検索履歴</h2>
      <Carousel className="search-history-carousel">
        <CarouselContent>
          {groupedHistory.map((group, groupIndex) => (
            <CarouselItem key={groupIndex}>
              <div className="search-history-grid">
                {group.map((item, index) => (
                  <div key={index} className="history-card">
                    <p className="zipcode-label">郵便番号: {item.zipcode}</p>
                    <div className="history-results">
                      {item.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="history-address">
                          <p className="address-line">
                            <span className="address-label">住所:</span>
                            {result.address1}
                            {result.address2}
                            {result.address3}
                          </p>
                          <p className="kana">
                            <span className="kana-label">カナ:</span>
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="carousel-prev" />
        <CarouselNext className="carousel-next" />
      </Carousel>
    </div>
  );
};

export default SearchHistory;
