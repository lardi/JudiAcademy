import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NoInternetComponent from '../components/NoInternetComponent';
import CoursesListComponent from '../components/CoursesListComponent';

export default function CoursesScreen() {
  const [isConnected, setIsConnected] = useState(true);

  const handleConnectionChange = (connectionStatus) => {
    setIsConnected(connectionStatus);
  }

  return (
    <View style={styles.container}>
      {isConnected ?
        <CoursesListComponent />
        :
        <NoInternetComponent onConnectionChange={handleConnectionChange} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
