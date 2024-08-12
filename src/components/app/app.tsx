import '../../index.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import {
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter
} from 'react-router-dom';
import {
  getIngredientsLoader,
  getIngredientsThunk
} from '../../slices/ingredientsSlice';
import { getUser, getUserInfo } from '../../slices/userSlice';
import store, { useDispatch, useSelector } from '../../services/store';

import { Preloader } from '@ui';
import { getFeedThunk } from '../../slices/feedSlice';
import { router } from '../../routes/route';
import styles from './app.module.css';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserInfo);

  useEffect(() => {
    dispatch(getIngredientsThunk());
    dispatch(getFeedThunk());
    // dispatch(getUser());
  }, []);

  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
