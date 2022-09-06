import {TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import {useNavigation} from '@react-navigation/native'

const BackButton = () => {
  const {goBack} = useNavigation()

  return (
    <TouchableOpacity onPress={() => goBack()}>
      <Icon name="close" size={20} color={'black'} />
    </TouchableOpacity>
  )
}

export default BackButton
