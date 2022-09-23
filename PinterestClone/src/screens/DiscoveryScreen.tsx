import {
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useState} from 'react'
import DiscoverIcon from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/AntDesign'

interface ImagesProps {
  id: string
  width: number
  height: number
  url: string
}

const DiscoveryScreen = () => {
  const [searchText, setSearchText] = useState('')
  const [showSearchIcon, setShowSearchIcon] = useState(true)

  const [images, setImages] = useState<ImagesProps[]>([])

  const clearSearchInput = () => setSearchText(() => '')

  const submit = async () => {
    if (searchText !== '') {
      try {
        //   const url = 'https://google-images1.p.rapidapi.com/search'
        //   const {data} = await axios({
        //     method: 'GET',
        //     url: url,
        //     params: {q: searchText},
        //     headers: {
        //       'X-RapidAPI-Key':
        //         'fe49b8756cmsh1316d21f559d7f7p1e6fe0jsn27d07f15e99c',
        //       'X-RapidAPI-Host': 'google-images1.p.rapidapi.com',
        //     },
        //   })
        //   //console.log(data.images)
        //   const tempData = data.images.map((item: any, index: number) => ({
        //     id: index,
        //     width: item.width,
        //     height: item.height,
        //     url: item.imageUrl,
        //   }))
        //   console.log(tempData)
        // setImages(() => tempData)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const renderPhotoItem = ({item}: any) => (
    <View style={styles.imageContainer}>
      <Image source={{uri: item.url}} style={styles.image} />
    </View>
  )

  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        {showSearchIcon ? (
          <DiscoverIcon name="search" size={18} color={'white'} />
        ) : null}
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          style={styles.input}
          placeholder={'Search'}
          placeholderTextColor={'white'}
          onFocus={() => setShowSearchIcon(() => false)}
          onBlur={() => setShowSearchIcon(() => true)}
          onSubmitEditing={submit}
        />
        <TouchableOpacity onPress={clearSearchInput}>
          <Icon name="closecircle" size={23} color={'#ffffff'} />
        </TouchableOpacity>
      </View>
      <View style={styles.imagesContainer}>
        <FlatList
          data={images}
          renderItem={renderPhotoItem}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </View>
    </View>
  )
}

export default DiscoveryScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    height: 40,
    paddingHorizontal: 18,
    backgroundColor: 'gray',
    borderRadius: 30,
  },
  input: {
    marginLeft: 10,
    color: 'white',
    flex: 1,
  },
  imagesContainer: {
    flex: 1,
    marginTop: 10,
  },
  imageContainer: {
    width: '50%',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    height: 170,
    width: 170,
    borderRadius: 15,
  },
})
