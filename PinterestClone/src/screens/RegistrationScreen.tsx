import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const RegistrationScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorText, setErrorText] = useState('')

  const [isSecureText, setIsSecureText] = useState(true)

  const switchSecureText = () => setIsSecureText(prev => !prev)

  const clearEmailInput = () => setEmail(() => '')

  const clearNameInput = () => setName(() => '')

  const nameIsValid = (varName: string) => /^[a-zA-Z\-]+$/.test(varName)

  const emailIsValid = (varEmail: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(varEmail)

  const passwordIsValid = (pass: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/.test(pass)

  const Registration = async () => {
    try {
      if (
        emailIsValid(email) &&
        passwordIsValid(password) &&
        nameIsValid(name)
      ) {
        setErrorText('')
        const {user} = await auth().createUserWithEmailAndPassword(
          email,
          password,
        )

        await user.updateProfile({
          displayName: name,
        })

        await firestore().collection('users').doc(user.uid).set({
          userId: user.uid,
          username: name,
          email: email,
          userImage: user.photoURL,
          pins: [],
        })
      } else {
        throw new Error('Email or password is invalid!')
      }
    } catch (error) {
      setErrorText('Email or password is invalid!')
    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={'black'}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            autoFocus
          />
          <TouchableOpacity onPress={clearNameInput}>
            <Icon
              style={styles.icon}
              name="closecircle"
              size={23}
              color={'#232323'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={'black'}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={clearEmailInput}>
            <Icon
              style={styles.icon}
              name="closecircle"
              size={23}
              color={'#232323'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={'black'}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isSecureText}
          />
          <TouchableOpacity onPress={switchSecureText}>
            <Icon style={styles.icon} name="eye" size={25} color={'#232323'} />
          </TouchableOpacity>
        </View>

        <Text style={styles.errorText}>{errorText}</Text>

        <TouchableOpacity
          onPress={() => Registration()}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RegistrationScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  methodContainer: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputsContainer: {
    height: 300,
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 20,
  },
  inputContainer: {
    backgroundColor: '#e4e4e4',
    width: '70%',
    height: 50,
    marginVertical: 5,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 20,
    color: 'black',
    fontSize: 15,
  },
  icon: {
    marginRight: 20,
  },
  buttonContainer: {
    backgroundColor: '#CC3334',
    marginTop: 20,
    width: '70%',
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
  errorText: {
    color: '#CC3334',
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
  },
})
