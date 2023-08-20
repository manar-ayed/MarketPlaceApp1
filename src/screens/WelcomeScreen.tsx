import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Insérez l'URL ou le chemin de votre image d'accueil */}
      <Image
        source={require('../images/shopping-mobile.png')}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1A7EFC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '60%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
