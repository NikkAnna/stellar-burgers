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
import { Route, Routes, createBrowserRouter } from 'react-router-dom';
import { SyntheticEvent, useState } from 'react';

import { ProtectedRoute } from './protected-route';
import { getOrderByNumber } from '../slices/orderSlice';
import { useSelector } from '../services/store';

export const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound404 />
  },
  {
    path: '/',
    element: <AppHeader />,
    children: [
      {
        index: true,
        element: <ConstructorPage />
      }
    ]
  },
  {
    path: '/feed',
    element: <AppHeader />,
    children: [
      {
        index: true,
        element: <Feed />
      },
      {
        path: ':number',
        element: (
          <Modal title='' onClose={() => {}}>
            <OrderInfo />
          </Modal>
        )
      }
    ]
  },
  {
    path: '/login',
    element: <AppHeader />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute onlyUnAuth>
            <Login />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/register',
    element: <AppHeader />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute onlyUnAuth>
            <Register />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/forgot-password',
    element: <AppHeader />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute onlyUnAuth>
            <ForgotPassword />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/reset-password',
    element: <AppHeader />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute onlyUnAuth>
            <ResetPassword />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/ingredients/:id',
    element: <AppHeader />,
    children: [
      {
        index: true,
        element: (
          <Modal title={'Детали ингредиента'} onClose={() => {}}>
            <IngredientDetails />
          </Modal>
        )
      }
    ]
  },
  {
    path: '/profile',
    element: <AppHeader />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        )
      },
      {
        path: 'orders/:number',
        element: (
          <ProtectedRoute>
            <Modal title='' onClose={() => {}}>
              <OrderInfo />
            </Modal>
          </ProtectedRoute>
        )
      }
    ]
  }
]);
