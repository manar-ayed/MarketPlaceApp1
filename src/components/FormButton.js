import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
//import {windowHeight, windowWidth} from '../utils/Dimentions';
import { Dimensions } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
const FormButton = ({buttonTitle, ...rest}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#1A7EFC',
    // backgroundColor: 'linear-gradient(90deg, rgba(32,0,36,1) 0%, rgba(118,13,165,1) 0%, rgba(162,70,211,1) 44%, rgba(186,68,183,1) 83%, rgba(255,0,164,1) 100%)',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Lato-Regular',
  },
});