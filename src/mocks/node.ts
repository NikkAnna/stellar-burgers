import {
  feedHandler,
  ingredientsHandler,
  loginUserHandler,
  orderBurgerHandler,
  orderByNumberHandler,
  userHandler,
  userOrdersHandler
} from './handlers';

import { setupServer } from 'msw/node';

export const ingredientsServer = setupServer(...ingredientsHandler);
export const feedServer = setupServer(...feedHandler);
export const userOrdersServer = setupServer(...userOrdersHandler);
export const userServer = setupServer(...userHandler);
export const orderByNumberServer = setupServer(...orderByNumberHandler);
export const loginUserServer = setupServer(...loginUserHandler);
export const orderBurgerServer = setupServer(...orderBurgerHandler);
