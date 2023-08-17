/*import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const favorisSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavorites: (state, action: PayloadAction<number>) => {
      const productID = action.payload;
      if (!state.includes(productID)) {
        state.push(productID);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const productID = action.payload;
      const index = state.indexOf(productID);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const {addToFavorites, removeFromFavorites} = favorisSlice.actions;

export default favorisSlice.reducer;
*/
