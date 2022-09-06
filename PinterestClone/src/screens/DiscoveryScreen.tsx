import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

const DiscoveryScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Discovery</Text>
    </View>
  )
}

export default DiscoveryScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
