import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

type TIngredienstsState = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: string | undefined;
};

const initialState: TIngredienstsState = {
  ingredients: [],
  loading: false,
  error: ''
};

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state,
    getIngredientsLoader: (state) => state.loading,
    getBuns: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    getMains: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    getSauces: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const {
  getIngredients,
  getBuns,
  getMains,
  getSauces,
  getIngredientsLoader
} = ingredientsSlice.selectors;
