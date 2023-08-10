import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../content/Product';

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
interface CartState {
  items: CartItem[];
}
interface CartItem extends Product {
  quantity: number;
}
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (
      state,
      action: PayloadAction<{userId: string; product: Product}>,
    ) => {
      const {userId, product} = action.payload;
      const existingItem = state.items.find(
        item => item.id === action.payload.product.id,
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({...action.payload.product, quantity: 1});
      }
      // Update Firestore document
      /*firestore()
        .collection('users')
        .doc(userId)
        .update({
          cart: firebase.firestore.FieldValue.arrayUnion(product),
        });*/
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    removeArticleFromCart: (
      state,
      action: PayloadAction<{itemId: number; userId: string}>,
    ) => {
      const {itemId, userId} = action.payload;
      const userCart = state.items.find(cart => cart.userId === userId);

      if (userCart) {
        userCart.items = userCart.items.filter(item => item.id !== itemId);
        firestore()
          .collection('users')
          .doc(userId)
          .update({cart: userCart.items});
        /*const itemIdToRemove = action.payload;
      const itemToRemove = state.items.find(item => item.id === itemIdToRemove);

      if (itemToRemove) {
        if (itemToRemove.quantity > 1) {
          itemToRemove.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== itemIdToRemove);
        }
      }*/
        //cartSlice.caseReducers.calculateTotalQuantity(state);
      }
    },
    removeProductFromCart: (
      state,
      action: PayloadAction<{userId: string; productId: number}>,
    ) => {
      const {userId, productId} = action.payload;
      // Find the user's cart by userId
      const userCart = state.items.find(item => item.userId === userId);
      if (userCart) {
        userCart.products = userCart.products.filter(
          product => product.id !== productId,
        );
      }
    },
    clearCart: state => {
      state.items = [];
    },
    // Calculate the total quantity in the cart
    /*calculateTotalQuantity: (state: CartState) => {
      const totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.totalQuantity = totalQuantity;
    },*/
  },
});

export const {
  addProductToCart,
  removeFromCart,
  clearCart,
  removeProductFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
