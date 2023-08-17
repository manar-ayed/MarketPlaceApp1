// actions/cartActions.js
/*import firestore from '@react-native-firebase/firestore';
import {Product} from '../content/Product';

export const addToCart = (product: Product) => {
  return async (dispatch, getState) => {
    const state = getState();
    const userID = state.auth.userID; // Supposons que vous stockiez l'userID dans l'état d'authentification
    const cartRef = firestore().collection('cart').doc(userID);

    // Check if the 'cart' collection exists for the user
    const cartDoc = await cartRef.get();
    if (!cartDoc.exists) {
      // Create the 'cart' collection with the first product
      await cartRef.set({
        items: [{product, quantity: 1}],
      });
    } else {
      // Update the 'cart' collection with the new product or quantity
      const cartData = cartDoc.data();
      const updatedItems = [...cartData.items, {product, quantity: 1}];
      await cartRef.update({items: updatedItems});
    }
    // Mettez à jour le panier dans Firestore

    // Dispatchez l'action pour mettre à jour le panier dans Redux
    dispatch({type: 'ADD_TO_CART', payload: {product}});
  };
};
*/
