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
import CustomIconTextButton from '../components/CustomIconTextButton';
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

        <Text style={styles.priceText}>{'$' + item?.product?.price}</Text>
      </View>
      <View style={styles.addRemoveView}>
        <TouchableOpacity
          style={[styles.addToCartBtn, {backgroundColor: '#1A7EFC'}]}
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
        <TouchableOpacity
          style={[
            styles.addToCartBtn,
            {backgroundColor: '#fff', borderColor: '#1A7EFC', borderWidth: 1},
          ]}
          onPress={() => handleRemoveItem(item)}>
          <Text style={{color: '#1A7EFC', fontSize: 20, fontWeight: '700'}}>
            -
          </Text>
        </TouchableOpacity>

        <Text style={{fontSize: 18, fontWeight: '800', margin: 8}}>
          {item?.quantity}
        </Text>
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
        <View style={styles.emptyMsg}>
          <Image
            source={require('../images/ajouter-un-panier.png')}
            style={styles.EmptyCart}
          />
          <Text style={styles.emptyText}>Your Cart Is Empty !</Text>
        </View>
      )}
      <Text style={styles.totalPrice}>
        Total Price: ${calculateTotalPrice()}
      </Text>
      <TouchableOpacity style={styles.checkButton}>
        <Text style={{color: '#fff'}}>Checkout</Text>
      </TouchableOpacity>
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
    color: '#1A7EFC',
    fontWeight: '700',
  },

  addRemoveView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  addToCartBtn: {
    padding: 2,
    borderRadius: 10,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  emptyMsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EmptyCart: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  emptyText: {
    marginTop: 20,
    fontSize: 20,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
  },
  checkButton: {
    padding: 10,
    borderRadius: 5,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    marginHorizontal: 120,
    marginBottom: 20,
    marginVertical: 10,
  },
});

export default CartScreen;
