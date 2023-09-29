import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';



function AboutScreen({navigation}) {
  useEffect(() => {

      navigation.setOptions({ tabBarVisible: true });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>The Judi Academy</Text>
      <Text style={styles.subTitle}>About Us</Text>
      <Text style={styles.content}>
        In this age the “straight and narrow path” and the “high road” seem harder to find, even with Google maps. In an era where the influx of information has become so colossal, the planet has become flooded with facts and figures, to the point, that the average person is just swimming for their life…searching for “high ground” where they can catch their breath and get a better look at the world around them.
      </Text>
      <Text style={styles.content}>
        At this point in time, the world is looking for a guide to the “higher ground” where they will be safe from the tidal waves of the “disinformation age”. Hence, the Judi Academy has arisen as a beacon of hope in the middle of a dark ocean, providing the seekers of truth and salvation with the knowledge to circumnavigate the towering tsunamis of “fake news” and reach “higher ground.” Where they can intellectually observe everything going on in the world around them and then plot a “safe path” to reach the shore once the seas settle.
      </Text>
      <Text style={styles.content}>
        The Judi Academy strives to be the “first station” of safety for students making their way to the “higher ground” by providing them with the “know how” to secure themselves from the negative trends which pervade in today’s society through offering them carefully designed, highly efficient and inspirational courses using the latest technology and most up-to-date educational techniques. For as time goes on, only those who can reach the “high ground” will truly be able to decipher all that is happening down below; and in turn, safely navigate their way through today’s world.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'justify',
  }
});

export default AboutScreen;
