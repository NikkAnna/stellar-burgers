import { BurgerConstructorUI, Preloader } from '@ui';
import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import {
  composeOrderIngredients,
  getComposedOrderIngredients,
  getJustDoneOrder,
  getLoader,
  getOrderBun,
  getOrderMainAndSauces,
  makeOrderThunk
} from '../../slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

import { Navigate } from 'react-router-dom';
import { getIngredients } from '../../slices/ingredientsSlice';
import { isAuthentificatedSelector } from '../../slices/userSlice';

export const BurgerConstructor: FC = () => {
  const orderIngredients = useSelector(getOrderMainAndSauces);
  const orderBun = useSelector(getOrderBun);
  const dispatch = useDispatch();
  const composedOrder = useSelector(getComposedOrderIngredients);
  const orderModal = useSelector(getJustDoneOrder);

  const constructorItems = {
    bun: orderBun || null,
    ingredients: orderIngredients
  };

  const orderRequest = useSelector(getLoader);

  const orderModalData = orderModal || null;

  useEffect(() => {
    dispatch(composeOrderIngredients());
  }, [constructorItems.bun, constructorItems.ingredients]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    dispatch(makeOrderThunk(composedOrder));
  };

  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
