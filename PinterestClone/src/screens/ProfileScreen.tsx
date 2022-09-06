import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/store'
import auth from '@react-native-firebase/auth'

const ProfileScreen = () => {
  const email = useSelector((state: RootState) => state.user.email)

  const signOut = async () => {
    await auth().signOut()
  }

  return (
    <View style={styles.root}>
      <Text>{email}</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
