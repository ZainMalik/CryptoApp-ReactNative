import { CoinData, CoinOHLC, ApiResponse } from '../types/types';

// General fetch with retries
async function fetchWithRetry(url: string, options = {}, retries = 3, backoff = 1000): Promise<Response> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      if (retries > 0 && [403, 429, 500, 502, 503, 504].includes(response.status)) {
        console.warn(`Retrying request... [${retries} retries left]`);
        await new Promise(res => setTimeout(res, backoff));
        return fetchWithRetry(url, options, retries - 1, backoff * 2); // Exponential backoff
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Fetch error, retrying... [${retries} retries left]`, error);
      await new Promise(res => setTimeout(res, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    console.error('Final fetch error after retries:', error);
    throw error;
  }
}

// Fetch coin price data (used in ScreenMarket)
export const fetchCoinData = async (url: string): Promise<CoinData[]> => {
  try {
    const response = await fetchWithRetry(url);

    const data = await response.json() as ApiResponse;
    console.log('Raw API data:', data);

    const coinData = data.data || [];
    return coinData;
  } catch (error) {
    console.error('Error fetching coin data:', error);
    return [];
  }
};

// Fetch OHLC data (used in ScreenCoinDetails)
export const fetchCoinOHLC = async (productId: string, days: string): Promise<CoinOHLC[]> => {
  try {
    const id = productId;
    const apiUrl = `https://coingeko.burjx.com/coin-ohlc?productId=${id}&days=${days}`;

    const response = await fetchWithRetry(apiUrl);

    const rawText = await response.text();
    console.log('Raw API data:', rawText);
    const data = JSON.parse(rawText) as CoinOHLC[];
    return data;
  } catch (error) {
    console.error('Error fetching OHLC data:', error);
    return [];
  }
};

// Helper to generate endpoint for different tabs (used in ScreenMarket)
export const getEndpointForTab = (tab: 'Featured' | 'Top Gainers' | 'Top Losers', pageNum: number): string => {
  const baseUrl = 'https://coingeko.burjx.com';

  switch (tab) {
    case 'Featured':
    case 'Top Gainers':
    case 'Top Losers':
      return `${baseUrl}/coin-prices-all?currency=usd&page=${pageNum}&pageSize=100`;
    default:
      return `${baseUrl}/coin-prices-all?currency=usd&page=${pageNum}&pageSize=10`;
  }
};

// Helper to generate endpoint for all coins loading (used in ScreenMarket)
export const getAllCoinsEndpoint = (pageNum: number): string => {
  const baseUrl = 'https://coingeko.burjx.com';
  return `${baseUrl}/coin-prices-all?currency=usd&page=${pageNum}&pageSize=20`;
};
