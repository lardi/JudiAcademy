import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginComponent from '../../components/LoginComponent';
import DashboardComponent from '../../components/DashboardComponent';

const VERSION_NUMBER = "1.0.0";  // Adjust this to your actual version number.

const ProfileScreen = () => {
  
  // Using the navigation hook from React Navigation
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.smallTitle}>support:</Text>
      
      <TouchableOpacity 
        style={styles.item} 
        onPress={() => { navigation.removeListener; navigation.navigate('about')}}>
        <Text style={styles.itemText}>About The Judi Academy</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('faqs')}>
        <Text style={styles.itemText}>FAQs</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('contact')}>
        <Text style={styles.itemText}>Contact Us</Text>
      </TouchableOpacity>
      <DashboardComponent />
      <Text style={styles.version}>Version {VERSION_NUMBER}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  smallTitle: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 10,
  },
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemText: {
    fontSize: 16,
  },
  version: {
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
    color: 'gray'
  },
});

export default ProfileScreen;
