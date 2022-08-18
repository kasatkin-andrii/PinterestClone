import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {useDispatch} from 'react-redux'
import {incrementByAmount} from '../redux/counterSlice'

const DiscoveryScreen = () => {
  const dispatch = useDispatch()
  return (
    <View>
      <TouchableOpacity onPress={() => dispatch(incrementByAmount(10))}>
        <Text>Increment by 10</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DiscoveryScreen

const styles = StyleSheet.create({})
