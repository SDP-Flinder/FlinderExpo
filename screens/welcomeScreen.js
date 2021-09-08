import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';
import * as SecureStore from 'expo-secure-store';
import { Role } from '../components/role';

export default function WelcomeScreen() {
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState(null);

    useEffect(() => {
        Axios.get(`${Config.LOCAL_API_URL}/users/current`, { headers: { 'Authorization': SecureStore.getItemAsync('token')}})
        .then(({ data }) => {
            setData(data.user)
        })
        .catch((error) => console.error(error)) //FIXME: not great error handling
        .finally(() => setLoading(false));
    },[])

    // predetermine role text to display
    function renderRoleText(role) {
        switch (role) {
            case Role.Admin:
                return 'You are an Admin';
            case Role.Flat:
                return 'You are looking for a Flatee';
            case Role.Flatee:
                return 'You are looking for a Flat';
            default:
                return 'Sorry, I don\'t know your role. Please try create a new account';
        }
    };

    function renderWelcome() {
        return (
            <Text>Hello, {data.firstname} {data.lastname}</Text>,
            <Text>{renderRoleText(data.role)}</Text>
        )
    };

    return (
        <View style={styles.container}>
            { isLoading ? <ActivityIndicator /> : {renderWelcome} }
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