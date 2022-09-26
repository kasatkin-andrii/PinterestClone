import {NavigationContainer} from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import HomeStack from './HomeStack'
import LoginStack from './LoginStack'
import {RootState} from '../redux/store'
import auth from '@react-native-firebase/auth'
import {useDispatch} from 'react-redux'
import {setUser} from '../redux/userSlice'
import firestore from '@react-native-firebase/firestore'
import {ActivityIndicator, View} from 'react-native'

const Navigation = () => {
  const email = useSelector((state: RootState) => state.user.email)

  const dispatch = useDispatch()

  const [initializing, setInitializing] = useState(true)

  const onAuthChanged = (user: any) => {
    user
      ? getUserDB(user)
      : dispatch(
          setUser({
            userId: null,
            username: null,
            email: null,
            userImage: null,
            pins: [],
          }),
        )

    if (initializing) {
      setInitializing(false)
    }
  }

  const onUserChanged = (user: any) => {
    console.log('User changes')
    console.log(user)
    if (user) {
      getUserDB(user)
    }
  }

  const getUserDB = async (User: any) => {
    try {
      //console.log(User)
      const dbUser = await firestore().collection('users').doc(User.uid).get()

      const oldUser = dbUser.data()

      if (oldUser) {
        console.log('Old user')
        console.log(oldUser)
        dispatch(
          setUser({
            userId: oldUser.userId,
            username: oldUser.username,
            email: oldUser.email,
            userImage: oldUser.userImage,
            pins: oldUser.pins,
          }),
        )
      } else {
        await firestore().collection('users').doc(User.uid).set({
          userId: User.uid,
          username: User.displayName,
          email: User.email,
          userImage: User.photoURL,
          pins: [],
        })

        dispatch(
          setUser({
            userId: User.uid,
            username: User.displayName,
            email: User.email,
            userImage: User.photoURL,
            pins: [],
          }),
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthChanged)

    return subscriber // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const subscriber = auth().onUserChanged(onUserChanged)

    return subscriber // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (initializing) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={'black'} />
      </View>
    )
  }

  return (
    <NavigationContainer>
      {email ? <HomeStack /> : <LoginStack />}
    </NavigationContainer>
  )
}

export default Navigation
