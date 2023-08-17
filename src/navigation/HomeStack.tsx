import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from '../navigation/AuthProvider';

import HomeScreen from '../screens/HomeScreen';
import FavoriScreen from '../screens/FavoriScreen';

import DetailsScreen from '../screens/DetailsScreen';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {useNavigation} from '@react-navigation/native';
import CartScreen from '../screens/CartScreen';

import {useContext} from 'react';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  const navigation = useNavigation();
  const showProductsCart = () => {
    navigation.navigate('cart');
  };
  const {logout} = useContext(AuthContext);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={showProductsCart}>
                <Icon name="shopping-cart" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 15}} onPress={logout}>
                <Icon name="sign-out" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={showProductsCart}>
              <Icon name="shopping-cart" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen name="cart" component={CartScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
