// contexts/UserProvider.js
import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';
import * as SecureStore from 'expo-secure-store';

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedData = await SecureStore.getItemAsync('userData');
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
    };
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
