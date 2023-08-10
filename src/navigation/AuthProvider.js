import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
export const AuthContext = createContext();
import {setCartItems} from '../store/cartSlice'

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        setUser(user);

        // Load user's cart items here
        const cartItems = await fetchCartItemsFromFirestore(user.uid);

        // Dispatch action to update cart items in Redux Store
        dispatch(setCartItems(cartItems));
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
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
            //await auth().createUserWithEmailAndPassword(email, password);
            const response = await auth().createUserWithEmailAndPassword(email, password);
            const userId = response.user.uid;

            // Create a user document with an empty cart subcollection
            await firestore().collection('users').doc(userId).set({
              email,

              
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
