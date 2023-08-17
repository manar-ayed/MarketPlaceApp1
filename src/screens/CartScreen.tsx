import React, {useContext, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
  addToCart,
  cartItem,
  setCartItems,
  fetchCartItemsFromFirestore,
} from '../store/cartSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../navigation/AuthProvider';
import {RootState} from '../store/store';
//import auth from '@react-native-firebase/auth';

const CartScreen: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const {user} = useContext(AuthContext);

  /*useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        const cartItemsFromFirestore = await fetchCartItemsFromFirestore(
          user.uid,
        );
        dispatch(setCartItems(cartItemsFromFirestore));
      };

      fetchCartItems();
    }
  }, [user]);*/

  const handleRemoveItem = (item: cartItem) => {
    dispatch(removeFromCart(item));
  };

  const handleIncreaseQuantity = (item: cartItem) => {
    // Utilisez addToCart pour augmenter la quantité
    dispatch(
      addToCart({
        item: item.product,
        quantity: item.quantity + 1,
        userId: user.uid,
      }),
    );
  };

  const handleDecreaseQuantity = (item: cartItem) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({item, quantity: item.quantity - 1}));
    }
  };

  const renderItem = ({item}: {item: cartItem}) => (
    <View style={styles.cartItem}>
      <Text>{item.product.title}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleDecreaseQuantity(item)}>
          <Icon name="minus" size={20} />
        </TouchableOpacity>
        <Text>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleIncreaseQuantity(item)}>
          <Icon name="plus" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.product.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CartScreen;
