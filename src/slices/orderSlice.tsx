import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { getOrdersApi, orderBurgerApi } from '@api';

import { stat } from 'fs';

type TOrderState = {
  composedOrderIngredients: string[];
  loading: boolean;
  error: string | undefined;
  // ingredientsFull: Array<TConstructorIngredient>;
  buns: TConstructorIngredient | null;
  mainsAndSaucesIngr: Array<TConstructorIngredient>;
  readyOrders: Array<TOrder>;
};

const initialState: TOrderState = {
  composedOrderIngredients: [],
  loading: false,
  error: '',
  // ingredientsFull: [],
  buns: null,
  mainsAndSaucesIngr: [],
  readyOrders: []
};

export const makeOrderThunk = createAsyncThunk(
  'order/create',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getReadyOrdersThunk = createAsyncThunk(
  'order/get users ready',
  async () => await getOrdersApi()
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredientToOrder: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      // state.composedOrderIngredients.push(action.payload._id);
      // state.ingredientsFull.push(action.payload);
      if (action.payload.type === 'bun') {
        state.buns = action.payload;
      }
      if (action.payload.type !== 'bun') {
        state.mainsAndSaucesIngr.push(action.payload);
      }
    },
    deleteIngredientInOrder: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.mainsAndSaucesIngr = state.mainsAndSaucesIngr.filter(
        (i) => i.id !== action.payload.id
      );
    },
    addBottomBun: (state, action) => {
      if (state.buns) {
        state.composedOrderIngredients.push(state.buns._id);
      }
    },
    moveUpIngredientInOrder: (state, action: PayloadAction<number>) => {
      state.mainsAndSaucesIngr.splice(
        action.payload - 1,
        0,
        state.mainsAndSaucesIngr.splice(action.payload, 1)[0]
      );
    },
    moveDownIngredientInOrder: (state, action: PayloadAction<number>) => {
      state.mainsAndSaucesIngr.splice(
        action.payload + 1,
        0,
        state.mainsAndSaucesIngr.splice(action.payload, 1)[0]
      );
    },
    composeOrderIngredients: (state) => {
      if (state.buns && state.mainsAndSaucesIngr) {
        state.composedOrderIngredients.push(state.buns._id);
        state.mainsAndSaucesIngr.forEach((i) => {
          state.composedOrderIngredients.push(i._id);
        });
        state.composedOrderIngredients.push(state.buns._id);
      }
    }
  },
  selectors: {
    getComposedOrderIngredients: (state) =>
      state.composedOrderIngredients || [],
    // getOrderFullIngredients: (state) => state.ingredientsFull,
    getOrderBun: (state) => state.buns,
    getOrderMainAndSauces: (state) => state.mainsAndSaucesIngr,
    getReadyOrders: (state) => state.readyOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(makeOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(makeOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        // state.readyOrders.push(action.payload.order);
        state.composedOrderIngredients = [];
        state.mainsAndSaucesIngr = [];
        state.buns = null;
      })
      .addCase(getReadyOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getReadyOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getReadyOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.readyOrders = action.payload;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const {
  addIngredientToOrder,
  deleteIngredientInOrder,
  moveUpIngredientInOrder,
  moveDownIngredientInOrder,
  composeOrderIngredients
} = orderSlice.actions;
export const {
  getComposedOrderIngredients,
  // getBuns,
  getOrderBun,
  getOrderMainAndSauces,
  getReadyOrders
} = orderSlice.selectors;
