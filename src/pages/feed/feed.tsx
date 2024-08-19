import { useDispatch, useSelector } from '../../services/store';

import { FC } from 'react';
import { FeedUI } from '@ui-pages';
import { Preloader } from '@ui';
import { getFeedThunk } from '../../slices/feedSlice';
import { getOrdersFeed } from '../../slices/feedSlice';

export const Feed: FC = () => {
  const orders = useSelector(getOrdersFeed);
  const dispatch = useDispatch();

  if (orders.loading) {
    return <Preloader />;
  }

  if (!orders.loading && orders.error) {
    return <p className='error'>Запрос завершился с ошибкой: {orders.error}</p>;
  }

  if (!orders.loading && orders.orders.orders.length === 0) {
    return <p className='message'>Нет ни одного заказа</p>;
  }

  const handleGetFeeds = () => {
    dispatch(getFeedThunk());
  };

  return (
    <>
      <FeedUI orders={orders.orders.orders} handleGetFeeds={handleGetFeeds} />
    </>
  );
};
