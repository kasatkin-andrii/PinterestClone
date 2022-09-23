import {Image, Pressable, StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import firestore from '@react-native-firebase/firestore'
import {PinProps} from './HomeScreen'
import BackButton from '../components/BackButton'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/store'
import AntDesign from 'react-native-vector-icons/AntDesign'

const PinScreen = ({route, navigation}: any) => {
  const [pin, setPin] = useState<PinProps | null>(null)

  const {id} = useSelector((state: RootState) => state.user)

  useEffect(() => {
    initPin()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initPin = async () => {
    try {
      const dataPin = await firestore()
        .collection('pins')
        .doc(route.params.pinId)
        .get()

      //console.log(dataPin.data())

      setPin(() => dataPin.data() as PinProps)
    } catch (error) {
      console.log(error)
    }
  }

  const deletePin = async () => {
    try {
      await firestore().collection('pins').doc(route.params.pinId).delete()
    } catch (error) {
      console.log(error)
    } finally {
      navigation.goBack()
    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.pinContainer}>
        <Image source={{uri: pin?.imageUrl}} style={styles.image} />

        <View style={styles.profileContainer}>
          <Image source={{uri: pin?.userImage}} style={styles.profileImage} />
          <Text style={styles.userName}>{pin?.userName}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{pin?.title}</Text>
          <Text style={styles.description}>{pin?.description}</Text>
        </View>
      </View>

      <Text>{pin?.id}</Text>

      {id === pin?.userId ? (
        <Pressable onPress={deletePin} style={styles.deleteButton}>
          <AntDesign name="delete" size={25} color={'black'} />
        </Pressable>
      ) : null}

      <View style={styles.backButton}>
        <BackButton size={30} />
      </View>
    </View>
  )
}

export default PinScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'rgba(255,255,255, 0.25)',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  pinContainer: {
    borderColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userName: {
    marginLeft: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
  },
  title: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 5,
  },
  description: {
    color: 'black',
    fontSize: 16,
    fontWeight: '300',
    marginTop: 10,
  },
  textContainer: {
    paddingHorizontal: 10,
    width: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 10,
    backgroundColor: 'rgba(255,255,255, 0.25)',
    borderRadius: 10,
    padding: 4,
  },
})
