// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './navigation/MainTabNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import UserProvider from './contexts/UserProvider';
import CourseProvider from './contexts/CourseProvider'; // Add this import

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <CourseProvider>
          <NavigationContainer>
            <MainTabNavigator />
          </NavigationContainer>
        </CourseProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
}

export default App;
