import storage from '@react-native-firebase/storage'

export const uploadImage = async (uploadImageUri: string) => {
  const fileName = uploadImageUri.substring(uploadImageUri.lastIndexOf('/') + 1)

  const extension = fileName.split('.').pop()
  const name = fileName.split('.').slice(0, 1).join('.')
  const fileUri = name + Date.now() + '.' + extension

  try {
    await storage().ref(fileUri).putFile(uploadImageUri)

    const url = await storage().ref(fileUri).getDownloadURL()

    console.log(url)

    return url
  } catch (error) {
    console.log(error)
  }
}
