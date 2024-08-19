import { FC, memo } from 'react';
import { OrdersListUI, Preloader } from '@ui';

import { OrdersListProps } from './type';
import { getLoader } from '../../slices/orderSlice';
import { useSelector } from '../../services/store';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const loader = useSelector(getLoader);
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (loader) {
    return <Preloader />;
  }

  return <OrdersListUI orderByDate={orderByDate} />;
});
