export interface ApiResponse {
  status: number
  message: string | null
  results: SearchResult[] | null
}

export interface SearchResult {
  zipcode: string
  address1: string
  address2: string
  address3: string
  kana1: string
  kana2: string
  kana3: string
  prefcode: string
}

export interface SearchHistoryItem {
  zipcode: string
  results: SearchResult[]
  timestamp: number
}
