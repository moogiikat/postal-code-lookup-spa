import React from "react"
import { useState, useEffect } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import "@/app/scss/search_history.scss"

import { SearchHistoryItem } from "../types"

interface SearchHistoryProps {
  searchHistory: SearchHistoryItem[]
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ searchHistory }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const groupedHistory = []
  for (let i = 0; i < searchHistory.length; i += 3) {
    groupedHistory.push(searchHistory.slice(i, i + 3))
  }

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api, searchHistory])

  return (
    <div className="search-history">
      <h2 className="search-history-title">検索履歴</h2>
      <Carousel className="search-history-carousel" setApi={setApi}>
        <CarouselContent>
          {groupedHistory.map((group, groupIndex) => (
            <CarouselItem key={groupIndex}>
              <div className="search-history-grid">
                {group.map((item, index) => (
                  <div key={index} className="history-card">
                    <div>
                      <p className="zipcode-label">郵便番号: {item.zipcode}</p>
                      <div className="history-results">
                        {item.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="history-address">
                            <p className="address-line">
                              <span className="address-label">住所:</span>
                              <span className="address-line-text">
                                {result.address1}
                                {result.address2}
                                {result.address3}
                              </span>
                            </p>
                            <p className="kana">
                              <span className="kana-label">カナ:</span>
                              <span className="kana-line-text">
                                {result.kana1}
                                {result.kana2}
                                {result.kana3}
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
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

      {count > 0 && (
        <div className="carousel-indicators">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              className={`indicator ${i === current ? "active" : ""}`}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchHistory
