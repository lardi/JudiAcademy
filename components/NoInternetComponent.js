// NoInternetComponent.js
import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import useNetwork from '../hooks/useNetwork.js';
import IMAGES from '../constants/Images.js';

const NoInternetComponent = ({ onConnectionChange }) => {
  const isConnected = useNetwork();

  useEffect(() => {
    onConnectionChange(isConnected);
  }, [isConnected]);

  return (
    <View>
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>No Internet Connection</Text>
      </View>
      <View>
        <Image source={IMAGES.OFFLINE} style={styles.image} />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  overlay: {
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: 40,
    backgroundColor: 'rgba(255,165,0,0.6)', // Semi-transparent orange
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // Ensure it's above other components
  },
  overlayText: {
    fontSize: 18,
    color: 'white',
  },
  image: {
    width: '100%',
    resizeMode: 'center'
  }
});

export default NoInternetComponent;
