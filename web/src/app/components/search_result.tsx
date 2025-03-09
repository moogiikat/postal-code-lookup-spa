import React from "react"
import { SearchResult } from "../types"
import "@/app/scss/search_result.scss"

interface SearchResultProps {
  addresses: SearchResult[]
}

const SearchResultComponent: React.FC<SearchResultProps> = ({ addresses }) => {
  return (
    <div className="results-container">
      <h2 className="results-title">検索結果:</h2>
      <div className="zipcode-box">
        <span className="zipcode-label">郵便番号:</span>
        <span className="zipcode">〒{addresses[0].zipcode}</span>
      </div>
      <div className="address-list">
        {addresses.map((item, index) => (
          <div key={index} className="address-item">
            <p className="address-text">
              {item.address1} {item.address2} {item.address3}
            </p>
            <p className="kana-text">
              {item.kana1} {item.kana2} {item.kana3}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResultComponent
