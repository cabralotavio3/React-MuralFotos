import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FeedScreen from '../screens/FeedScreen';
import NovoPostScreen from '../screens/NovoPostScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Feed">
        <Stack.Screen 
          name="Feed" 
          component={FeedScreen} 
          options={{ title: 'Mural da Turma' }} 
        />
        <Stack.Screen 
          name="NovoPost" 
          component={NovoPostScreen} 
          options={{ title: 'Nova Postagem' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}