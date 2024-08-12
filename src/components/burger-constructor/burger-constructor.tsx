import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import {
  composeOrderIngredients,
  getComposedOrderIngredients,
  getOrderBun,
  getOrderMainAndSauces,
  makeOrderThunk
} from '../../slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

import { BurgerConstructorUI } from '@ui';
import { Navigate } from 'react-router-dom';
import { getIngredients } from '../../slices/ingredientsSlice';
import { isAuthentificatedSelector } from '../../slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const ingredients = useSelector(getIngredients);

  // const isAuthentificated = useSelector(isAuthentificatedSelector);
  const orderIngredients = useSelector(getOrderMainAndSauces);
  const orderBun = useSelector(getOrderBun);
  const dispatch = useDispatch();
  const composedOrder = useSelector(getComposedOrderIngredients);

  const constructorItems = {
    bun: orderBun || null,
    ingredients: orderIngredients
  };

  const orderRequest = false;

  const orderModalData = null;

  // useEffect(() => {
  //   dispatch(composeOrderIngredients());
  // }, [constructorItems])

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    dispatch(composeOrderIngredients());
    dispatch(makeOrderThunk(composedOrder)).then((data) => {
      console.log(data.payload);
    });
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

  // return null;

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
