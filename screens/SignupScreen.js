import React from 'react';
import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView } from 'react-native';
import {AuthContext} from '../App';
import FlateeSignUpForm from '../components/FlateeSignUpForm';
import FlatSignUpForm from '../components/FlatSignUpForm';
import { Role } from '../components/role';
import SignUpForm from '../components/SignUpForm';
import RadioForm from 'react-native-simple-radio-button';

export default function SignUpScreen({ navigation }) {
    const [formData, setFormData] = React.useState(null);
    const [flatFormData, setFlatFormData] = React.useState(null);
    const [flateeFormData, setFlateeFormData] = React.useState(null);
    const [accountType, onChangeType] = React.useState(Role.Flatee);

    const { signUp } = React.useContext(AuthContext);

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <ScrollView> 
            <SignUpForm setFormData={setFormData} />
            {/* <RadioForm // https://www.npmjs.com/package/react-native-simple-radio-button
              radio_props={[{label: 'I\'m looking for a Flat', value: 'flatee' }, {label: 'I\'m looking for a Flatmate', value: 'flat' }]}
              initial={'flatee'}
              onPress={(value) => {onChangeType(value)}}
            />
            {accountType == Role.Flatee ? 
              // Display Flatee Form
              <FlateeSignUpForm setFlateeFormData={setFlateeFormData} /> : 
              // Or else you want to be a Flat
              <FlatSignUpForm setFlatFormData={setFlatFormData} />} */}
            <Button 
                onPress={() => signUp({})}  
                title="Sign Up"
            />  
            <Button      
              title="Sign In"     
              onPress={() =>        
                navigation.navigate('SignIn')      
              }    
            />
        </ScrollView>
        </SafeAreaView>
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
