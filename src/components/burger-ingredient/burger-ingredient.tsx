import { FC, memo } from 'react';
import {
  addBunToOrder,
  addMainsAndSaucesToOrder,
  getOrderBun
} from '../../slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useLocation } from 'react-router-dom';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const getBuns = useSelector(getOrderBun);

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        if (getBuns) {
          if (getBuns?._id === ingredient._id) {
            return;
          }
          dispatch(addBunToOrder(ingredient));
        } else {
          dispatch(addBunToOrder(ingredient));
        }
      } else {
        dispatch(addMainsAndSaucesToOrder(ingredient));
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
