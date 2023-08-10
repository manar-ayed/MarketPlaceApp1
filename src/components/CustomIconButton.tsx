import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CustomIconButtonProps {
  onPress: () => void;
  icon: string;
}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({onPress, icon}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={icon} size={20} color="#000"></Icon>
    </TouchableOpacity>
  );
};

export default CustomIconButton;
