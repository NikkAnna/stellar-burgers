import { FC, useEffect, useMemo } from 'react';
import {
  composeOrderIngredients,
  getComposedOrderIngredients,
  getJustDoneOrder,
  getLoader,
  getOrderBun,
  getOrderMainAndSauces,
  makeOrderThunk,
  resetJustDoneOrder
} from '../../slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { isAuthentificatedSelector } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const orderIngredients = useSelector(getOrderMainAndSauces);
  const orderBun = useSelector(getOrderBun);
  const dispatch = useDispatch();
  const composedOrder = useSelector(getComposedOrderIngredients);
  const orderModal = useSelector(getJustDoneOrder);
  const navigate = useNavigate();

  const constructorItems = {
    bun: orderBun || null,
    ingredients: orderIngredients
  };

  const orderRequest = useSelector(getLoader);
  const isAuthentificated = useSelector(isAuthentificatedSelector);

  const orderModalData = orderModal || null;

  useEffect(() => {
    dispatch(composeOrderIngredients());
  }, [constructorItems.bun, constructorItems.ingredients]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (isAuthentificated) {
      dispatch(makeOrderThunk(composedOrder));
    } else {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(resetJustDoneOrder());
  };

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
