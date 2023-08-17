import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  removeFromCart,
  addToCart,
  cartItem,
  fetchCartItemsFromFirestore,
  setCartItems,
} from '../store/cartSlice';
import {AuthContext} from '../navigation/AuthProvider';
import {RootState} from '../store/store';
//import auth from '@react-native-firebase/auth';

const CartScreen: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const {user} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (!cartItems.length) {
          const items = await fetchCartItemsFromFirestore(user.uid);
          dispatch(setCartItems(items));
          setIsLoading(false);
        }
        fetchItems();
      } catch (error) {
        console.log('Error fetching data !', error);
        setIsLoading(false);
      }
    };
  }, [dispatch]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.map(item => {
      totalPrice += item.product.price * item.quantity;
    });
    return totalPrice;
  };

  const handleRemoveItem = (item: cartItem) => {
    dispatch(
      removeFromCart({item: item.product, quantity: 1, userId: user.uid}),
    );
  };

  const handleIncreaseQuantity = (item: cartItem) => {
    dispatch(
      addToCart({
        item: item.product,
        quantity: 1,
        userId: user.uid,
      }),
    );
  };

  /*const handleDecreaseQuantity = (item: cartItem) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({item, quantity: item.quantity - 1}));
    }
  };*/

  const renderItem = ({item}: {item: cartItem}) => (
    <View style={styles.itemView}>
      <Image source={{uri: item?.product?.image}} style={styles.itemImage} />
      <View style={styles.nameView}>
        <Text style={styles.nameText} numberOfLines={1}>
          {item?.product?.title}
        </Text>

        <Text style={styles.discountText}>{'$' + item?.product?.price}</Text>
      </View>
      <View style={styles.addRemoveView}>
        <TouchableOpacity
          style={[styles.addToCartBtn, {backgroundColor: 'red'}]}
          onPress={() => handleRemoveItem(item)}>
          <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>
            -
          </Text>
        </TouchableOpacity>
        <Text style={{fontSize: 16, fontWeight: '600', margin: 8}}>
          {item?.quantity}
        </Text>
        <TouchableOpacity
          style={[styles.addToCartBtn, {backgroundColor: 'green'}]}
          onPress={() => handleIncreaseQuantity(item)}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: '700',
            }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length ? (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item?.product?.id.toString()}
        />
      ) : (
        <Text>CART IS EMPTY !</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    //margin: 5,
  },
  nameView: {
    width: '30%',
    margin: 5,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 18,
    color: 'green',
    fontWeight: '700',
  },
  discountText: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 5,
  },
  addRemoveView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  addToCartBtn: {
    padding: 5,
    borderRadius: 15,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
});

export default CartScreen;
