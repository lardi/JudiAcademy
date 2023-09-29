//DashboardComponent.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import LoginComponent from './LoginComponent';

const Dashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const token = await SecureStore.getItemAsync('userToken');
                const user = await SecureStore.getItemAsync('userData');
                if (token && user) {
                    setIsLoggedIn(true);
                    setUserData(JSON.parse(user));
                }
            } catch (error) {
                console.error("Error fetching data from SecureStore:", error);
            }
        })();
    }, []);
    
    const handleLogout = async () => {
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userData');
        setIsLoggedIn(false);
        setUserData(null);
    };

    if (isLoggedIn && userData) {
        return (
            <View style={{ alignItems: 'center' }}>
                <Image source={{ uri: userData.photoURL }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                <Text>{userData.name}</Text>
                <Button title="Logout" onPress={handleLogout} />
            </View>
        );
    } else {
        return <LoginComponent setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />;
    }
};

export default Dashboard;
