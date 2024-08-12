import { FC, useEffect } from 'react';
import {
  getLoader,
  getReadyOrders,
  getReadyOrdersThunk
} from '../../slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useParams } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReadyOrdersThunk());
  }, []);

  const orders: TOrder[] = useSelector(getReadyOrders);

  return <ProfileOrdersUI orders={orders} />;
};
