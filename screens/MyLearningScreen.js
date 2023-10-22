// MyLearningScreen.js
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import NoInternetComponent from '../components/NoInternetComponent';

export default function MyLearningScreen() {

  const [isConnected, setIsConnected] = useState(true);

  return (
    <View>
      {isConnected ?
        <Text>My Learning</Text>
        :
        <NoInternetComponent onConnectionChange={setIsConnected} />
      }
    </View>
  );
}