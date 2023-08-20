/*import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeFromFavoritesAsync = async itemId => {
  console.log('Remove called !');
  try {
    const favoritesData = await AsyncStorage.getItem('favorites');
    const currentFavorites = JSON.parse(favoritesData) || [];

    // Remove the item from favorites
    const updatedFavorites = currentFavorites.filter(
      favorite => favorite.item.id !== itemId,
    );

    // Update AsyncStorage with updated favorites
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    console.log('Item removed from favorites.');
  } catch (error) {
    console.error('Error removing item from favorites:', error);
  }
};

export const addToFavoritesAsync = async newItem => {
  try {
    const favoritesData = await AsyncStorage.getItem('favorites');
    const currentFavorites = JSON.parse(favoritesData) || [];

    const existingItem = currentFavorites.some(
      favorite => favorite.item.id === newItem.id,
    );
    if (!existingItem) {
      // Add the new item to favorites
      const updatedFavorites = [...currentFavorites, newItem];
      // Update AsyncStorage with updated favorites
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      console.log('Item added to favorites.');
    } else {
      console.log('item already exists !');
    }
  } catch (error) {
    console.error('Error adding item to favorites:', error);
  }
};
export const fetchFavoritesFromAsyncStorage = async () => {
  console.log('FETCHING DATA....');
  try {
    const favoritesData = await AsyncStorage.getItem('favorites');
    if (favoritesData) {
      const favoritesArray = JSON.parse(favoritesData);
      console.log('Favorites:', favoritesArray);
      return favoritesArray;
    } else {
      console.log('No favorites found');
      return [];
    }
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
};*/

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
//import firestore from '@react-native-firebase/firestore';
import {Product} from '../content/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchFavoriteItemsFromAsyncStorage = async (): Promise<
  favoriteItem[]
> => {
  try {
    console.log('FETCH FAVORITE ITEMS');
    const favoritesData = await AsyncStorage.getItem('favorites');
    const favoriteItems = JSON.parse(favoritesData) || [];
    console.log('favorite items ', favoriteItems);
    return favoriteItems;
  } catch (error) {
    console.error('Error fetching favorite items:', error);
    return [];
  }
};

export interface favoriteItem {
  product: Product;
}

const initialState: favoriteItem[] = [];
const favoritesSlice = createSlice({
  name: 'favoris',
  initialState,
  reducers: {
    addToFavoritesAsync: async (newItem: favoriteItem) => {
      try {
        // Get current favorite items from AsyncStorage
        const favoritesData = await AsyncStorage.getItem('favorites');
        const currentFavorites = JSON.parse(favoritesData) || [];

        // Check if the item already exists in favorites
        const isItemAlreadyAdded = currentFavorites.some(
          favorite => favorite.product.id === newItem.product.id,
        );

        if (!isItemAlreadyAdded) {
          // Add the new item to favorites
          const updatedFavorites = [...currentFavorites, newItem];

          // Update AsyncStorage with updated favorites
          await AsyncStorage.setItem(
            'favorites',
            JSON.stringify(updatedFavorites),
          );

          console.log('Item added to favorites.');
        } else {
          console.log('Item already exists in favorites.');
        }
      } catch (error) {
        console.error('Error adding item to favorites:', error);
      }
    },
    removeFromFavoritesAsync: async (itemId: number) => {
      try {
        // Get current favorite items from AsyncStorage
        const favoritesData = await AsyncStorage.getItem('favorites');
        const currentFavorites = JSON.parse(favoritesData) || [];

        // Remove the item from favorites
        const updatedFavorites = currentFavorites.filter(
          favorite => favorite.product.id !== itemId,
        );

        // Update AsyncStorage with updated favorites
        await AsyncStorage.setItem(
          'favorites',
          JSON.stringify(updatedFavorites),
        );

        console.log('Item removed from favorites.');
      } catch (error) {
        console.error('Error removing item from favorites:', error);
      }
    },
    setFavoriteItems(state, action) {
      return action.payload; // Update the state with the favorite items received in payload
    },
  },
});

export const {addToFavoritesAsync, removeFromFavoritesAsync, setFavoriteItems} =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
