import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import { Router } from 'expo-router';
import CoinChart from './CoinChart';
import TabBar from './TabBar';
import { CoinData, TabType } from '../types/types';
import { formatPrice } from '../app/ScreenMarket';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface FeaturedCoinsSectionProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  coins: CoinData[];
  loading: boolean;
  router: Router;
  getCoinColor: (symbol: string) => string;
  formatPrice: (price: number | undefined) => string;
}

const FeaturedCoinsSection = ({ 
  activeTab, 
  setActiveTab, 
  coins, 
  loading,
  router, 
  getCoinColor,
  formatPrice 
}: FeaturedCoinsSectionProps) => {
  
  let displayCoins = coins;
  
  if (activeTab === 'Featured') {
    displayCoins = coins.sort((a, b) => b.marketCap - a.marketCap).slice(0, 20);
  } else if (activeTab === 'Top Gainers' || activeTab === 'Top Losers') {
    displayCoins = coins.slice(0, Math.min(20, coins.length));
  }

  return (
    <View style={styles.featuredContainer}>
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#c4ff00" />
        </View>
      ) : (
        <FlatList
          horizontal
          data={displayCoins}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FeaturedCoinCard 
              item={item} 
              router={router} 
              getCoinColor={getCoinColor}
              formatPrice={formatPrice}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredListContent}
        />
      )}
    </View>
  );
};

interface FeaturedCoinCardProps {
  item: CoinData;
  router: Router;
  getCoinColor: (symbol: string) => string;
  formatPrice: (price: number | undefined) => string;
}

const FeaturedCoinCard = ({ item, router, getCoinColor, formatPrice }: FeaturedCoinCardProps) => (
  <TouchableOpacity
    style={styles.featuredCoinCard}
    onPress={() => router.push({
      pathname: '/ScreenCoinDetails',
      params: { 
        id: item.productId,
        name: item.name, 
        symbol: item.symbol,
        image: item.image,
        priceChangePercentage24h: item.priceChangePercentage24h,
        currentPrice: item.currentPrice 
      }
    })}
  >
    <View style={styles.coinSymbolRow}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.coinIcon} />
      ) : (
        <View style={[styles.coinIcon, { backgroundColor: getCoinColor(item.symbol) }]}>
          <Text style={styles.coinIconText}>
            {item.symbol.substring(0, 1).toUpperCase()}
          </Text>
        </View>
      )}
      <View style={styles.coinTextContainer}>
        <Text style={styles.coinSymbol}>{item.symbol.toUpperCase()}</Text>
        <Text style={styles.coinName}>{item.name}</Text>
      </View>
    </View>

    <View style={styles.chartContainer}>
      <CoinChart 
        priceChange={item.priceChangePercentage24h} 
        sparkline={item.sparkline && Array.isArray(item.sparkline) ? item.sparkline : []}
        width={145}
        height={48}
      />
    </View>

    <View style={styles.priceRow}>
      <Text style={styles.coinPrice}>
        ${formatPrice(item.currentPrice)}
      </Text>
      {item.priceChangePercentage24h !== undefined && (
        <View style={[
          styles.percentageContainer,
          item.priceChangePercentage24h >= 0 ? styles.percentageContainerUp : styles.percentageContainerDown
        ]}>
          <Text style={[
            styles.percentageText,
            item.priceChangePercentage24h >= 0 ? styles.priceUp : styles.priceDown
          ]}>
            {item.priceChangePercentage24h >= 0 ? '+' : ''}
            {item.priceChangePercentage24h.toFixed(2)}%
          </Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  featuredContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  featuredListContent: {
    paddingRight: 16,
  },
  featuredCoinCard: {
    width: SCREEN_WIDTH * 0.44,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  coinSymbolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  coinIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinIconText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  coinTextContainer: {
    marginLeft: 8,
  },
  coinSymbol: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  coinName: {
    fontSize: 12,
    color: '#ACACAC',
  },
  chartContainer: {
    marginVertical: 12,
    alignItems: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coinPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  percentageContainer: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  percentageContainerUp: {
    backgroundColor: 'rgba(196, 255, 0, 0.15)',
  },
  percentageContainerDown: {
    backgroundColor: 'rgba(255, 52, 64, 0.15)',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceUp: {
    color: '#C4FF00',
  },
  priceDown: {
    color: '#FF3440',
  },
  loadingContainer: {
    height: 170, // Approximate height of a coin card
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeaturedCoinsSection;