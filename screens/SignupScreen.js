import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {AuthContext} from '../App';

export default function SignUpScreen() {
    const [username, onChangeUsername] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
    const { signIn } = React.useContext(AuthContext);

    return (
        <View style={styles.container}> 
            <Text style={styles.title}>Sign Up</Text>
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
                onPress={() => signIn({ username, password })}  
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
