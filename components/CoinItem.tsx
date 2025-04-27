import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Router } from 'expo-router';
import CoinChart from './CoinChart';
import { CoinData } from '../types/types';

interface CoinItemProps {
  item: CoinData;
  router: Router;
  getCoinColor: (symbol: string) => string;
  formatPrice: (price: number | undefined) => string;
}

const CoinItem = ({ item, router, getCoinColor, formatPrice }: CoinItemProps) => (
  <View style={styles.cardWrapper}>
    <TouchableOpacity 
      style={styles.coinItem}
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
      <View style={styles.coinItemLeft}>
        <View style={styles.coinTopRow}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.coinListIcon} />
          ) : (
            <View style={[styles.coinListIcon, { backgroundColor: getCoinColor(item.symbol) }]}>
              <Text style={styles.coinIconText}>{item.symbol.substring(0, 1).toUpperCase()}</Text>
            </View>
          )}
          <View style={styles.coinItemDetails}>
            <Text style={styles.coinItemSymbol}>{item.symbol.toUpperCase()}</Text>
            <Text style={styles.coinItemName}>{item.name}</Text>
          </View>
        </View>
        
        <Text style={styles.coinItemPrice}>
          ${formatPrice(item.currentPrice)}
        </Text>
      </View>
      
      <View style={styles.coinItemRight}>
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
        
        <View style={styles.miniChartContainer}>
          <CoinChart 
            priceChange={item.priceChangePercentage24h} 
            sparkline={item.sparkline && Array.isArray(item.sparkline) ? item.sparkline : []}
            width={120}
            height={45}
          />
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 3,
  },
  coinItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coinItemLeft: {
    flex: 0.48,
    justifyContent: 'center',
  },
  coinTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  coinListIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  coinIconText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  coinItemDetails: {
    justifyContent: 'center',
  },
  coinItemSymbol: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  coinItemName: {
    fontSize: 13,
    color: '#ACACAC',
    marginTop: 2,
  },
  coinItemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 10,
    justifyContent: 'center'
  },
  coinItemRight: {
    flex: 0.52,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  percentageContainer: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
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
  miniChartContainer: {
    height: 45,
    width: 120,
  },
  priceUp: {
    color: '#C4FF00',
  },
  priceDown: {
    color: '#FF3440',
  },
});

export default CoinItem;