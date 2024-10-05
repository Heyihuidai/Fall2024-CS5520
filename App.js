import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ title: 'My Awesome App' }}
        />
        <Stack.Screen 
          name="Details" 
          component={GoalDetails}
          options={{ title: 'Goal Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}