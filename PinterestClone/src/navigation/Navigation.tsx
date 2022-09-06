import {NavigationContainer} from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import HomeStack from './HomeStack'
import LoginStack from './LoginStack'
import {RootState} from '../redux/store'
import auth from '@react-native-firebase/auth'
import {useDispatch} from 'react-redux'
import {setUser} from '../redux/userSlice'

const Navigation = () => {
  const email = useSelector((state: RootState) => state.user.email)

  const dispatch = useDispatch()

  const [initializing, setInitializing] = useState(true)

  const onAuthChanged = (user: any) => {
    dispatch(
      setUser({
        id: user != null ? user.uid : null,
        email: user != null ? user.email : null,
        displayName: user != null ? user.displayName : null,
      }),
    )

    if (initializing) {
      setInitializing(false)
    }
  }

  const onUserChanged = (user: any) => {
    dispatch(
      setUser({
        id: user != null ? user.uid : null,
        email: user != null ? user.email : null,
        displayName: user != null ? user.displayName : null,
      }),
    )
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthChanged)

    return subscriber // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const changeUser = auth().onUserChanged(onUserChanged)

    return changeUser
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (initializing) {
    return null
  }

  return (
    <NavigationContainer>
      {/* <HomeStack /> */}
      {email ? <HomeStack /> : <LoginStack />}
    </NavigationContainer>
  )
}

export default Navigation
