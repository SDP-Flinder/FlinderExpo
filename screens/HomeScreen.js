import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';
import * as SecureStore from 'expo-secure-store';
import { Role } from '../components/role';

const AuthContext = React.createContext();

export default function HomeScreen() {
    const { signOut } = React.useContext(AuthContext);
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
    // function renderRoleText(role) {
    //     switch (role) {
    //         case Role.Admin:
    //             return 'You are an Admin';
    //         case Role.Flat:
    //             return 'You are looking for a Flatee';
    //         case Role.Flatee:
    //             return 'You are looking for a Flat';
    //         default:
    //             return 'Sorry, I don\'t know your role. Please try create a new account';
    //     }
    // };

    // Don't like the above functions, is there any better way?
    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    )
    //     if (isLoading ) {
    //         <View style={styles.container} >
    //             <ActivityIndicator />
    //         </View>
    //     } else {
    //         <View style={styles.container}>
    //             <Text>Hello, {data.firstname} {data.lastname}</Text>,
    //             <Text>{renderRoleText(data.role)}</Text>
    //             <Button title="Sign out" onPress={signOut} />
    //         </View>
    //     }
    // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});