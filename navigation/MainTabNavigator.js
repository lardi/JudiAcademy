import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyLearningScreen from '../screens/MyLearningScreen';
import CourseScreen from '../screens/CourseScreen';
import ProfileStack from './ProfileStack';
import ICONS from '../constants/Icons';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  return (
    <Tab.Navigator 
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          display: isTabBarVisible ? 'flex' : 'none',
        },
      }}
    >
      <Tab.Screen
        name="Courses"
        component={CourseScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image 
              source={ICONS.HOME}  // Adjust the path to your image
              style={{ ...styles.icon, tintColor: color }}    // Adjust size and color as per your needs
            />
          )
        }}
      />
      <Tab.Screen
        name="My Learning"
        component={MyLearningScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image 
              source={ICONS.CALENDAR}  // Adjust the path to your image
              style={{ ...styles.icon, tintColor: color }}    // Adjust size and color as per your needs
            />
          )
        }}

      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack}
        listeners={({ route }) => ({
        state: (data) => {
              if (
                  route.state && 
                  route.state.routes[1] && 
                  ['about', 'contact', 'faqs'].includes(route.state.routes[1].name)
              ) {
                  setIsTabBarVisible(false);
              } else {
                  setIsTabBarVisible(true);
              }
            }
        })}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image 
              source={ICONS.PROFILE}  // Adjust the path to your image
              style={{ ...styles.icon, tintColor: color }}    // Adjust size and color as per your needs
            />
          )
        }}
    />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  }
})
