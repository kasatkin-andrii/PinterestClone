import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native'

interface CustomButtonProps {
  title: string
  screenName: string
  backgroundColor: string
  textColor: string
}

const CustomButton = ({
  title,
  screenName,
  backgroundColor,
  textColor,
}: CustomButtonProps) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: backgroundColor,
      width: '80%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      borderRadius: 30,
    },
    title: {
      color: textColor,
      fontSize: 18,
      fontWeight: '500',
    },
  })

  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(screenName)}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
