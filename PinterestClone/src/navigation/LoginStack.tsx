import React, {useEffect} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import RegistrationScreen from '../screens/RegistrationScreen'
import OnBoardScreen from '../screens/OnBoardScreen'
import BackButton from '../components/BackButton'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import {WEB_CLIENT_ID} from '@env'

type LoginStackParamList = {
  OnBoard: undefined
  Login: undefined
  Registration: undefined
}

const Stack = createNativeStackNavigator<LoginStackParamList>()

const LoginStack = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    })
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: () => <BackButton />,
      }}>
      <Stack.Screen
        name="OnBoard"
        component={OnBoardScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: 'Log in',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 15,
            fontWeight: '500',
          },
        }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{
          headerTitle: 'Register',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 15,
            fontWeight: '500',
          },
        }}
      />
    </Stack.Navigator>
  )
}

export default LoginStack
