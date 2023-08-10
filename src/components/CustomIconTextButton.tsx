import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CustomIconTextButtonProps {
  text: string;
  icon: string;
  onPress: () => void;
}

const CustomIconTextButton: React.FC<CustomIconTextButtonProps> = ({
  text,
  icon,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Icon name={icon} size={20} color="#000"></Icon>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#D6D2D5',
    borderRadius: 8,
    margin: 10,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default CustomIconTextButton;
