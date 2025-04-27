import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Router } from 'expo-router';

interface CoinHeaderProps {
  name?: string;
  symbol?: string;
  image?: string;
  router: Router;
}

export default function CoinHeader({ name, symbol, image, router }: CoinHeaderProps) {
  const getIconColor = (symbol?: string): string => {
    const colors: Record<string, string> = {
      btc: '#F7931A',
      eth: '#627EEA',
      bnb: '#F3BA2F',
      sol: '#00FFA3',
      default: '#ACACAC'
    };
    
    return colors[(symbol || '').toLowerCase()] || colors.default;
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <View style={styles.backButtonContainer}>
          <Image
            source={require('../assets/images/ic-back.png')} 
            style={styles.backButtonImage}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <View style={styles.coinTitleContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.coinIcon} />
        ) : (
          <View style={[styles.coinIcon, { backgroundColor: getIconColor(symbol) }]}>
            <Text style={styles.coinIconText}>{(symbol || '').substring(0, 1).toUpperCase()}</Text>
          </View>
        )}
        <Text style={styles.coinTitle}>{name} ({(symbol || '').toUpperCase()})</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 40
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonImage: {
    width: 18,
    height: 18,
    tintColor: '#FFFFFF',
  },
  coinTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  coinIconText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  coinTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});