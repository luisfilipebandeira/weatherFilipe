import React from 'react';

import { Home } from '../screens/Home/Home'
import { WeatherDetail } from '../screens/WeatherDetail/WeatherDetail'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="WeatherDetail" component={WeatherDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}