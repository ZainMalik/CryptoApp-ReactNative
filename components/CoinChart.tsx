import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface CoinChartProps {
  priceChange: number;
  sparkline: number[];
  width: number;
  height: number;
}

const CoinChart: React.FC<CoinChartProps> = ({ priceChange, sparkline, width, height }) => {
  // If no sparkline data is available, return an empty view
  if (!sparkline || sparkline.length === 0) {
    return <View style={{ width, height }} />;
  }

  const isPositive = priceChange >= 0;
  const color = isPositive ? '#C4FF00' : '#FF3440';
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  // Calculate path
  const minValue = Math.min(...sparkline);
  const maxValue = Math.max(...sparkline);
  const range = maxValue - minValue;
  
  // Avoid division by zero
  const normalizeY = (value: number) => {
    if (range === 0) return height / 2;
    return height - ((value - minValue) / range) * height;
  };

  const points = sparkline.map((value, index) => {
    const x = (index / (sparkline.length - 1)) * width;
    const y = normalizeY(value);
    return `${x},${y}`;
  });

  const pathData = `M${points.join(' L')}`;

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity="0.3" />
            <Stop offset="1" stopColor={color} stopOpacity="0.0" />
          </LinearGradient>
        </Defs>

        {/* The line */}
        <Path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
        
        {/* Area under the line with gradient */}
        <Path
          d={`${pathData} L${width},${height} L0,${height} Z`}
          fill={`url(#${gradientId})`}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default CoinChart;