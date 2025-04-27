import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { TabType } from '../types/types';

interface TabBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TabBar = ({ activeTab, setActiveTab }: TabBarProps) => {
  const TABS = [
    { key: 'Featured', label: 'Featured', icon: require('../assets/images/ic-star-featured.png') },
    { key: 'Top Gainers', label: 'Top Gainers', icon: require('../assets/images/ic-rocket-topg.png') },
    { key: 'Top Losers', label: 'Top Losers', icon: require('../assets/images/ic-flag-topl.png') },
  ];

  return (
    <View style={styles.tabBarContainer}>
      <FlatList
        data={TABS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.tab, activeTab === item.key && styles.activeTab]}
            onPress={() => setActiveTab(item.key as TabType)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={item.icon}
                style={{ width: 22, height: 22, marginRight: 6 }}
                resizeMode="contain"
              />
              <View style={{ justifyContent: 'center' }}>
                <Text style={[styles.tabText, activeTab === item.key && styles.activeTabText]}>
                  {item.label}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#C4FF00',
  },
  tabText: {
    fontSize: 16,
    color: '#ACACAC',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default TabBar;