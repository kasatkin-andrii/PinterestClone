import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import DiscoveryScreen from '../screens/DiscoveryScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Tab = createBottomTabNavigator()

const HomeStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Discovery" component={DiscoveryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default HomeStack
