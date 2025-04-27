import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

interface AllCoinsHeaderProps {
  searchQuery: string;
  handleSearch: (text: string) => void;
}

const AllCoinsHeader = ({ searchQuery, handleSearch }: AllCoinsHeaderProps) => {
  return (
    <View style={styles.allCoinsHeader}>
      <View style={styles.allCoinsHeaderContainer}>
        <Text style={styles.allCoinsTitle}>All Coins</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#6B6B6B"
            onChangeText={handleSearch}
            value={searchQuery}
          />
          <TouchableOpacity style={styles.searchIconContainer}>
            {/* Search icon would go here */}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.allCoinsUnderline} />
    </View>
  );
};

const styles = StyleSheet.create({
  allCoinsHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 0,
  },
  allCoinsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  allCoinsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  allCoinsUnderline: {
    height: 2,
    backgroundColor: '#C4FF00',
    width: 80,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 40,
    flex: 1,
    maxWidth: '60%',
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    padding: 0,
    height: 40,
  },
  searchIconContainer: {
    padding: 4,
  },
});

export default AllCoinsHeader;