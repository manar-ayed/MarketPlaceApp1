import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
export const AuthContext = createContext();
import {setCartItems, fetchCartItemsFromFirestore} from '../store/cartSlice'
import { useDispatch } from 'react-redux';

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        setUser(user);

        // Load user's cart items here
        const cartItems = await fetchCartItemsFromFirestore(user.uid);
        console.log('USER LOADED !', cartItems);
        // Dispatch action to update cart items in Redux Store
        dispatch(setCartItems(cartItems));
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  /*useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        const cartItemsFromFirestore = await fetchCartItemsFromFirestore(
          user.uid
        );
        dispatch(setCartItems(cartItemsFromFirestore));
      };
  
      fetchCartItems();
    }
  }, [user]);*/
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            const response = await auth().createUserWithEmailAndPassword(email, password);
            const userId = response.user.uid;

            await firestore().collection('users').doc(userId).set({
              email: email,
              password: password,
              userId : userId,
              
            });

           // Ajouter un document vide dans la collection 'cart' pour l'utilisateur
  await firestore().collection('cart').add({
    userId: userId,
    items: [],
  });
  // Ajouter un document dans la collection 'favoris' pour l'utilisateur
await firestore().collection('favorites').doc(userId).set({
  favoriteProducts: [],
});
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
