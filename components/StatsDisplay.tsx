import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CoinOHLC } from '../types/types';

interface StatsDisplayProps {
  ohlcData: CoinOHLC[];
  formatPrice: (price: number) => string;
}

export default function StatsDisplay({ ohlcData, formatPrice }: StatsDisplayProps) {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>24h High</Text>
          <Text style={styles.statValue}>${formatPrice(ohlcData[ohlcData.length - 1].usd.high)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>24h Low</Text>
          <Text style={styles.statValue}>${formatPrice(ohlcData[ohlcData.length - 1].usd.low)}</Text>
        </View>
      </View>
      <View style={styles.statRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Open</Text>
          <Text style={styles.statValue}>${formatPrice(ohlcData[0].usd.open)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Volume (24h)</Text>
          <Text style={styles.statValue}>$--</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    padding: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    color: '#ACACAC',
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});