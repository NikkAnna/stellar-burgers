import { FC } from 'react';
import { FeedInfoUI } from '../ui/feed-info';
import { TOrder } from '@utils-types';
import { getOrdersFeed } from '../../slices/feedSlice';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const feedList = useSelector(getOrdersFeed);

  const orders: TOrder[] = feedList.orders.orders;
  const feed = {
    total: feedList.orders.total,
    totalToday: feedList.orders.totalToday
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
