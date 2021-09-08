// import React, {useEffect, useState } from 'react';
// import WelcomeScreen from './screens/welcomeScreen';
// import SignInScreen from './components/Signin';
// import * as SecureStore from 'expo-secure-store';

// export default function App() {
//     const [currentScreen, setCurrentScreen] = useState(<SignInScreen />)
    
//     useEffect(() => {
//       console.log('Checking token with useEffect');
//       const token = SecureStore.getItemAsync('token');
//       const tokenExp = SecureStore.getItemAsync('token-expiration');
//       console.log('TokenExp: ' + tokenExp);
//       if(token && tokenExp > Date.now()) {
//         // setLoggedIn(true)
//         setCurrentScreen(<WelcomeScreen />)
//       } else {
//         // setLoggedIn(false)
//       }
//     },[SignInScreen.attempts]);

//     return (
//         currentScreen
//     );
// };
import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SigninScreen';
// import SignUpScreen from './screens/SignupScreen';
import SplashScreen from './screens/SplashScreen';
// import ProfileScreen from './screens/ProfileScreen';

const AuthContext = React.createContext();
const api_url = 'http://localhost:4000';
const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('token');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        console.log(`Trying to sign in to ${api_url}/users/authenticate with ${username} and ${password}`)
        axios.post(`${api_url}/users/authenticate`, { username: data.username, password: data.password})
        .then(function (response) {
            console.log(response);
            let token = response.data.token;
            // Do we have to check content of response here?
            SecureStore.setItemAsync('token', token);
            // Backend token set to expier after 7 days
            SecureStore.setItemAsync('token-expiration', Date.now + 7);

            dispatch({ type: 'SIGN_IN', token: token });
        })
        .catch(function (error) {
            console.log(error);
        })
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
