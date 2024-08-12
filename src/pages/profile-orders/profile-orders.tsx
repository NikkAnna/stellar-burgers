import { FC, useEffect } from 'react';
import { getReadyOrders, getReadyOrdersThunk } from '../../slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReadyOrdersThunk());
  }, []);

  const ordersReady = useSelector(getReadyOrders);

  /** TODO: взять переменную из стора */
  const orders: TOrder[] = ordersReady;

  return <ProfileOrdersUI orders={orders} />;
};
