import {combineReducers, configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import favorisReducer from './favoriteSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  favoris: favorisReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
const store = configureStore({
  reducer: rootReducer,
});
/*const store = configureStore({
  reducer: {
    cart: cartReducer,
    favoris: favorisReducer, // Ajoutez favorisReducer au combineReducers
  },
});
*/
export default store;
