import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import DiscoveryScreen from '../screens/DiscoveryScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CreatePinScreen from '../screens/CreatePinScreen'
import ChatScreen from '../screens/ChatScreen'
import {StyleSheet, View} from 'react-native'
import PinScreen from '../screens/PinScreen'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/store'

type HomeStackParamList = {
  HomeScreen: undefined
  Pin: {pinId: string}
  Profile: {userId: string; fromHomePage: boolean}
}

const Tab = createBottomTabNavigator()

const Stack = createNativeStackNavigator<HomeStackParamList>()

const HomeNativeStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="Pin" component={PinScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
)

const HomeStack = () => {
  const {userId} = useSelector((state: RootState) => state.user)

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNativeStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Discovery"
        component={DiscoveryScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create Pin"
        component={CreatePinScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <View style={styles.createPin}>
              <FontAwesome5 name="plus" size={size + 10} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="chat" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
        initialParams={{userId: userId, fromHomePage: false}}
      />
    </Tab.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({
  createPin: {
    position: 'absolute',
    top: -20,
    backgroundColor: '#f1f1f1',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
  },
})
