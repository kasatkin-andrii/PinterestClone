import {StyleSheet, Text, TextInput, View} from 'react-native'
import React, {useState} from 'react'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#212121',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    marginTop: 50,
  },
  inputContainer: {
    backgroundColor: '#232323',
    marginTop: 50,
    width: '70%',
    height: 400,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#878787',
    margin: 10,
    borderRadius: 15,
    textAlign: 'center',
  },
})
