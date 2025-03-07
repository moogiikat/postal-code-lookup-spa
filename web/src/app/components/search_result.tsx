import React from "react";
import { SearchResult } from "../types";

interface SearchResultProps {
  address: SearchResult[];
}

const SearchResultComponent: React.FC<SearchResultProps> = ({ address }) => {
  return (
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
  );
};

export default SearchResultComponent;
