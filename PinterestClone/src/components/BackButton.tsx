import {TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import {useNavigation} from '@react-navigation/native'

const BackButton = ({size = 20}) => {
  const {goBack} = useNavigation()

  return (
    <TouchableOpacity onPress={() => goBack()}>
      <Icon name="close" size={size} color={'black'} />
    </TouchableOpacity>
  )
}

export default BackButton
