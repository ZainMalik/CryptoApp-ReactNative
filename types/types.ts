export interface CoinData {
  productId: number;
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  sparkline: number[];
  marketCap: number;
  tradingVolume: number;
}

export interface ApiResponse {
  data: CoinData[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
} 
  
export type TabType = 'Featured' | 'Top Gainers' | 'Top Losers';

export interface CoinOHLC {
  date: number;
  usd: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
   aed: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
}

export interface CoinDetailData {
  productId: number;
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
   sparkline: number[];
  marketCap: number;
  tradingVolume: number;
}