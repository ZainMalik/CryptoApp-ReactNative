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

### 🚀 Running React Native App with Expo (VS Code)
This guide will help you set up and run a React Native app using the Expo framework inside Visual Studio Code (VS Code).

### 📋 Prerequisites
Before you start, make sure you have:

Node.js installed (LTS version recommended)

Expo CLI installed globally

VS Code installed

Expo Go App installed on your Android or iOS device (for testing)

### 🛠 Setup Instructions
1. Clone the Project
git clone <your-repo-url>
cd <project-folder>

2. Install Dependencies
npm install
# or
yarn install

3. Install Expo CLI (if not installed yet)
npm install -g expo-cli
You can verify by running:
expo --version

4. Start the Expo Development Server
npm start
# or
yarn start
# or
expo start
This will open the Expo Developer Tools in your browser.

### 📱 Running the App
On a physical device:
Open the Expo Go app → Scan the QR code shown in your terminal or browser.

On an emulator/simulator:

Press i to open in iOS Simulator (macOS only)

Press a to open in Android Emulator (must be running Android Studio emulator)

### ⚙️ VS Code Setup (Recommended)
Install these VS Code extensions for the best experience:

ESLint — Code linting

Prettier — Code formatting

React Native Tools — Debugging and IntelliSense

Expo Tools — Expo-specific enhancements (optional)

### 🐛 Troubleshooting
If you face any network issues, try running:
expo start --tunnel

Clear Expo cache if unexpected errors occur:
expo start -c

Ensure your phone and computer are on the same Wi-Fi network when using physical devices.

### 📚 Useful Commands

Command	Description
expo start - Start development server
expo build:android - Build APK or AAB for Android
expo build:ios - Build IPA for iOS
expo upgrade - Upgrade Expo SDK version
npm run lint - Run linter (if configured)
