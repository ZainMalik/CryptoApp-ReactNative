# Crypto Tracker App
A React Native application that displays live cryptocurrency market data. This app features biometric authentication, dynamic market data visualization, and detailed coin information.

# Features
## Biometric Authentication

- Secure access with fingerprint.
- Fallback options for devices without biometric capabilities.

## Market Overview

Three category tabs:

1.Featured: Top 20 cryptocurrencies by market cap.

2.Top Gainers: Top 20 by 24-hour percentage gain.

3.Top Losers: Top 20 by 24-hour percentage loss.

- Live-updating coin listings with dynamic charts.
- Infinite scroll for smooth data loading.

## Coin Details

- Detailed view of coin performance.
- Time range selector (1D, 1W, 1M, 1Y, All)
- Key statistics (market cap, volume, supply, etc.)

### Code Organization

- Feature-based organization
- Component-driven development
- TypeScript for type safety

### API Integration
The app integrates with the following cryptocurrency data endpoints:

All Coins: https://coingeko.burjx.com/coin-prices-all?currency=usd&page=1&pageSize=10.

Coin OHLC Data: https://coingeko.burjx.com/coin-ohlc?productId=2&days=30.

### Setup and Running

Install dependencies:

npm install

Start the development server:

npm start

Run on a device or emulator:

npm run android
# or
npm run ios

Requirements

Node.js 14+
Expo CLI and SDK 52
React Native development environment

