import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {Product} from '../content/Product';

export const fetchFavoriteItemsFromFirestore = async (
  userId: string,
): Promise<favoriteItem[]> => {
  try {
    console.log('FETCH FAVORITE ITEMS');
    const favoritesRef = firestore().collection('favoris').doc(userId);
    console.log('User favoris reference:', favoritesRef);

    const favoritesSnapshot = await favoritesRef.get();
    console.log('Snapshot favoris', favoritesSnapshot);
    const favoritesData = favoritesSnapshot.data();
    console.log('Favoris DATA', favoritesData);
    const itemsArray = favoritesData?.items ?? [];
    const favoriteItems: favoriteItem[] = itemsArray.map((item: Product) => ({
      product: item,
    }));
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

interface AddToFavoritePayload {
  item: Product;
  userId: string;
}

const initialState: favoriteItem[] = [];
const favoritesSlice = createSlice({
  name: 'favoris',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<AddToFavoritePayload>) => {
      const {item} = action.payload;
      const existingItem = state.find(
        (favoriteItem: favoriteItem) => favoriteItem.product.id === item.id,
      );

      if (!existingItem) {
        state.push({product: item});
        // Update favorites in Firestore
        try {
          firestore()
            .collection('favoris')
            .doc(action.payload.userId)
            .update({
              items: state.map(
                (favoriteItem: favoriteItem) => favoriteItem.product,
              ),
            });
        } catch (error) {
          console.log('Error updating favorites in Firestore:', error);
        }
      }
    },
    removeFromFavorites: (
      state,
      action: PayloadAction<AddToFavoritePayload>,
    ) => {
      const {item} = action.payload;
      const index = state.findIndex(
        (favoriteItem: favoriteItem) => favoriteItem.product.id === item.id,
      );

      if (index !== -1) {
        state.splice(index, 1);
        // Update favorites in Firestore
        try {
          firestore()
            .collection('favoris')
            .doc(action.payload.userId)
            .update({
              items: state.map(
                (favoriteItem: favoriteItem) => favoriteItem.product,
              ),
            });
        } catch (error) {
          console.log('Error updating favorites in Firestore:', error);
        }
      }
    },
    setFavoriteItems(state, action) {
      return action.payload; // Update the state with the favorite items received in payload
    },
  },
});

export const {addToFavorites, removeFromFavorites, setFavoriteItems} =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
