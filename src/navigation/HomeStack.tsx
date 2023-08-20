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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackM = () => {
  const navigation = useNavigation();
  const showProductsCart = () => {
    navigation.navigate('cart');
  };
  // const {logout} = useContext(AuthContext);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home2"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

const HomeStackNavigator = () => {
  const navigation = useNavigation();
  const showProductsCart = () => {
    navigation.navigate('cart');
  };
  const {logout} = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={{
        //headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#fff'},
        tabBarInactiveTintColor: '#151B23',
        tabBarActiveTintColor: '#1A7EFC',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackM}
        options={{
          tabBarBadgeStyle: {backgroundColor: '#1A7EFC'},
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
          headerRight: () => (
            <TouchableOpacity style={{marginRight: 15}} onPress={logout}>
              <Icon name="sign-out" size={24} color="#1A7EFC" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="cart"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarBadgeStyle: {backgroundColor: '#1A7EFC'},
          tabBarIcon: ({color, size}) => (
            <Feather name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="favoris"
        component={FavoriScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeStackNavigator;
