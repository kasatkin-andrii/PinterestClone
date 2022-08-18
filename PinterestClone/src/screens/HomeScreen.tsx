import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {decrement, increment} from '../redux/counterSlice'
import {RootState} from '../redux/store'

const HomeScreen = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <View style={styles.root}>
      <Text style={styles.text}>{count}</Text>
      <View style={styles.cont}>
        <TouchableOpacity onPress={() => dispatch(decrement())}>
          <Text style={styles.text}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(increment())}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      </View>
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
