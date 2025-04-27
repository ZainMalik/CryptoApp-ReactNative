import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView,Alert, Image } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import BiometricIcon from '../components/BiometricIcon';

export default function ScreenBiometricLogin() {
  const router = useRouter();
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
            
            if (compatible) {
                const enrolled = await LocalAuthentication.isEnrolledAsync();
                if (enrolled) {
                // Automatically start authentication if biometrics are enrolled
                startAuthentication();
                }
            }
        })();
    }, []);

    const startAuthentication = async () => {
        try {
            setIsAuthenticating(true);
            
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate to continue',
                fallbackLabel: 'Use passcode',
                disableDeviceFallback: false,
            });
            
            if (result.success) {
                router.replace('/ScreenMarket');
            } else {
                Alert.alert('Authentication failed', 'Please try again');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            Alert.alert('Error', 'An error occurred during authentication');
        } finally {
            setIsAuthenticating(false);
        }
    };

    const handleSetUp = async () => {
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        
        if (!isBiometricSupported) {
            Alert.alert(
                'Biometrics Not Supported',
                'Your device does not support biometric authentication.'
            );
            return;
        }
        
        if (!enrolled) {
            Alert.alert(
                'Biometrics Not Set Up',
                'Please set up biometric authentication in your device settings.',
                [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Open Settings', 
                    onPress: () => LocalAuthentication.authenticateAsync({ promptMessage: 'Authenticate to continue' })
                }
                ]
            );
        } else {
            startAuthentication();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Use Biometric to log in?</Text>
                
                {/* <View style={styles.iconContainer}>
                <BiometricIcon isAuthenticating={isAuthenticating} />
                </View> */}
                <View style={StyleSheet.absoluteFillObject}>
                    <View style={styles.iconContainer}>
                        <Image
                            source={require('../assets/images/fingerprint.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>
                </View>
                
                <TouchableOpacity style={styles.button} onPress={handleSetUp} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>Set Up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingBottom: 40,
    },
    title: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '600',
        textAlign: 'left',
        marginBottom: 50,
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#CDFF00',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600',
    },
    image: {
        width: 600,                 
        height: 600,
    },
});