import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import ImageCropPicker from 'react-native-image-crop-picker'

interface CustomModalPickerProps {
  editImageVisible: boolean
  setEditImageVisible: React.Dispatch<React.SetStateAction<boolean>>
  customCallback: (path: string) => void
}

const CustomModalPicker = ({
  editImageVisible,
  setEditImageVisible,
  customCallback,
}: CustomModalPickerProps) => {
  const takePhotoFromCamera = async () => {
    try {
      const {path} = await ImageCropPicker.openCamera({
        width: 400,
        height: 300,
        compressImageMaxWidth: 400,
        compressImageMaxHeight: 300,
        cropping: true,
        compressImageQuality: 0.7,
      })

      customCallback(path)

      setEditImageVisible(() => false)
    } catch (error) {
      console.log(error)
    }
  }

  const chooseFromGallery = async () => {
    try {
      const {path} = await ImageCropPicker.openPicker({
        width: 400,
        height: 300,
        compressImageMaxWidth: 400,
        compressImageMaxHeight: 300,
        cropping: true,
        compressImageQuality: 0.7,
      })

      customCallback(path)

      setEditImageVisible(() => false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
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
          <TouchableOpacity style={styles.modalBtn} onPress={chooseFromGallery}>
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
  )
}

export default CustomModalPicker

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(255,255,255, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 80,
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
