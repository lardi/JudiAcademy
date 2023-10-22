import React, { useState, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import NoInternetComponent from '../components/NoInternetComponent';
import UserContext from '../contexts/UserContext';

export default function MyLearningScreen() {

  const [isConnected, setIsConnected] = useState(true);
  const { userData, setUserData } = useContext(UserContext);

  return (
    <View style={{ flex: 1 }}>
      {console.log(userData)}
      {isConnected ?
        <>
          <Text>My Learning</Text>
          {userData && userData.userEnrolledCourses && Array.isArray(userData.userEnrolledCourses) ? 
            <FlatList
              data={userData.userEnrolledCourses}
              keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
              renderItem={({ item }) => (
                <View style={{ padding: 10, borderBottomColor: '#ddd', borderBottomWidth: 1 }}>
                {console.log(item)}
                  <Text>{item.title}</Text>
                </View>
              )}
            />
            :
            <Text>You're not enrolled in any courses yet.</Text>
          }
        </>
        :
        <NoInternetComponent onConnectionChange={setIsConnected} />
      }
    </View>
  );
}
