import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import HomeStack from './HomeStack'
import LoginStack from './LoginStack'

const Navigation = () => {
  return (
    <NavigationContainer>
      {/*<HomeStack />*/}
      <LoginStack />
    </NavigationContainer>
  )
}

export default Navigation
