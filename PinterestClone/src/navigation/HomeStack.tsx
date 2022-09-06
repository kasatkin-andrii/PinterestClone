import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import DiscoveryScreen from '../screens/DiscoveryScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import HomeIcon from 'react-native-vector-icons/Entypo'
import DiscoverIcon from 'react-native-vector-icons/FontAwesome5'
import ProfileIcon from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator()

const HomeStack = () => {
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
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <HomeIcon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Discovery"
        component={DiscoveryScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <DiscoverIcon name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <ProfileIcon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default HomeStack
