import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';

interface BiometricIconProps {
  isAuthenticating: boolean;
}

const BiometricIcon: React.FC<BiometricIconProps> = ({ isAuthenticating }) => {
  const pulseAnim = React.useRef(new Animated.Value(0)).current;
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isAuthenticating) {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 0,
              duration: 1500,
              useNativeDriver: true,
            }),
          ]),
          Animated.loop(
            Animated.timing(rotateAnim, {
              toValue: 1,
              duration: 3000,
              useNativeDriver: true,
            })
          ),
        ])
      ).start();
    } else {
      pulseAnim.setValue(0);
      rotateAnim.setValue(0);
    }
  }, [isAuthenticating]);

  const outerCircleScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.outerCircle,
          {
            transform: [{ scale: outerCircleScale }, { rotate }],
          },
        ]}
      >
        <Svg height="100" width="100" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="48"
            stroke="#0066cc"
            strokeWidth="2"
            fill="transparent"
          />
        </Svg>
      </Animated.View>

      <Animated.View
        style={[
          styles.middleCircle,
          {
            transform: [{ scale: outerCircleScale }, { rotate }],
          },
        ]}
      >
        <Svg height="100" width="100" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="40"
            stroke="#c4ff00"
            strokeWidth="2"
            strokeDasharray="6,3"
            fill="transparent"
          />
        </Svg>
      </Animated.View>

      <View style={styles.fingerprintContainer}>
        <View style={styles.fingerprintBorder}>
          <Svg height="60" width="60" viewBox="0 0 60 60">
            <Path
              d="M30,10 C18.95,10 10,18.95 10,30 C10,41.05 18.95,50 30,50 C41.05,50 50,41.05 50,30 C50,18.95 41.05,10 30,10 Z M30,15 C38.27,15 45,21.73 45,30 C45,38.27 38.27,45 30,45 C21.73,45 15,38.27 15,30 C15,21.73 21.73,15 30,15 Z M30,20 C24.48,20 20,24.48 20,30 C20,35.52 24.48,40 30,40 C35.52,40 40,35.52 40,30 C40,24.48 35.52,20 30,20 Z M30,25 C32.76,25 35,27.24 35,30 C35,32.76 32.76,35 30,35 C27.24,35 25,32.76 25,30 C25,27.24 27.24,25 30,25 Z"
              fill="#c4ff00"
              strokeWidth="1"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  outerCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
  },
  middleCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
  },
  fingerprintContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  fingerprintBorder: {
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#c4ff00',
    overflow: 'hidden',
  },
});

export default BiometricIcon;