import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import React from 'react'

interface SocialButtonProps {
  title: string
  pressFunc: () => void
  Icon: () => JSX.Element
}

const SocialButton = ({title, pressFunc, Icon}: SocialButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => pressFunc()}>
      <Icon />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default SocialButton

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#232323',
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  text: {
    color: '#CC3334',
    marginLeft: 10,
  },
})
