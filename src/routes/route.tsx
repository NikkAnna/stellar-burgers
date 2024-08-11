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

import { ProtectedRoute } from './protected-route';

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
        path: 'feed/:number',
        element: <OrderInfo />
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
        element: <IngredientDetails />
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
            <OrderInfo />
          </ProtectedRoute>
        )
      }
    ]
  }
]);
