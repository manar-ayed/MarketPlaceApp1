import React, {useContext} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {Product} from '../content/Product';
import CustomIconButton from '../components/CustomIconButton';
import {addProductToCart, removeProductFromCart} from '../store/cartSlice';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const CartScreen: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const {user} = useContext(AuthContext);
  const userId = user.uid;
  const dispatch = useDispatch();
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeProductFromCart({userId, productId}));
  };

  /*const handleAddToCart = (item: Product) => {
    if (user) {
      dispatch(addProductToCart({userId: user.uid, product: item}));
    }
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
  const renderItem = ({item}) => (
    <View style={styles.cartItemContainer}>
      <Text style={styles.productTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <Text>${item.price * item.quantity}</Text>
      </View>
      <View style={styles.iconContainer}>
        <CustomIconButton
          onPress={() => handleRemoveItem(item.id)}
          icon={'minus-circle'}
        />
        <CustomIconButton
          onPress={() => handleAddToCart(item)}
          icon={'plus-circle'}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Text style={styles.totalPrice}>
        Total Price: ${calculateTotalPrice()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
    marginVertical: 5,
  },
  productTitle: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },

  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CartScreen;
