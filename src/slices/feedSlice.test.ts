import { TOrderFeedState, getFeedThunk, ordersFeedReducer } from './feedSlice';
import { describe, expect, test } from '@jest/globals';

describe('тесты редьюсера feedSlice', () => {
  const initialState: TOrderFeedState = {
    orders: {
      orders: [],
      total: 0,
      totalToday: 0
    },
    loading: false,
    error: ''
  };

  const expectedResult = {
    orders: [
      {
        _id: '66cb73cc119d45001b50209c',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0944',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2024-08-25T18:11:24.362Z',
        updatedAt: '2024-08-25T18:11:24.830Z',
        number: 51100
      },
      {
        _id: '66cb6849119d45001b502083',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный спайси бургер',
        createdAt: '2024-08-25T17:22:17.046Z',
        updatedAt: '2024-08-25T17:22:17.524Z',
        number: 51099
      }
    ],
    total: 50726,
    totalToday: 98
  };

  test('загрузка ленты заказов с сервера (pending)', () => {
    const thunkAction = { type: getFeedThunk.pending.type };

    const store = ordersFeedReducer(initialState, thunkAction);

    expect(store.loading).toBe(true);
    expect(store.error).toBe('');
  });

  test('загрузка ленты заказов с сервера (success)', () => {
    const thunkAction = {
      type: getFeedThunk.fulfilled.type,
      payload: expectedResult
    };

    const store = ordersFeedReducer(initialState, thunkAction);

    expect(store.orders.orders).toEqual(expectedResult.orders);
    expect(store.orders.total).toEqual(expectedResult.total);
    expect(store.orders.totalToday).toEqual(expectedResult.totalToday);
    expect(store.loading).toBe(false);
  });

  test('загрузка ленты заказов с сервера (rejected)', () => {
    const thunkAction = {
      type: getFeedThunk.rejected.type,
      error: { message: 'ошибка загрузки заказов' }
    };

    const store = ordersFeedReducer(initialState, thunkAction);

    expect(store.error).toEqual('ошибка загрузки заказов');
    expect(store.loading).toBe(false);
  });
});
