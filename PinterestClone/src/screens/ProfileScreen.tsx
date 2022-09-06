import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/store'
import auth from '@react-native-firebase/auth'

const ProfileScreen = () => {
  const {email, displayName} = useSelector((state: RootState) => state.user)

  const signOut = async () => {
    await auth().signOut()
  }

  return (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <Text style={styles.label}>
          {displayName !== null ? displayName[0] : null}
        </Text>
      </View>
      <Text style={styles.displayName}>{displayName}</Text>
      <Text style={styles.email}>{email}</Text>
      <TouchableOpacity onPress={signOut}>
        <Text style={styles.text}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  label: {
    color: 'black',
    fontSize: 75,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  email: {
    color: 'black',
    fontSize: 16,
    marginBottom: 280,
  },
  displayName: {
    color: 'black',
    fontSize: 26,
    fontWeight: '500',
    marginBottom: 10,
  },
  imageContainer: {
    backgroundColor: 'gray',
    width: 150,
    height: 150,
    marginTop: 100,
    borderRadius: 75,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
