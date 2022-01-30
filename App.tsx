import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import AppRoutes from './src/routes/app.routes';
import { CityProvider } from './src/hooks/cityContext';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <StatusBar style="light" />
      <CityProvider>
        <AppRoutes />
      </CityProvider>
    </View>
  );
}

