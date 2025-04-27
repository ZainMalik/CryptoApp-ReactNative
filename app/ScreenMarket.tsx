import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, 
  ActivityIndicator, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { fetchCoinData, getEndpointForTab, getAllCoinsEndpoint } from '../api/CoinAPIs';
import { CoinData, TabType } from '../types/types';
import AllCoinsHeader from 'components/AllCoinsHeader';
import { EmptySearchResults, LoadingFooter } from 'components/UtilityComponents';
import CoinItem from 'components/CoinItem';
import FeaturedCoinsSection from 'components/FeaturedCoinsSection';

export default function ScreenMarket() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('Featured');
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [allCoins, setAllCoins] = useState<CoinData[]>([]); 
  const [filteredAllCoins, setFilteredAllCoins] = useState<CoinData[]>([]); 
  const [loadingAllCoins, setLoadingAllCoins] = useState(true);
  const [loadingMoreAllCoins, setLoadingMoreAllCoins] = useState(false);
  const [allCoinsPage, setAllCoinsPage] = useState(1);
  const [hasMoreAllCoins, setHasMoreAllCoins] = useState(true);
  
  // Load All Coins ONLY once when the screen mounts
  useEffect(() => {
    loadAllCoins(1);
  }, []);

  // Load featured coins on initial render and when tab changes
  useEffect(() => {
    setLoadingFeatured(true);
    loadFeaturedCoins();
  }, [activeTab]);

  const loadFeaturedCoins = useCallback(async () => {
    try {
      const endpoint = getEndpointForTab(activeTab, 1);
      const newCoins = await fetchCoinData(endpoint);
      
      if (newCoins.length === 0) {
        setCoins([]);
        return;
      }
      
      let processedCoins = [...newCoins];
      
      if (activeTab === 'Top Gainers') {
        processedCoins = processedCoins
          .sort((a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h)
          .slice(0, 20);
      }
      else if (activeTab === 'Top Losers') {
        processedCoins = processedCoins
          .sort((a, b) => a.priceChangePercentage24h - b.priceChangePercentage24h)
          .slice(0, 20);
      }
  
      setCoins(processedCoins);
    } catch (error) {
      console.error('Error loading featured coins:', error);
    } finally {
      setLoadingFeatured(false);
    }
  }, [activeTab]);
  
  const filterCoins = (query: string, coinsList = allCoins) => {
    if (!query.trim()) {
      setFilteredAllCoins(coinsList);
      return;
    }
  
    const searchTerms = query.toLowerCase().trim();
    const filtered = coinsList.filter(coin => 
      coin.name.toLowerCase().includes(searchTerms) || 
      coin.symbol.toLowerCase().includes(searchTerms)
    );
    
    setFilteredAllCoins(filtered);
  };  

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    filterCoins(text);
  };

  const handleLoadMore = () => {
    if (!loadingMoreAllCoins && hasMoreAllCoins && searchQuery === '') {
      setLoadingMoreAllCoins(true);
      const nextPage = allCoinsPage + 1;
      setAllCoinsPage(nextPage);
      loadAllCoins(nextPage);
    }
  };

  const loadAllCoins = useCallback(async (pageNum: number) => {
    try {
      const endpoint = getAllCoinsEndpoint(pageNum);
      const newCoins = await fetchCoinData(endpoint);
  
      if (newCoins.length === 0) {
        setHasMoreAllCoins(false);
        return;
      }
  
      if (pageNum === 1) {
        setAllCoins(newCoins);
        setFilteredAllCoins(newCoins);
      } else {
        const updatedCoins = [...allCoins, ...newCoins];
        setAllCoins(updatedCoins);
        filterCoins(searchQuery, updatedCoins);
      }
    } catch (error) {
      console.error('Error loading all coins:', error);
    } finally {
      setLoadingAllCoins(false);
      setLoadingMoreAllCoins(false);
    }
  }, [searchQuery, allCoins]);

  const getCoinColor = (symbol: string): string => {
    const colors: Record<string, string> = {
      btc: '#F7931A',
      eth: '#627EEA',
      bnb: '#F3BA2F',
      sol: '#00FFA3',
      default: '#ACACAC'
    };
    
    return colors[symbol.toLowerCase()] || colors.default;
  };

  if (loadingAllCoins) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#c4ff00" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        data={filteredAllCoins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CoinItem 
            item={item} 
            router={router} 
            getCoinColor={getCoinColor} 
            formatPrice={formatPrice} 
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <>
            <FeaturedCoinsSection 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              coins={coins}
              loading={loadingFeatured}
              router={router}
              getCoinColor={getCoinColor}
              formatPrice={formatPrice}
            />
            <AllCoinsHeader 
              searchQuery={searchQuery}
              handleSearch={handleSearch}
            />
          </>
        }
        ListFooterComponent={loadingMoreAllCoins ? <LoadingFooter /> : null}
        ListEmptyComponent={searchQuery.trim() !== '' ? <EmptySearchResults searchQuery={searchQuery} /> : null}
        showsVerticalScrollIndicator={false}
      />
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
  }
});

// Helper functions
export const formatPrice = (price: number | undefined): string => {
  if (price === undefined) return 'N/A';
  
  if (price >= 1000) {
    return price.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }
  else if (price >= 1) {
    return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  else {
    return price.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 6 });
  }
};

export const formatPriceChange = (change: number | undefined): string => {
  if (change === undefined) return 'N/A';
  return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
};