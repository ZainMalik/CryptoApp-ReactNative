import { useEffect } from 'react';
import { useRouter, useNavigationContainerRef } from 'expo-router';
import { View, Text } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/ScreenBiometricLogin'); // Safely redirect after layout is mounted
    }, 100); // small delay to let layout mount

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading biometric screen...</Text>
    </View>
  );
}
