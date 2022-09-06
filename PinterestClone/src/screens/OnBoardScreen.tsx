import {Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import Logo from 'react-native-vector-icons/Entypo'
import CustomButton from '../components/CustomButton'

const OnBoardScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.imagesContainer}>
        <View style={styles.rowContainer}>
          <Image
            style={styles.image}
            source={require('../images/image01.png')}
          />
          <Image
            style={styles.image}
            source={require('../images/image02.png')}
          />
          <Image
            style={styles.image}
            source={require('../images/image04.png')}
          />
        </View>

        <View style={styles.rowContainer}>
          <Image
            style={styles.image}
            source={require('../images/image07.png')}
          />
          <Image
            style={styles.image}
            source={require('../images/image10.png')}
          />
          <Image
            style={styles.image}
            source={require('../images/image08.png')}
          />
        </View>

        <View style={styles.rowContainer}>
          <Image
            style={styles.image}
            source={require('../images/image13.png')}
          />
          <Image
            style={styles.image}
            source={require('../images/image11.png')}
          />
          <Image
            style={styles.image}
            source={require('../images/image14.png')}
          />
        </View>
      </View>
      <View style={styles.welcomeContainer}>
        <Image style={styles.bgImage} source={require('../images/bg.png')} />

        <View style={styles.logoContainer}>
          <Logo name="pinterest" size={60} color="white" />
        </View>

        <Text style={styles.title}>We welcome you to this prototype</Text>

        <CustomButton
          title="Register"
          screenName="Registration"
          backgroundColor="#CC3334"
          textColor="white"
        />

        <CustomButton
          title="Log in"
          screenName="Login"
          backgroundColor="#e4e4e4"
          textColor="black"
        />

        <Text style={styles.description}>
          By continuing, you agree to the Terms of Service and confirm that you
          have read our Privacy Policy
        </Text>
      </View>
    </View>
  )
}

export default OnBoardScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  imagesContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '60%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowContainer: {
    height: '100%',
    width: '30%',
    marginHorizontal: 5,
  },
  image: {
    marginBottom: 5,
  },
  welcomeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '50%',
    alignItems: 'center',
  },
  bgImage: {
    position: 'absolute',
  },
  logoContainer: {
    backgroundColor: '#CC3334',
    borderRadius: 45,
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    width: 200,
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    color: 'black',
    width: '80%',
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    position: 'absolute',
    bottom: 15,
  },
})
