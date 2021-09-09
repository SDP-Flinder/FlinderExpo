import React from 'react';
import { View, Button, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {AuthContext} from '../App';

export default function SignInScreen({ navigation }) {
    const [username, onChangeUsername] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
    const { signIn } = React.useContext(AuthContext);

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
        <Button      
          title="Sign Up"     
          onPress={() =>        
            navigation.navigate('SignUp')      
          }    
        />
      </View>
      </TouchableWithoutFeedback>
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
// const {
//   values,
//   touched,
//   errors,
//   isSubmitting,
//   handleChange,
//   handleBlur,
//   handleSubmit
// } = props;const {
//             values,
//             touched,
//             errors,
//             isSubmitting,
//             handleChange,
//             handleBlur,
//             handleSubmit
//           } = props;