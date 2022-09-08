import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/store'
import auth from '@react-native-firebase/auth'
import ImageCropPicker from 'react-native-image-crop-picker'

const ProfileScreen = () => {
  const [editImageVisible, setEditImageVisible] = useState(false)

  const {email, displayName, photoUrl} = useSelector(
    (state: RootState) => state.user,
  )

  const signOut = async () => {
    await auth().signOut()
  }

  const takePhotoFromCamera = async () => {
    try {
      const {path} = await ImageCropPicker.openCamera({
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 300,
        cropping: true,
        compressImageQuality: 0.7,
      })

      await auth().currentUser?.updateProfile({photoURL: path})

      setEditImageVisible(() => false)
    } catch (error) {
      console.log(error)
    }
  }

  const chooseFromGallery = async () => {
    try {
      const {path} = await ImageCropPicker.openPicker({
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 300,
        cropping: true,
        compressImageQuality: 0.7,
      })

      await auth().currentUser?.updateProfile({photoURL: path})

      setEditImageVisible(() => false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => setEditImageVisible(() => true)}
        style={styles.imageContainer}>
        {photoUrl !== null ? (
          <Image source={{uri: photoUrl}} style={styles.image} />
        ) : (
          <Text style={styles.label}>
            {displayName !== null ? displayName[0].toUpperCase() : null}
          </Text>
        )}

        <Text style={styles.edit}>Edit</Text>
      </TouchableOpacity>
      <Text style={styles.displayName}>{displayName}</Text>
      <Text style={styles.email}>{email}</Text>
      <TouchableOpacity onPress={signOut}>
        <Text style={styles.text}>Sign out</Text>
      </TouchableOpacity>
      <Modal
        visible={editImageVisible}
        animationType={'slide'}
        transparent={true}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.modalSpaceClose}
            onPress={() => setEditImageVisible(() => false)}
          />
          <View style={styles.btnModalContainer}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>Upload Photo</Text>
              <Text style={styles.modalDecs}>Choose your profile picture</Text>
            </View>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={takePhotoFromCamera}>
              <Text style={styles.modalBtnText}>Take photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={chooseFromGallery}>
              <Text style={styles.modalBtnText}>Select from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setEditImageVisible(() => false)}>
              <Text style={styles.modalBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
})
