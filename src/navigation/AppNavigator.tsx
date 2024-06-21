import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import ListadoScreen from '../screens/ListScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="List" component={ListadoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
