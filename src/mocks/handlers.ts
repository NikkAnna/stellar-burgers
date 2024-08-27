import { HttpResponse, http } from 'msw';

const URL = process.env.BURGER_API_URL;

export const ingredientsHandler = [
  http.get('/ingredients', () =>
    HttpResponse.json({
      success: true,
      data: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
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
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png'
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa0944',
          name: 'Соус традиционный галактический',
          type: 'sauce',
          proteins: 42,
          fat: 24,
          carbohydrates: 42,
          calories: 99,
          price: 15,
          image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-03-large.png'
        }
      ]
    })
  )
];

export const feedHandler = [
  http.get(`${URL}/orders/all`, () =>
    HttpResponse.json({
      success: true,
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
    })
  )
];

export const userOrdersHandler = [
  http.get(`${URL}/orders`, () =>
    HttpResponse.json({
      success: true,
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
        }
      ]
    })
  )
];

export const orderByNumberHandler = [
  http.get(`${URL}/orders/51100`, () =>
    HttpResponse.json({
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
    })
  )
];

export const userHandler = [
  http.get(`${URL}/auth/user`, () =>
    HttpResponse.json({
      success: true,
      user: { email: 'anna@yandex.ru', name: 'Анна' }
    })
  )
];

export const loginUserHandler = [
  http.post(`${URL}/auth/user`, () =>
    HttpResponse.json({
      success: true,
      accessToken:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjY2NWYzMTE5ZDQ1MDAxYjRmZWNmMiIsImlhdCI6MTcyNDY4NTU4NiwiZXhwIjoxNzI0Njg2Nzg2fQ.3Up2L_saklBVZsPsGRYhqyOJTJRTHB-BsvZ8UmzJoQo',
      refreshToken:
        'eede4cb9895f53f539eee824a64572b1f5907a0ced0b494e4154d4d933cbc98c34bb6bcf611fe11c',
      user: {
        email: 'anna@yandex.ru',
        name: 'Анна'
      }
    })
  )
];

export const orderBurgerHandler = [
  http.post(`${URL}/orders`, () =>
    HttpResponse.json({
      success: true,
      name: 'Флюоресцентный spicy люминесцентный био-марсианский бургер',
      order: {
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
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-01-large.png'
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
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
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
            image_large:
              'https://code.s3.yandex.net/react/code/meat-03-large.png'
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
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-02-large.png'
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
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-01-large.png'
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
      }
    })
  )
];
