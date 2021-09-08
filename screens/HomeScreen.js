import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Role } from '../components/role';
import {AuthContext} from '../App';

const api_url = 'http://192.168.1.112:4000';

export default function HomeScreen() {
    const { signOut } = React.useContext(AuthContext);
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState('');
    
    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;
    
            try {
            userToken = await SecureStore.getItemAsync('token');
            
            console.log(`Trying to get current user data from to ${api_url}/users/current with Authorization: ${userToken}`);
            axios.get(`${api_url}/users/current`, { headers: { Authorization: `Bearer ${userToken}` }})
            .then(function (response) {
                // handle success
                console.log(response);
                setData(response.data)
            })
            .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log('*** Response Error ***');
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log('*** Request Error ***');
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('*** Other Axios Error ***');
                  console.log('Error', error.message);
                }
              })
            .finally(() => setLoading(false));
            } catch (e) {
            // Restoring token failed
            dispatch(addError(e.message));
            }
        };
        bootstrapAsync();
    },[])

    // predetermine role text to display
    function renderRoleText(role) {
        switch (role) {
            case Role.Admin:
                return <Text>You are an Admin</Text>;
            case Role.Flat:
                return <Text>You are looking for a Flatee</Text>;
            case Role.Flatee:
                return <Text>You are looking for a Flat</Text>;
            default:
                return <Text>Sorry, I don\'t know your role. Please try create a new account</Text>;
        }
    };

    // Don't like the above functions, is there any better way?
    return (
        <View>
        {isLoading ? <ActivityIndicator /> : <><Text>Hello {data.firstname}</Text><Button title="Sign out" onPress={signOut} /></>}
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
});

/*
{ <View style={styles.container} >
                <ActivityIndicator />
            </View>
        ) : (

            <View style={styles.container}>
                <Text>Hello, {data.firstname} {data.lastname}</Text>
                {renderRoleText(data.role)}
                <Button title="Sign out" onPress={signOut} />
            </View>
        )} }
*/