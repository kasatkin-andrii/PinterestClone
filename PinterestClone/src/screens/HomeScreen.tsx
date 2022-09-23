import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'
import React, {useEffect, useState} from 'react'
import firestore from '@react-native-firebase/firestore'

export interface PinProps {
  id: string
  description: string
  title: string
  imageUrl: string
  userId: string
  userName: string
  userImage: string
}

const HomeScreen = ({navigation}: any) => {
  const [pins, setPins] = useState<PinProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    //initLatestPins()
    const subscribeToPins = firestore()
      .collection('pins')
      .onSnapshot(onResult, onError)

    return () => subscribeToPins()
  }, [])

  const onResult = (querySnapshot: any) => {
    //console.log(querySnapshot.docs.map((doc: any) => doc.data()))
    setPins(() =>
      querySnapshot.docs.map(
        (doc: any) =>
          ({
            ...doc.data(),
            id: doc.id,
          } as PinProps),
      ),
    )
    setIsLoading(() => false)
  }

  const onError = (error: any) => {
    console.log(error)
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  const renderPhotoItem = ({item}: any) => (
    <Pressable
      onPress={() => navigation.navigate('Pin', {pinId: item.id})}
      style={styles.imageContainer}>
      <Image source={{uri: item.imageUrl}} style={styles.image} />
    </Pressable>
  )

  return (
    <View style={styles.root}>
      <View style={styles.imagesContainer}>
        <FlatList
          data={pins}
          renderItem={renderPhotoItem}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  text: {
    fontSize: 35,
    color: 'black',
  },
  image: {
    height: 170,
    width: 170,
    borderRadius: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagesContainer: {
    width: '100%',
  },
  imageContainer: {
    width: '50%',
    alignItems: 'center',
    marginBottom: 10,
  },
})
