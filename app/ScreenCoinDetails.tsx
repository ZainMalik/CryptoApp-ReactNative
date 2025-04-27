import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, 
  ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter, Router } from 'expo-router';
import CoinHeader from '../components/CoinHeader';
import CandlestickChart from '../components/CandlestickChart';
import TimeframeSelector from '../components/TimeframeSelector';
import StatsDisplay from '../components/StatsDisplay';
import { CoinOHLC } from '../types/types';
import { fetchCoinOHLC } from '../api/CoinAPIs';

type Timeframe = '1D' | '1W' | '1M' | '1Y' | 'ALL';

export default function ScreenCoinDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Extract and convert params
  const id = params.id as string;
  const name = params.name as string;
  const symbol = params.symbol as string;
  const image = params.image as string;
  const currentPrice = typeof params.currentPrice === 'string' 
    ? parseFloat(params.currentPrice) 
    : 0;
  const priceChangePercentage24h = typeof params.priceChangePercentage24h === 'string'
    ? parseFloat(params.priceChangePercentage24h)
    : 0;
  
  const [loading, setLoading] = useState<boolean>(true);
  const [ohlcData, setOhlcData] = useState<CoinOHLC[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('1D');

  useEffect(() => {
    const daysMap: Record<Timeframe, string> = {
      '1D': '1',
      '1W': '7',
      '1M': '30',
      '1Y': '365',
      'ALL': 'max'
    };
  
    const days = daysMap[selectedTimeframe] || '30';
  
    const loadData = async () => {
      setLoading(true);
      try {
        const productId = id;
        const data = await fetchCoinOHLC(productId, days);
        setOhlcData(data);
      } catch (error) {
        console.error('Error loading OHLC data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, [selectedTimeframe, id]);  

  const formatPrice = (price: number): string => {
    if (price >= 1000) {
      return price.toLocaleString(undefined, { maximumFractionDigits: 0 });
    } else if (price >= 1) {
      return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
      return price.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 6 });
    }
  };

  const formatPriceChange = (change: number): string => {
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
  };

  if (loading && ohlcData.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#C4FF00" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <CoinHeader
        name={name}
        symbol={symbol}
        image={image}
        router={router}
      />

      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>
          ${formatPrice(currentPrice)}
        </Text>
        <View style={[
          styles.percentageContainer,
          priceChangePercentage24h >= 0 ? styles.percentageContainerUp : styles.percentageContainerDown
        ]}>
          <Text style={[
            styles.percentageText,
            priceChangePercentage24h >= 0 ? styles.priceUp : styles.priceDown
          ]}>
            {priceChangePercentage24h >= 0 ? '+' : ''}
            {priceChangePercentage24h.toFixed(2)}%
          </Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#C4FF00" style={styles.chartLoading} />
        ) : (
          <CandlestickChart ohlcData={ohlcData} />
        )}
      </View>

      <TimeframeSelector
        selectedTimeframe={selectedTimeframe}
        onSelectTimeframe={(timeframe) => setSelectedTimeframe(timeframe as Timeframe)}
      />

      {ohlcData.length > 0 && (
        <StatsDisplay 
          ohlcData={ohlcData} 
          formatPrice={formatPrice} 
        />
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageContainer: {
    padding: 6,
    marginTop: 6,
    borderRadius: 4,
    marginBottom: 6,
    alignSelf: 'flex-start'
  },
  percentageContainerUp: {
    backgroundColor: 'rgba(196, 255, 0, 0.15)',
  },
  percentageContainerDown: {
    backgroundColor: 'rgba(255, 52, 64, 0.15)',
  },
  percentageText: {
    fontSize: 16,
    fontWeight: '600',
  },
  priceContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  priceText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  priceChangeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  priceUp: {
    color: '#C4FF00',
  },
  priceDown: {
    color: '#FF3440',
  },
  chartContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  chartLoading: {
    position: 'absolute',
  }
});