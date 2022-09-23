import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import React, {useState} from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import CustomModalPicker from '../components/CustomModalPicker'
import {uploadImage} from '../helper'
import firestore from '@react-native-firebase/firestore'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/store'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const CreatePinScreen = () => {
  const [editImageVisible, setEditImageVisible] = useState(false)

  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const {id, displayName, photoUrl} = useSelector(
    (state: RootState) => state.user,
  )

  const pickImage = (path: string) => {
    setImageUrl(() => path)
  }

  const postingPin = async () => {
    if (imageUrl !== '' && title !== '') {
      try {
        setLoading(() => true)
        const url = await uploadImage(imageUrl)

        const newPin = {
          userId: id,
          userName: displayName,
          userImage: photoUrl,
          title,
          description,
          imageUrl: url,
        }

        await firestore().collection('pins').add(newPin)

        setTitle(() => '')
        setDescription(() => '')
        setImageUrl(() => '')
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(() => false)
      }
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <KeyboardAwareScrollView>
        <Pressable
          onPress={() => setEditImageVisible(() => true)}
          style={styles.chooseImgButton}>
          <Text style={styles.btnText}>Choose Image</Text>
          <EvilIcons name="arrow-down" size={25} color={'black'} />
        </Pressable>
        {imageUrl !== '' ? (
          <Image source={{uri: imageUrl}} style={styles.image} />
        ) : null}
        <TextInput
          placeholder="Enter the title..."
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="black"
          style={styles.input}
        />
        <TextInput
          placeholder="Description..."
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="black"
          multiline
          style={[styles.input, styles.descriptionInput]}
        />
        <Pressable onPress={postingPin} style={styles.postBtn}>
          <Text style={styles.postBtnText}>Post</Text>
        </Pressable>
        <CustomModalPicker
          editImageVisible={editImageVisible}
          setEditImageVisible={setEditImageVisible}
          customCallback={pickImage}
        />
      </KeyboardAwareScrollView>
    </View>
  )
}

export default CreatePinScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    marginBottom: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  chooseImgButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginVertical: 5,
  },
  postBtn: {
    position: 'absolute',
    top: 5,
    right: 10,
    backgroundColor: '#CC3334',
    padding: 5,
    borderRadius: 10,
  },
  postBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#e4e4e4',
    margin: 10,
    borderRadius: 20,
    fontSize: 16,
    paddingHorizontal: 20,
    textAlignVertical: 'top',
    marginTop: 5,
    paddingTop: 15,
    color: 'black',
  },
  descriptionInput: {
    minHeight: 100,
    maxHeight: 300,
  },
})
