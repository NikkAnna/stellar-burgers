import { FC, useEffect, useMemo } from 'react';
import {
  getLoader,
  getOrderByNumber,
  getOrderByNumberThunk
} from '../../slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

import { OrderInfoUI } from '../ui/order-info';
import { Preloader } from '../ui/preloader';
import { TIngredient } from '@utils-types';
import { getIngredients } from '../../slices/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const orderLoader = useSelector(getLoader);
  let number = useParams().number;

  useEffect(() => {
    dispatch(getOrderByNumberThunk(Number(number)));
  }, [number]);

  const orderData = useSelector(getOrderByNumber);

  const ingredientsData = useSelector(getIngredients);
  const ingredients: TIngredient[] = ingredientsData.ingredients;

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  return (
    <>
      {orderLoader && <Preloader />}
      {orderInfo && <OrderInfoUI orderInfo={orderInfo} />}
    </>
  );
};
