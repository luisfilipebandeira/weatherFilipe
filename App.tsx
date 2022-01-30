import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import AppRoutes from './src/routes/app.routes';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <StatusBar style="light" />
      <AppRoutes />
    </View>
  );
}

