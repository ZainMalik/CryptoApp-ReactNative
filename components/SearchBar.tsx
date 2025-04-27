import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  onSearch?: (text: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  const [searchText, setSearchText] = useState(initialValue);
  
  // Update search text when initialValue changes
  useEffect(() => {
    setSearchText(initialValue);
  }, [initialValue]);

  const handleChange = (text: string) => {
    setSearchText(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  const handleClear = () => {
    setSearchText('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={16} color="#8E8E93" style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder="Search coins..."
        placeholderTextColor="#8E8E93"
        value={searchText}
        onChangeText={handleChange}
        autoCapitalize="none"
        returnKeyType="search"
      />
      {searchText.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Ionicons name="close-circle" size={16} color="#8E8E93" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    width: 150,
    height: 36,
  },
  searchIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    height: 36,
    color: '#FFFFFF',
    fontSize: 14,
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;