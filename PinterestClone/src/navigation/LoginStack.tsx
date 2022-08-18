import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import RegistrationScreen from '../screens/RegistrationScreen'

const Stack = createNativeStackNavigator()

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  )
}

export default LoginStack
