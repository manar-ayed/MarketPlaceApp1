import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomIconButton from '../components/CustomIconButton';
import CustomIconTextButton from '../components/CustomIconTextButton';
import {RouteProp, useRoute} from '@react-navigation/native';
import {addProductToCart} from '../store/cartSlice';
import {Product} from '../content/Product';
import {useDispatch} from 'react-redux';
import {ScrollView} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const DetailsScreen = () => {
  const route = useRoute();
  //const {product} = route.params ;
  const {product} = route.params as {product: Product};
  const {user} = useContext(AuthContext);

  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(prevIsFavorite => !prevIsFavorite);
  };

  // Add a product to the Cart
  /*const addToCart = () => {
    dispatch(addProductToCart(product));
  };*/
  const handleAddToCart = async (item: Product) => {
    if (user) {
      const cartItem = {
        product: item,
        quantity: 1,
      };

      try {
        await firestore()
          .collection('users')
          .doc(user.uid)
          .collection('cart')
          .add(cartItem);

        dispatch(addProductToCart({userId: user.uid, product: item}));
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  };
  // Show Cart
  //const showProductsCart = () => {};

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={handleToggleFavorite}
        style={styles.favoriteButton}>
        {isFavorite ? (
          <Icon name="heart" size={24} color="red" />
        ) : (
          <Icon name="heart-o" size={24} color="#000" />
        )}
      </TouchableOpacity>

      <View style={styles.productImageContainer}>
        <Image style={styles.productImage} source={{uri: product.image}} />
      </View>
      <View style={styles.content}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>Price: ${product.price}</Text>
        <Text style={styles.productDescr}> {product.description}</Text>
      </View>
      <CustomIconTextButton
        text="Add to cart"
        icon="plus-circle"
        onPress={() => handleAddToCart(product)}></CustomIconTextButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  /*header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },*/
  favoriteButton: {
    padding: 10,
  },
  productImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescr: {
    fontSize: 16,
    marginBottom: 10,
  },
});
export default DetailsScreen;
