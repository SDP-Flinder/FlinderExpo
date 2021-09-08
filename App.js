import React, {useEffect, useState } from 'react';
import WelcomeScreen from './screens/welcomeScreen';
import SignInScreen from './components/Signin';
import * as SecureStore from 'expo-secure-store';

export default function App() {
    const [currentScreen, setCurrentScreen] = useState(<SignInScreen />)
    
    useEffect(() => {
      console.log('Checking token with useEffect');
      const token = SecureStore.getItemAsync('token');
      const tokenExp = SecureStore.getItemAsync('token-expiration');
      console.log('TokenExp: ' + tokenExp);
      if(token && tokenExp > Date.now()) {
        // setLoggedIn(true)
        setCurrentScreen(<WelcomeScreen />)
      } else {
        // setLoggedIn(false)
      }
    },[SignInScreen.attempts]);

    return (
        currentScreen
    );
};
