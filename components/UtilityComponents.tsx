import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

// Loading footer for load more operations
export const LoadingFooter = () => (
  <View style={styles.footer}>
    <ActivityIndicator size="small" color="#c4ff00" />
  </View>
);

// Component to show when search returns no results
interface EmptySearchResultsProps {
  searchQuery: string;
}

export const EmptySearchResults = ({ searchQuery }: EmptySearchResultsProps) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No coins found matching "{searchQuery}"</Text>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#ACACAC',
    fontSize: 16,
    textAlign: 'center',
  },
});