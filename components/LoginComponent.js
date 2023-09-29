//LoginComponent.js
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Button } from 'react-native';
import Modal from 'react-native-modal';
import { login, getUserInfo } from '../services/WPService';
import * as SecureStore from 'expo-secure-store';



const LoginComponent = ({ setIsLoggedIn, setUserData }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const validateEmail = (email) => {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return pattern.test(email);
    };


    const handleSubmit = async () => {
        if (!validateEmail(username)) {
            setEmailError('Please enter a valid email address');
            return;
        }
    
        try {
            const response = await login(username, password);
    
            if (response && response.token) {
                await SecureStore.setItemAsync('userToken', response.token);
                const userInfo = await getUserInfo(response.token);
                // Now, store this fetched userInfo to SecureStore
                await SecureStore.setItemAsync('userData', JSON.stringify(userInfo));
                setIsLoggedIn(true);
                setUserData(userInfo);
                toggleModal();
            } else {
                // Handle other potential errors or situations.
            }
        } catch (error) {
            console.log(error);
        }
    };
        
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={toggleModal}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible} hardwareAccelerated={true} style={styles.modal}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>

                    <Text style={styles.headerText}>Sign In</Text>
                    <Text style={styles.paragraph}>your next lesson is waiting for you</Text>
                    <Text style={styles.inputTitle}>Email</Text>
                    <TextInput
                        placeholder="Enter your email"
                        value={username}
                        onChangeText={(text) => {
                            setUsername(text);
                            setEmailError(''); // Clear error
                        }}
                        style={styles.input}
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        style={styles.input}
                    />
                    <Button title="Submit" onPress={handleSubmit} />
                    <TouchableOpacity style={styles.forgotPasswordButton}>
                        <Text style={styles.forgotPasswordText}>Forgotten password?</Text>
                    </TouchableOpacity>

                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpText}>Don't have an account? </Text>
                        <TouchableOpacity>
                            <Text style={styles.signUpLinkText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
},
button: {
    backgroundColor: '#dedede',
    width: '100%',
    padding: 10
},
buttonText: {
    textAlign: 'center'
},
modal: {
    margin: 0,
    flex: 1,
    justifyContent: 'center'
},
modalContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'start',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
},
closeButton: {
    position: 'absolute',
    top: 50,
    left: 50
},
closeButtonText: {
    fontSize: 24
},
headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
},
paragraph: {
    marginVertical: 10,
    textAlign: 'center'
},
input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 10,
    paddingVertical: 5
},
inputTitle: {
    marginTop: 20,
    marginBottom: 5,
    fontWeight: 'bold'
},
forgotPasswordButton: {
    marginTop: 15,
    alignSelf: 'center'
},
forgotPasswordText: {
    color: '#007AFF',
},
signUpContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center'
},
signUpText: {
    fontSize: 14
},
signUpLinkText: {
    fontSize: 14,
    color: '#007AFF'
},
errorText: {
        color: 'red',
        marginTop: 5
    }
});

export default LoginComponent;

