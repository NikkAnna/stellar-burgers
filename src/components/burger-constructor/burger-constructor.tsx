import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { getOrderBun, getOrderFullIngredients, getOrderId, getOrderIngredients, getOrderMainAndSauces } from '../../slices/orderSlice';

import { BurgerConstructorUI } from '@ui';
import { Navigate } from 'react-router-dom';
import { getIngredients } from '../../slices/ingredientsSlice';
import { isAuthentificatedSelector } from '../../slices/userSlice';
import { useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const ingredients = useSelector(getIngredients);

  // const isAuthentificated = useSelector(isAuthentificatedSelector);
  const orderIngredients = useSelector(getOrderMainAndSauces);
  const orderId = useSelector(getOrderId);
  const orderBun = useSelector(getOrderBun);


  const constructorItems = {
    bun: orderBun || null,
    ingredients: orderIngredients
  }
  
  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    
  };

  const closeOrderModal = () => {
    
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
