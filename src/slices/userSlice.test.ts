import {
  TUserState,
  authChecked,
  getUser,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk,
  userReducer
} from './userSlice';
import { describe, expect, test } from '@jest/globals';

describe('тесты редьюсера userSlice', () => {
  const initialState: TUserState = {
    isAuthChecked: false,
    isAuthentificated: false,
    data: null,
    loginUserError: '',
    registrationUserError: '',
    logoutUserError: '',
    updateUserError: '',
    loading: false
  };

  const user = {
    email: 'anna@yandex.ru',
    name: 'Анна'
  };

  test('проверить аутентификацию', () => {
    const store = userReducer(initialState, authChecked());

    expect(store.isAuthChecked).toBe(true);
  });

  test('регистрация нового пользователя (pending)', () => {
    const thunkAction = { type: registerUserThunk.pending.type };

    const store = userReducer(initialState, thunkAction);

    expect(store.loading).toBe(true);
    expect(store.registrationUserError).toBe('');
  });

  test('регистрация нового пользователя (success)', () => {
    const thunkAction = {
      type: registerUserThunk.fulfilled.type,
      payload: user
    };

    const store = userReducer(initialState, thunkAction);

    expect(store.loading).toBe(false);
    expect(store.isAuthChecked).toBe(true);
    expect(store.isAuthentificated).toBe(true);
    expect(store.data).toEqual(user);
  });

  test('регистрация нового пользователя (rejected)', () => {
    const thunkAction = {
      type: registerUserThunk.rejected.type,
      error: { message: 'ошибка регистрации' }
    };

    const store = userReducer(initialState, thunkAction);

    expect(store.registrationUserError).toEqual('ошибка регистрации');
    expect(store.loading).toBe(false);
    expect(store.isAuthChecked).toBe(true);
  });

  test('получение данных пользователя (pending)', () => {
    const thunkAction = { type: getUser.pending.type };

    const store = userReducer(initialState, thunkAction);

    expect(store.loading).toBe(true);
    expect(store.loginUserError).toBe('');
  });

  test('получение данных пользователя (success)', () => {
    const thunkAction = {
      type: getUser.fulfilled.type,
      payload: { user: user }
    };

    const store = userReducer(initialState, thunkAction);

    expect(store.loading).toBe(false);
    expect(store.isAuthChecked).toBe(true);
    expect(store.isAuthentificated).toBe(true);
    expect(store.data).toEqual(user);
  });

  test('получение данных пользователя (rejected)', () => {
    const thunkAction = {
      type: getUser.rejected.type,
      error: { message: 'пользователь не найден' }
    };

    const store = userReducer(initialState, thunkAction);

    expect(store.loginUserError).toEqual('пользователь не найден');
    expect(store.loading).toBe(false);
    expect(store.isAuthChecked).toBe(true);
    expect(store.isAuthentificated).toBe(false);
  });

  test('авторизация пользователя (pending)', () => {
    const thunkAction = { type: loginUserThunk.pending.type };

    const store = userReducer(initialState, thunkAction);

    expect(store.loading).toBe(true);
    expect(store.loginUserError).toBe('');
  });

  test('авторизация пользователя (success)', () => {
    const thunkAction = {
      type: loginUserThunk.fulfilled.type,
      payload: user
    };

    const store = userReducer(initialState, thunkAction);

    expect(store.loading).toBe(false);
    expect(store.isAuthChecked).toBe(true);
    expect(store.isAuthentificated).toBe(true);
    expect(store.data).toEqual(user);
  });

  test('авторизация пользователя (rejected)', () => {
    const thunkAction = {
      type: loginUserThunk.rejected.type,
      error: { message: 'пользователь не найден' }
    };

    const store = userReducer(initialState, thunkAction);

    expect(store.loginUserError).toEqual('пользователь не найден');
    expect(store.loading).toBe(false);
    expect(store.isAuthChecked).toBe(true);
    expect(store.isAuthentificated).toBe(false);
  });

  test('разлогинивание пользователя (pending)', () => {
    const thunkAction = { type: logoutUserThunk.pending.type };

    const store = userReducer(initialState, thunkAction);

    expect(store.loading).toBe(true);
    expect(store.logoutUserError).toBe('');
  });

  test('разлогинивание пользователя (success)', () => {
    const thunkAction = {
      type: logoutUserThunk.fulfilled.type
    };

    const store = userReducer(initialState, thunkAction);

    expect(store.loading).toBe(false);
    expect(store.isAuthChecked).toBe(true);
    expect(store.isAuthentificated).toBe(false);
    expect(store.data).toBeNull();
  });

  test('разлогинивание пользователя (rejected)', () => {
    const thunkAction = {
      type: logoutUserThunk.rejected.type,
      error: { message: 'ошибка выхода из личного кабинета' }
    };

    const store = userReducer(initialState, thunkAction);

    expect(store.logoutUserError).toEqual('ошибка выхода из личного кабинета');
    expect(store.loading).toBe(false);
    expect(store.isAuthChecked).toBe(true);
    expect(store.isAuthentificated).toBe(true);
  });

  test('обновление данных пользователя (pending)', () => {
    const thunkAction = { type: updateUserThunk.pending.type };

    const store = userReducer(initialState, thunkAction);

    expect(store.loading).toBe(true);
    expect(store.updateUserError).toBe('');
  });

  test('обновление данных пользователя (success)', () => {
    const thunkAction = {
      type: updateUserThunk.fulfilled.type,
      payload: { user: user }
    };

    const store = userReducer(initialState, thunkAction);

    expect(store.loading).toBe(false);
    expect(store.isAuthChecked).toBe(true);
    expect(store.isAuthentificated).toBe(true);
    expect(store.data).toEqual(user);
  });

  test('обновление данных пользователя (rejected)', () => {
    const thunkAction = {
      type: updateUserThunk.rejected.type,
      error: { message: 'ошибка обновления данных' }
    };

    const store = userReducer(initialState, thunkAction);

    expect(store.updateUserError).toEqual('ошибка обновления данных');
    expect(store.loading).toBe(false);
    expect(store.isAuthChecked).toBe(true);
    expect(store.isAuthentificated).toBe(true);
  });
});
