import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from './src/HomeScreen';
import Lab2 from './src/Lab2';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='HomeScreen' component={HomeScreen} />
        <Tab.Screen name='Lab2' component={Lab2} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;