import React from 'react';
import axios from 'axios';
import Config from 'react-native-config';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
const api_url = 'http://localhost:4000';

export default function SignInScreen() {
    const [username, onChangeUsername] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
    const [attempts, setAttempt] = React.useState(0);

    function signin() {
        console.log(`Trying to sign in to ${api_url}/users/authenticate with ${username} and ${password}`)
        axios.post(`${api_url}/users/authenticate`, { username: username, password: password})
        .then(function (response) {
            console.log(response);
            // Check content of response
            SecureStore.setItemAsync('token', response.data.token);
            // Backend token set to expier after 7 days
            SecureStore.setItemAsync('token-expiration', Date.now + 7);
            setAttempt(attempts + 1);
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    return (
        <View style={styles.container}> 
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
                autoCapitalize='none'
                placeholder="Username" 
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                autoCapitalize='none'
                placeholder="Password"
                secureTextEntry
            />
            <Button 
                onPress={() => signin()}  
                title="Sign In"
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
  },
  input: {
    height: 40,
    width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
