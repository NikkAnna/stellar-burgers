import { FC, SyntheticEvent, memo } from 'react';
import {
  addIngredientToOrder,
  deleteIngredientInOrder,
  getOrderFullIngredients,
  getOrderIngredients
} from '../../slices/orderSlice';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const orderIngredients = useSelector(getOrderIngredients);
    const orderFullIngredients = useSelector(getOrderFullIngredients);

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        const hasSameBun = orderIngredients.find(
          (ingr) => ingr === ingredient._id
        );

        const hasAnyBun = orderFullIngredients.find(
          (i) => i.type === ingredient.type
        );

        if (hasSameBun) {
          return;
        } else if (hasAnyBun) {
          dispatch(deleteIngredientInOrder(hasAnyBun._id));
          dispatch(addIngredientToOrder(ingredient));
        } else {
          dispatch(addIngredientToOrder(ingredient));
        }
      } else {
        dispatch(addIngredientToOrder(ingredient));
      }
      
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
