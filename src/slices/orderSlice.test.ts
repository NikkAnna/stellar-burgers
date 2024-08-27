import {
  TOrderState,
  addBunToOrder,
  addMainsAndSaucesToOrder,
  composeOrderIngredients,
  deleteIngredientInOrder,
  getOrderByNumberThunk,
  getReadyOrdersThunk,
  makeOrderThunk,
  moveDownIngredientInOrder,
  moveUpIngredientInOrder,
  orderReducer,
  resetJustDoneOrder
} from './orderSlice';
import { describe, expect, test } from '@jest/globals';

describe('тесты редьюсера orderSlice', () => {
  const initialOrderState: TOrderState = {
    composedOrderIngredients: [],
    loading: false,
    error: '',
    buns: {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      id: '2cbd6338-56h7-1234-abd4-c9678c890be2'
    },
    mainsAndSaucesIngr: [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: '2cbd6338-6f0f-4b62-abd4-c9678c890be2'
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        id: '2cbd6338-6f0f-4b62-abd4-c9513c5bcbe2'
      }
    ],
    readyOrders: [],
    justDoneOrder: null,
    orderByNumber: undefined
  };

  const expectedResult = {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      }
    ],
    _id: '66cc9fda119d45001b502332',
    owner: {
      name: 'Анна',
      email: 'anna@yandex.ru',
      createdAt: '2024-08-09T18:54:43.132Z',
      updatedAt: '2024-08-14T17:03:44.941Z'
    },
    status: 'done',
    name: 'Флюоресцентный spicy люминесцентный био-марсианский бургер',
    createdAt: '2024-08-26T15:31:38.495Z',
    updatedAt: '2024-08-26T15:31:39.277Z',
    number: 51224,
    price: 3478
  };

  const readyOrders = [
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
    }
  ];

  test('добавить булку в заказ', () => {
    const newBunState = orderReducer(
      initialOrderState,
      addBunToOrder({
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      })
    );

    const { buns } = newBunState;

    expect(buns?._id).toEqual('643d69a5c3f7b9001cfa093d');
  });

  test('добавить ингредиент в заказ', () => {
    const newIngredientState = orderReducer(
      initialOrderState,
      addMainsAndSaucesToOrder({
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
      })
    );

    const { mainsAndSaucesIngr } = newIngredientState;

    expect(mainsAndSaucesIngr[2]._id).toEqual('643d69a5c3f7b9001cfa0942');
  });

  test('удалить ингредиент из заказа', () => {
    const newIngredientState = orderReducer(
      initialOrderState,
      deleteIngredientInOrder({
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: '2cbd6338-6f0f-4b62-abd4-c9678c890be2'
      })
    );

    const { mainsAndSaucesIngr } = newIngredientState;

    expect(mainsAndSaucesIngr.length).toEqual(1);
    expect(mainsAndSaucesIngr[0].id).toEqual(
      '2cbd6338-6f0f-4b62-abd4-c9513c5bcbe2'
    );
  });

  test('переместить ингредиент на позицию выше в заказе', () => {
    const newIngredientState = orderReducer(
      initialOrderState,
      moveUpIngredientInOrder(1)
    );

    const { mainsAndSaucesIngr } = newIngredientState;

    expect(mainsAndSaucesIngr[0].id).toEqual(
      '2cbd6338-6f0f-4b62-abd4-c9513c5bcbe2'
    );
    expect(mainsAndSaucesIngr[1].id).toEqual(
      '2cbd6338-6f0f-4b62-abd4-c9678c890be2'
    );
  });

  test('переместить ингредиент на позицию ниже в заказе', () => {
    const newIngredientState = orderReducer(
      initialOrderState,
      moveDownIngredientInOrder(0)
    );

    const { mainsAndSaucesIngr } = newIngredientState;

    expect(mainsAndSaucesIngr[0].id).toEqual(
      '2cbd6338-6f0f-4b62-abd4-c9513c5bcbe2'
    );
    expect(mainsAndSaucesIngr[1].id).toEqual(
      '2cbd6338-6f0f-4b62-abd4-c9678c890be2'
    );
  });

  test('стереть данные о только что сделанном заказе', () => {
    const newIngredientState = orderReducer(
      initialOrderState,
      resetJustDoneOrder()
    );

    expect(newIngredientState.justDoneOrder).toBeNull();
  });

  test('собрать ингредиенты для заказа', () => {
    const newIngredientState = orderReducer(
      initialOrderState,
      composeOrderIngredients()
    );

    expect(newIngredientState.composedOrderIngredients).toEqual([
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093c'
    ]);
  });

  test('отправка заказа на сервер (pending)', () => {
    const thunkAction = { type: makeOrderThunk.pending.type };

    const store = orderReducer(initialOrderState, thunkAction);

    expect(store.loading).toBe(true);
    expect(store.error).toBe('');
  });

  test('отправка заказа на сервер (success)', () => {
    const thunkAction = {
      type: makeOrderThunk.fulfilled.type,
      payload: {
        order: expectedResult
      }
    };

    const store = orderReducer(initialOrderState, thunkAction);

    expect(store.justDoneOrder).toEqual(expectedResult);
    expect(store.loading).toBe(false);
    expect(store.composedOrderIngredients).toEqual([]);
    expect(store.mainsAndSaucesIngr).toEqual([]);
    expect(store.buns).toBeNull();
  });

  test('отправка заказа на сервер (rejected)', () => {
    const thunkAction = {
      type: makeOrderThunk.rejected.type,
      error: { message: 'ошибка создания заказа' }
    };

    const store = orderReducer(initialOrderState, thunkAction);

    expect(store.error).toEqual('ошибка создания заказа');
    expect(store.loading).toBe(false);
  });

  test('получение списка готовых заказов (pending)', () => {
    const thunkAction = { type: getReadyOrdersThunk.pending.type };

    const store = orderReducer(initialOrderState, thunkAction);

    expect(store.loading).toBe(true);
    expect(store.error).toBe('');
  });

  test('получение списка готовых заказов (success)', () => {
    const thunkAction = {
      type: getReadyOrdersThunk.fulfilled.type,
      payload: readyOrders
    };

    const store = orderReducer(initialOrderState, thunkAction);

    expect(store.readyOrders).toEqual(readyOrders);
    expect(store.loading).toBe(false);
  });

  test('получение списка готовых заказов (rejected)', () => {
    const thunkAction = {
      type: getReadyOrdersThunk.rejected.type,
      error: { message: 'ошибка загрузки заказов' }
    };

    const store = orderReducer(initialOrderState, thunkAction);

    expect(store.error).toEqual('ошибка загрузки заказов');
    expect(store.loading).toBe(false);
  });

  test('получение заказа по номеру (pending)', () => {
    const thunkAction = { type: getOrderByNumberThunk.pending.type };

    const store = orderReducer(initialOrderState, thunkAction);

    expect(store.loading).toBe(true);
    expect(store.error).toBe('');
  });

  test('получение заказа по номеру (success)', () => {
    const thunkAction = {
      type: getOrderByNumberThunk.fulfilled.type,
      payload: readyOrders
    };

    const store = orderReducer(initialOrderState, thunkAction);

    expect(store.orderByNumber).toEqual(readyOrders);
    expect(store.loading).toBe(false);
  });

  test('получение заказа по номеру (rejected)', () => {
    const thunkAction = {
      type: getOrderByNumberThunk.rejected.type,
      error: { message: 'ошибка загрузки заказа' }
    };

    const store = orderReducer(initialOrderState, thunkAction);

    expect(store.error).toEqual('ошибка загрузки заказа');
    expect(store.loading).toBe(false);
  });
});
