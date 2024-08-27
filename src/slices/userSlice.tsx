import {
  TLoginData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie, setCookie } from '../utils/cookie';

import { TUser } from '@utils-types';

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const userData = await loginUserApi(data);
    setCookie('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);
    return userData.user;
  }
);

type TUserData = {
  name: string;
  email: string;
  password: string;
};

export const registerUserThunk = createAsyncThunk(
  'user/register',
  async (data: TUserData) => {
    const userData = await registerUserApi(data);
    setCookie('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);
    return userData.user;
  }
);

export const getUser = createAsyncThunk('user/get info', async () =>
  getUserApi()
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'user/logout',
  async () => await logoutApi()
);

export const updateUserThunk = createAsyncThunk(
  'user/updateInfo',
  async (data: TUserData) => await updateUserApi(data)
);

export type TUserState = {
  isAuthChecked: boolean;
  isAuthentificated: boolean;
  data: TUser | null;
  loginUserError: string | undefined;
  registrationUserError: string | undefined;
  logoutUserError: string | undefined;
  updateUserError: string | undefined;
  loading: boolean;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  isAuthentificated: false,
  data: null,
  loginUserError: '',
  registrationUserError: '',
  logoutUserError: '',
  updateUserError: '',
  loading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    getUserInfo: (state) => state.data,
    isAuthentificatedSelector: (state) => state.isAuthentificated,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    getUserName: (state) => state.data?.name,
    getUserLoginErrorSelector: (state) => state.loginUserError,
    getUserRegistrationErrorSelector: (state) => state.registrationUserError,
    getUserLogoutErrorSelector: (state) => state.logoutUserError,
    getUpdateUserErrorSelector: (state) => state.updateUserError,
    isUserLoadingSelector: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.registrationUserError = '';
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.registrationUserError = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.isAuthentificated = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.loginUserError = '';
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.loginUserError = action.error.message;
        state.isAuthChecked = true;
        state.isAuthentificated = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthentificated = true;
        state.isAuthChecked = true;
        state.data = action.payload.user;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.loginUserError = '';
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.loginUserError = action.error.message;
        state.isAuthChecked = true;
        state.isAuthentificated = false;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthentificated = true;
        state.isAuthChecked = true;
        state.data = action.payload;
      })
      .addCase(logoutUserThunk.pending, (state) => {
        state.loading = true;
        state.logoutUserError = '';
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.logoutUserError = action.error.message;
        state.isAuthChecked = true;
        state.isAuthentificated = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthentificated = false;
        state.isAuthChecked = true;
        state.data = null;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.updateUserError = '';
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.updateUserError = action.error.message;
        state.isAuthChecked = true;
        state.isAuthentificated = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthentificated = true;
        state.isAuthChecked = true;
        state.data = action.payload.user;
      });
  }
});

export const userReducer = userSlice.reducer;
export const {
  getUserInfo,
  isAuthentificatedSelector,
  isAuthCheckedSelector,
  getUserName,
  getUserLoginErrorSelector,
  isUserLoadingSelector,
  getUserRegistrationErrorSelector,
  getUserLogoutErrorSelector,
  getUpdateUserErrorSelector
} = userSlice.selectors;
export const { authChecked } = userSlice.actions;
