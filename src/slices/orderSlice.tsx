import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

type TOrderState = {
  order: TOrder;
  loading: boolean;
  error: string | undefined;
  ingredientsFull: Array<TConstructorIngredient>;
};

const initialState: TOrderState = {
  order: {
    _id: '',
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0,
    ingredients: []
  },
  loading: false,
  error: '',
  ingredientsFull: []
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredientToOrder: (state, action: PayloadAction<TIngredient>) => {
      state.order.ingredients.push(action.payload._id);
      state.ingredientsFull.push(action.payload);
    },
    deleteIngredientInOrder: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      if (action.payload) {
        state.order.ingredients = state.order.ingredients.filter(
          (i) => i !== action.payload
        );
        state.ingredientsFull = state.ingredientsFull.filter(
          (i) => i._id !== action.payload
        );
      }
    },
  },
  selectors: {
    getOrderIngredients: (state) => state.order.ingredients,
    getOrderFullIngredients: (state) => state.ingredientsFull,
    getOrderId: (state) => {
      state.order._id;
    },
    getOrderBun: (state) => state.ingredientsFull.find((i) => i.type === 'bun'),
    getOrderMainAndSauces: (state) =>
      state.ingredientsFull.filter((i) => i.type !== 'bun')
  }
  //   extraReducers: (builder) => {
  //     builder;
  //     // .addCase(getIngredientsThunk.pending, (state) => {
  //     //   state.loading = true;
  //     //   state.error = '';
  //     // })
  //     // .addCase(getIngredientsThunk.rejected, (state, action) => {
  //     //   state.loading = false;
  //     //   state.error = action.error.message;
  //     // })
  //     // .addCase(getIngredientsThunk.fulfilled, (state, action) => {
  //     //   state.loading = false;
  //     //   state.ingredients = action.payload;
  //     // });
  //   }
});

export const orderReducer = orderSlice.reducer;
export const { addIngredientToOrder, deleteIngredientInOrder } =
  orderSlice.actions;
export const {
  getOrderIngredients,
  getOrderId,
  getOrderFullIngredients,
  getOrderBun,
  getOrderMainAndSauces
} = orderSlice.selectors;
