// ProfileStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native'; // Add this line
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';
import FAQsScreen from '../screens/FAQsScreen';
import ContactScreen from '../screens/ContactScreen';

const Stack = createStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="ProfileDetails" 
        component={ProfileScreen} 
      />
      <Stack.Screen 
        name="about" 
        component={AboutScreen} 
        options={({ navigation }) => ({
          headerShown: true,
          title: "About Us",
          headerLeft: () => (
            // Add a back button
            <Button 
              title="Back" 
              onPress={() => {navigation.goBack()}} 
            />
          )
        })} 
      />
    <Stack.Screen 
        name="faqs" 
        component={FAQsScreen} 
        options={({ navigation }) => ({
          headerShown: true,
          title: "FAQs",
          headerLeft: () => (
            // Add a back button
            <Button 
              title="Back" 
              onPress={() => {navigation.goBack()}} 
            />
          )
        })} 
      />
    <Stack.Screen 
        name="contact" 
        component={ContactScreen} 
        options={({ navigation }) => ({
          headerShown: true,
          title: "Contact Us",
          headerLeft: () => (
            // Add a back button
            <Button 
              title="Back" 
              onPress={() => {navigation.goBack()}} 
            />
          )
        })} 
      />
    </Stack.Navigator>
  );
}

export default ProfileStack;
