import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../utils/burger-api';

import { v4 as uuidv4 } from 'uuid';

export type TOrderState = {
  composedOrderIngredients: string[];
  loading: boolean;
  error: string | undefined;
  buns: TConstructorIngredient | null;
  mainsAndSaucesIngr: Array<TConstructorIngredient>;
  readyOrders: Array<TOrder>;
  justDoneOrder: TOrder | null;
  orderByNumber: TOrder | undefined;
};

export const initialState: TOrderState = {
  composedOrderIngredients: [],
  loading: false,
  error: '',
  buns: null,
  mainsAndSaucesIngr: [],
  readyOrders: [],
  justDoneOrder: null,
  orderByNumber: undefined
};

export const makeOrderThunk = createAsyncThunk(
  'order/create',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getReadyOrdersThunk = createAsyncThunk(
  'order/get users ready',
  async () => await getOrdersApi()
);

export const getOrderByNumberThunk = createAsyncThunk(
  'order/get by number',
  async (number: number) =>
    await getOrderByNumberApi(number).then((data) => {
      if (data.success) {
        return data.orders.find((o) => o.number === number);
      }
    })
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addBunToOrder: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.buns = action.payload;
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    addMainsAndSaucesToOrder: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.mainsAndSaucesIngr.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
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
    resetJustDoneOrder: (state) => {
      state.justDoneOrder = null;
    },
    composeOrderIngredients: (state) => {
      if (state.buns && state.mainsAndSaucesIngr) {
        const composedIngredients = [];
        composedIngredients.push(state.buns._id);
        state.composedOrderIngredients.push(state.buns._id);
        state.mainsAndSaucesIngr.forEach((i) => {
          composedIngredients.push(i._id);
        });
        composedIngredients.push(state.buns._id);
        state.composedOrderIngredients = composedIngredients;
      }
    }
  },
  selectors: {
    getComposedOrderIngredients: (state) =>
      state.composedOrderIngredients || [],
    getOrderBun: (state) => state.buns,
    getOrderMainAndSauces: (state) => state.mainsAndSaucesIngr,
    getReadyOrders: (state) => state.readyOrders,
    getLoader: (state) => state.loading,
    getJustDoneOrder: (state) => state.justDoneOrder,
    getOrderByNumber: (state) => state.orderByNumber
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
        state.justDoneOrder = action.payload.order;
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
      })
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orderByNumber = action.payload;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const {
  addBunToOrder,
  deleteIngredientInOrder,
  moveUpIngredientInOrder,
  moveDownIngredientInOrder,
  composeOrderIngredients,
  resetJustDoneOrder,
  addMainsAndSaucesToOrder
} = orderSlice.actions;
export const {
  getComposedOrderIngredients,
  getOrderBun,
  getOrderMainAndSauces,
  getReadyOrders,
  getLoader,
  getJustDoneOrder,
  getOrderByNumber
} = orderSlice.selectors;
