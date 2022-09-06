import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Hello</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 35,
    color: 'black',
  },
  cont: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-around',
  },
})
