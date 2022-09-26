import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/store'
import auth from '@react-native-firebase/auth'
import CustomModalPicker from '../components/CustomModalPicker'
import {uploadImage} from '../helper'
import firestore from '@react-native-firebase/firestore'
import BackButton from '../components/BackButton'

interface ProfileUserProps {
  username: string
  email: string
  userImage: string
}

const ProfileScreen = ({route}: any) => {
  const [editImageVisible, setEditImageVisible] = useState(false)
  const [itsMe, setItsMe] = useState(false)
  const [user, setUser] = useState<ProfileUserProps>({} as ProfileUserProps)

  const {userId, email, username, userImage} = useSelector(
    (state: RootState) => state.user,
  )

  useEffect(() => {
    userId === route.params.userId
      ? setItsMe(() => true)
      : setItsMe(() => false)

    userId !== route.params.userId && loadUserDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params.userId])

  const loadUserDetails = async () => {
    const dbUser = await firestore()
      .collection('users')
      .doc(route.params.userId)
      .get()

    const newData = dbUser.data()

    if (newData) {
      setUser(() => ({
        username: newData.username,
        email: newData.email,
        userImage: newData.userImage,
      }))
    }
  }

  const signOut = async () => {
    await auth().signOut()
  }

  const uploadAndUpdateProfile = async (path: string) => {
    const url = await uploadImage(path)

    await firestore().collection('users').doc(userId!!).update({
      userImage: url,
    })

    await auth().currentUser?.updateProfile({photoURL: url})
  }

  console.log(itsMe)

  return (
    <View style={styles.root}>
      {itsMe ? (
        <TouchableOpacity
          onPress={() => setEditImageVisible(() => true)}
          style={styles.imageContainer}>
          {userImage !== null ? (
            <Image source={{uri: userImage}} style={styles.image} />
          ) : (
            <Text style={styles.label}>
              {username !== null ? username[0].toUpperCase() : null}
            </Text>
          )}

          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.imageContainer}>
          {user.userImage !== null ? (
            <Image source={{uri: user?.userImage}} style={styles.image} />
          ) : (
            <Text style={styles.label}>
              {user?.username !== null ? user?.username[0].toUpperCase() : null}
            </Text>
          )}
        </View>
      )}
      <Text style={styles.displayName}>{itsMe ? username : user.username}</Text>
      <Text style={styles.email}>{itsMe ? email : user.email}</Text>
      {itsMe ? (
        <TouchableOpacity onPress={signOut}>
          <Text style={styles.text}>Sign out</Text>
        </TouchableOpacity>
      ) : null}
      <CustomModalPicker
        editImageVisible={editImageVisible}
        setEditImageVisible={setEditImageVisible}
        customCallback={uploadAndUpdateProfile}
      />

      {route.params.fromHomePage ? (
        <View style={styles.backButton}>
          <BackButton size={30} />
        </View>
      ) : null}
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
    fontSize: 15,
    marginBottom: 280,
  },
  displayName: {
    color: 'black',
    fontSize: 26,
    fontWeight: '500',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
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
  edit: {
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 150,
    height: 75,
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderBottomRightRadius: 75,
    borderBottomLeftRadius: 75,
    fontSize: 20,
    fontWeight: '600',
  },
  modal: {
    backgroundColor: 'rgba(255,255,255, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  btnModalContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    height: 220,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalBtn: {
    backgroundColor: '#CC3334',
    width: '70%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  modalBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalTitleContainer: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: '500',
    color: 'black',
  },
  modalDecs: {
    fontSize: 13,
    fontWeight: '400',
    color: 'gray',
  },
  modalSpaceClose: {
    flex: 1,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255, 0.25)',
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
})
