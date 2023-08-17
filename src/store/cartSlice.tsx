import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {Product} from '../content/Product';

/*export const fetchCartItemsFromFirestore = async (
  userId: string,
): Promise<cartItem[]> => {
  console.log('FETCH CALLED !');
  try {
    const userCartRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('cart');
    const cartSnapshot = await userCartRef.get();

    const cartItems: cartItem[] = [];
    console.log('Inside forEach loop');
    cartSnapshot.forEach(doc => {
      const cartItemData = doc.data();
      console.log(cartItemData);
      const cartItem: cartItem = {
        product: cartItemData.product,
        quantity: cartItemData.quantity,
      };
      cartItems.push(cartItem);
    });

    return cartItems;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
};*/

/*export const fetchCartItemsFromFirestore = async (userId: string) => {
  try {
    const userCartRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('cart');

    console.log('User cart reference:', userCartRef.path);
    const cartSnapshot = await userCartRef.get();
    console.log('Cart snapshot:', cartSnapshot);
    const cartItems: cartItem[] = [];

    cartSnapshot.forEach(doc => {
      console.log('FOREACH ENTERED §');
      const cartItemData = doc.data();
      console.log('CartItem data:', cartItemData);
      const cartItem: cartItem = {
        product: cartItemData.product,
        quantity: cartItemData.quantity,
      };
      cartItems.push(cartItem);
    });
    console.log('Cart items:', cartItems);
    return cartItems;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};*/

export const fetchCartItemsFromFirestore = async (
  userId: string,
): Promise<cartItem[]> => {
  try {
    const cartItemsRef = firestore().collection('cart').doc(userId);
    console.log('User cart reference:', cartItemsRef);

    const cartSnapshot = await cartItemsRef.get();
    console.log('Cart snapshot:', cartSnapshot);
    const cartItemsData = cartSnapshot.data();
    console.log('_data PROPERTY OF Snapshot', cartItemsData);
    // Access the 'items' array or use an empty array if it's not available
    const itemsArray = cartItemsData?.items ?? [];
    const cartItems: cartItem[] = itemsArray.map(item => ({
      product: item.item,
      quantity: item.quantity,
    }));

    /*cartSnapshot.forEach(doc => {
      console.log('ENTER FOR !');
      const cartItemData = doc.data();
      const cartItem: cartItem = {
        product: cartItemData.product,
        quantity: cartItemData.quantity,
      };
      cartItems.push(cartItem);
    });*/
    console.log('Cart items:', cartItems);

    return cartItems;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
};

export interface cartItem {
  product: Product;
  quantity: number;
}

interface AddToCartPayload {
  item: Product;
  quantity: number;
  userId: string;
}

const initialState: cartItem[] = [];
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      console.log('addToCart called');
      const {item, quantity, userId} = action.payload;
      const existingItem = state.find(
        (cartItem: cartItem) => cartItem.product.id === item.id,
      );

      console.log(existingItem);
      if (existingItem) {
        // Si l'article existe déjà, mettez à jour la quantité
        existingItem.quantity += quantity;
      } else {
        // Sinon, ajoutez l'article au panier
        state.push({product: item, quantity});
      }

      // Mettre à jour le panier dans Firestore
      try {
        // Si Le document correspondant de la collection cart a l'ID = userId
        firestore()
          .collection('cart')
          .doc(userId)
          .update({
            items: state.map((cartItem: cartItem) => ({
              item: cartItem.product,
              quantity: cartItem.quantity,
            })),
          });
      } catch (error) {
        console.log('Error updating cart in Firestore:', error);
      }
    },
    updateQuantity(state, action) {
      const {item, quantity} = action.payload;
      const cartItem = state.find(cartItem => cartItem.product.id === item.id);

      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const {item, quantity, userId} = action.payload;
      const existingItem = state.find(
        cartItem => cartItem.product.id === item.id,
      );
      if (existingItem) {
        if (existingItem.quantity > quantity) {
          existingItem.quantity -= quantity;
        } else {
          const index = state.indexOf(existingItem);
          if (index !== -1) {
            state.splice(index, 1);
          }
        }
      }
      try {
        // Si Le document correspondant de la collection cart a l'ID = userId
        firestore()
          .collection('cart')
          .doc(userId)
          .update({
            items: state.map((cartItem: cartItem) => ({
              item: cartItem.product,
              quantity: cartItem.quantity,
            })),
          });
      } catch (error) {
        console.log('Error updating cart in Firestore:', error);
      }
    },
    setCartItems(state, action) {
      return action.payload; // Met à jour l'état du panier avec les articles reçus en payload
    },
  },
});

export const {addToCart, updateQuantity, removeFromCart, setCartItems} =
  cartSlice.actions;
export default cartSlice.reducer;
