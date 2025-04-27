import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg';
import { CoinOHLC } from '../types/types';

interface CandlestickChartProps {
  ohlcData: CoinOHLC[];
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const CHART_HEIGHT = 250;
const CHART_PADDING = 20;
const CHART_WIDTH = SCREEN_WIDTH - (2 * CHART_PADDING);
const RIGHT_PRICE_LABEL_WIDTH = 75; // Width for price labels
const TEXT_HEIGHT = 12; // Text height for calculations

export default function CandlestickChart({ ohlcData }: CandlestickChartProps) {
  if (ohlcData.length === 0) return null;
  
  // Find min and max values for scaling
  let minValue = Number.MAX_VALUE;
  let maxValue = Number.MIN_VALUE;
  
  ohlcData.forEach(item => {
    minValue = Math.min(minValue, item.usd.low);
    maxValue = Math.max(maxValue, item.usd.high);
  });
  
  // Add some padding to the min/max values for better visualization
  const valueRange = maxValue - minValue;
  const paddingFactor = 0.05; // 5% padding
  
  minValue = minValue - (valueRange * paddingFactor);
  maxValue = maxValue + (valueRange * paddingFactor);
  
  // Calculate the effective chart height excluding space needed for top/bottom labels
  const effectiveChartHeight = CHART_HEIGHT - (2 * TEXT_HEIGHT);
  const topLabelOffset = TEXT_HEIGHT;
  
  // Function to scale a price value to the chart height with adjustments for labels
  const scaleY = (price: number): number => {
    return topLabelOffset + (effectiveChartHeight - ((price - minValue) / (maxValue - minValue) * effectiveChartHeight));
  };
  
  // Calculate the width of each candlestick
  const adjustedChartWidth = CHART_WIDTH - RIGHT_PRICE_LABEL_WIDTH;
  const candleWidth = (adjustedChartWidth / ohlcData.length) * 0.8; // 80% of available width
  const candleSpacing = (adjustedChartWidth / ohlcData.length) * 0.2; // 20% for spacing
  
  // Generate price labels for the right side (3 levels like in screenshot)
  const priceLevels = [
    { value: maxValue, label: `$ ${formatPrice(maxValue)}`, y: topLabelOffset },
    { value: minValue + (valueRange / 2), label: `$ ${formatPrice(minValue + (valueRange / 2))}`, y: CHART_HEIGHT / 2 },
    { value: minValue, label: `$ ${formatPrice(minValue)}`, y: CHART_HEIGHT - TEXT_HEIGHT }
  ];
  
  // Function to format price values
  function formatPrice(price: number): string {
    if (price >= 1000) {
      return price.toLocaleString(undefined, { maximumFractionDigits: 0 });
    } else if (price >= 1) {
      return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
      return price.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 6 });
    }
  }
  
  // Get the last price for displaying as current price
  const currentPrice = ohlcData[ohlcData.length - 1]?.usd.close || 0;
  
  // Format the current price to determine width needed
  const currentPriceText = `$ ${formatPrice(currentPrice)}`;
  // Estimate text width - roughly 5.5px per character plus padding
  const estimatedTextWidth = currentPriceText.length * 5.5 + 5;
  
  return (
    <Svg width={SCREEN_WIDTH} height={CHART_HEIGHT}>
      {/* Price level lines and labels */}
      {priceLevels.map((level, i) => {
        // Calculate y position based on fixed positions for top/bottom and normal scaling for middle
        const y = i === 0 ? level.y : (i === priceLevels.length - 1 ? level.y : scaleY(level.value));
        
        return (
          <React.Fragment key={`level-${i}`}>
            <Line
              x1={CHART_PADDING}
              y1={i === 0 ? scaleY(level.value) : (i === priceLevels.length - 1 ? scaleY(level.value) : y)}
              x2={CHART_PADDING + adjustedChartWidth}
              y2={i === 0 ? scaleY(level.value) : (i === priceLevels.length - 1 ? scaleY(level.value) : y)}
              stroke="#333333"
              strokeWidth={0.5}
              strokeDasharray="3, 3"
            />
            <SvgText
              x={CHART_PADDING + adjustedChartWidth + 5}
              y={y + 4} // Adjusted for text positioning
              fontSize="10"
              fill="#888888"
            >
              {level.label}
            </SvgText>
          </React.Fragment>
        );
      })}
      
      {/* Candlesticks */}
      {ohlcData.map((item, index) => {
        const x = CHART_PADDING + (index * (candleWidth + candleSpacing));
        const open = scaleY(item.usd.open);
        const close = scaleY(item.usd.close);
        const high = scaleY(item.usd.high);
        const low = scaleY(item.usd.low);
        
        const isUp = item.usd.close >= item.usd.open;
        const candleColor = isUp ? '#C4FF00' : '#FF3440';
        
        // Height of the candle body
        const candleBodyHeight = Math.abs(open - close);
        
        // Y position for the candle body (always the minimum of open and close)
        const candleBodyY = Math.min(open, close);
        
        return (
          <React.Fragment key={index}>
            {/* Wick line */}
            <Line
              x1={x + candleWidth / 2}
              y1={high}
              x2={x + candleWidth / 2}
              y2={low}
              stroke={candleColor}
              strokeWidth={1}
            />
            
            {/* Candle body */}
            <Rect
              x={x}
              y={candleBodyY}
              width={candleWidth}
              height={Math.max(candleBodyHeight, 1)} // Ensure minimum height of 1
              fill={candleColor}
            />
          </React.Fragment>
        );
      })}
      
      {/* Current price highlight on right side */}
      <Line
        x1={CHART_PADDING}
        y1={scaleY(currentPrice)}
        x2={CHART_PADDING + adjustedChartWidth}
        y2={scaleY(currentPrice)}
        stroke="#C4FF00"
        strokeWidth={0.5}
      />
      
      {/* Current price tag with adjusted styling */}
      <Rect
        x={CHART_PADDING + adjustedChartWidth}
        y={scaleY(currentPrice) - 10} // Slightly reduced for better centering
        width={estimatedTextWidth + 10} // Dynamic width based on price text length
        height={20} // Standard height
        fill="#C4FF00"
        rx={4}
        ry={4}
      />
      
      <SvgText
        x={CHART_PADDING + adjustedChartWidth + 6}
        y={scaleY(currentPrice) + 4} // Adjusted for vertical centering
        fontSize="10" // Same size as other labels
        fill="#000000"
      >
        {currentPriceText}
      </SvgText>
    </Svg>
  );
}