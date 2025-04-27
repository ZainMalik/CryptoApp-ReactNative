import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Timeframe = '1D' | '1W' | '1M' | '1Y' | 'ALL';

interface TimeframeSelectorProps {
  selectedTimeframe: string;
  onSelectTimeframe: (timeframe: string) => void;
}

export default function TimeframeSelector({ selectedTimeframe, onSelectTimeframe }: TimeframeSelectorProps) {
  const timeframeButtons: Timeframe[] = ['1D', '1W', '1M', '1Y', 'ALL'];

  return (
    <View style={styles.timeframeContainer}>
      {timeframeButtons.map((button) => (
        <TouchableOpacity
          key={button}
          style={[
            styles.timeframeButton,
            selectedTimeframe === button && styles.selectedTimeframeButton
          ]}
          onPress={() => onSelectTimeframe(button)}
        >
          <Text style={[
            styles.timeframeButtonText,
            selectedTimeframe === button && styles.selectedTimeframeButtonText
          ]}>
            {button}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  timeframeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  timeframeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#1E1E1E',
  },
  selectedTimeframeButton: {
    backgroundColor: '#C4FF00',
  },
  timeframeButtonText: {
    color: '#ACACAC',
    fontWeight: '600',
  },
  selectedTimeframeButtonText: {
    color: '#000000',
  },
});