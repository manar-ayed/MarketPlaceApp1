/*import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomIconTextButton from '../components/CustomIconTextButton';
import {useRoute} from '@react-navigation/native';
import {Product} from '../content/Product';
import {useDispatch} from 'react-redux';
import {ScrollView} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
let userId = '';
const DetailsScreen = () => {
  const route = useRoute();
  const {product} = route.params as {product: Product};
  //const {user} = useContext(AuthContext);

  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(prevIsFavorite => !prevIsFavorite);
  };

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

      <FlatList
        data={items}
        renderItem={({item, index}) => {
          return (
            <View>
              <Image source={{uri: item.product.image}} />
              <View style={styles.productImageContainer}>
                <Image
                  style={styles.productImage}
                  source={{uri: product.image}}
                />
              </View>
              <View style={styles.content}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productPrice}>Price: ${product.price}</Text>
                <Text style={styles.productDescr}> {product.description}</Text>
              </View>
              <TouchableOpacity>
                <Text style={{color: '#fff'}}>Add To cart</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
*/

import React, {useContext, useEffect, useState} from 'react';
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
import {addToCart, fetchCartItemsFromFirestore} from '../store/cartSlice';
import {Product} from '../content/Product';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {cartItem} from '../store/cartSlice';
//import {addToFavorites, removeFromFavorites} from '../store/favoriteSlice';
const DetailsScreen = () => {
  const route = useRoute();
  //const {product} = route.params ;
  const {product} = route.params as {product: Product};
  const {user} = useContext(AuthContext);
  //const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  /*useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        const cartItems = await fetchCartItemsFromFirestore(user.userId);
       dispatch(addToCart(cartItems)); // Utilisez le bon nom de l'action
      };
      fetchCartItems();
    }
  }, [user, dispatch]);*/
  const handleToggleFavorite = () => {
    setIsFavorite(prevIsFavorite => !prevIsFavorite);
  };

  //const isFavorite = favorites.includes(product.id);

  /*const handleToggleFavorite = async () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
      await firestore()
        .collection('favorites')
        .doc(user.uid)
        .update({
          favoriteProducts: firestore.FieldValue.arrayRemove(product.id),
        });
    } else {
      dispatch(addToFavorites(product.id));
      await firestore()
        .collection('favorites')
        .doc(user.uid)
        .update({
          favoriteProducts: firestore.FieldValue.arrayUnion(product.id),
        });
    }
  };*/

  const handleAddToCart = () => {
    console.log('handleAddToCart called');
    if (user) {
      dispatch(addToCart({item: product, quantity: 1, userId: user.uid}));
    } else {
      // Gérer le cas où l'utilisateur n'est pas connecté
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
        onPress={handleAddToCart}></CustomIconTextButton>
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
