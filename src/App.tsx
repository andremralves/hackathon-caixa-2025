// App.tsx (example)
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import NewLoanProductScreen from './screens/NewLoanProducts';
import SimulationScreen from './screens/SimulationScreen';
import { View, StatusBar, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { useThemeColor } from '#/hooks/useThemeColor';
import { AppThemeProvider, useAppColorScheme } from '#/context/theme';
import { ProductsProvider } from '#/context/products';

const Stack = createNativeStackNavigator();

function AppInner() {
  const [fontsLoaded] = useFonts({
    'CAIXA-Light': require('../assets/fonts/caixa/CAIXAStd-Light.woff2'),
    'CAIXA-Regular': require('../assets/fonts/caixa/CAIXAStd-Regular.woff2'),
    'CAIXA-SemiBold': require('../assets/fonts/caixa/CAIXAStd-SemiBold.woff2'),
    'CAIXA-Bold': require('../assets/fonts/caixa/CAIXAStd-Bold.woff2'),
    'CAIXA-ExtraBold': require('../assets/fonts/caixa/CAIXAStd-ExtraBold.woff2'),
  });

  // Provide a fallback while fonts load
  if (!fontsLoaded) {
    return <View style={{ flex: 1 }} />;
  }

  const scheme = useAppColorScheme();
  const mode: 'light' | 'dark' = scheme === 'dark' ? 'dark' : 'light';
  const background = useThemeColor({}, 'background');

  return (
    <View style={{ flex: 1, backgroundColor: background }}>
      <StatusBar barStyle={mode === 'dark' ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="NewLoanProduct"
            component={NewLoanProductScreen}
            options={{ title: 'New Product' }}
          />
          <Stack.Screen
            name="Simulation"
            component={SimulationScreen}
            options={{ title: 'Simulation' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  return (
    <AppThemeProvider>
      <ProductsProvider>
        <AppInner />
      </ProductsProvider>
    </AppThemeProvider>
  );
}
