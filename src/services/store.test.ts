import { describe, expect, test } from '@jest/globals';

import { initialState as ingredientsState } from '../slices/ingredientsSlice';
import { initialState as orderState } from '../slices/orderSlice';
import { initialState as ordersFeedState } from '../slices/feedSlice';
import { rootReducer } from './store';
import { initialState as userState } from '../slices/userSlice';

describe('тест работы rootReducer', () => {
  const expectedResult = {
    ingredients: ingredientsState,
    ordersFeed: ordersFeedState,
    user: userState,
    order: orderState
  };

  test('поведение редьюсера при unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const store = rootReducer(undefined, action);

    expect(store).toEqual(expectedResult);
  });
});
