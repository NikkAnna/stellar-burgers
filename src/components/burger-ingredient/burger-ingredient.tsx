import { FC, SyntheticEvent, memo } from 'react';
import {
  addIngredientToOrder,
  composeOrderIngredients,
  deleteIngredientInOrder,
  getComposedOrderIngredients,
  getOrderBun
} from '../../slices/orderSlice';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { useDispatch } from '../../services/store';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const orderIngredients = useSelector(getComposedOrderIngredients);
    const getBuns = useSelector(getOrderBun);

    const handleAdd = () => {
      const generateRandomString = (length: number) => {
        const test = Math.random()
          .toString(36)
          .substring(2, length + 2);
        return test;
      };

      if (ingredient.type === 'bun') {
        if (getBuns) {
          if (getBuns?._id === ingredient._id) {
            return;
          }
          dispatch(
            addIngredientToOrder(
              Object.assign(
                { ...ingredient },
                {
                  id: generateRandomString(9)
                }
              )
            )
          );
        } else {
          dispatch(
            addIngredientToOrder(
              Object.assign(
                { ...ingredient },
                {
                  id: generateRandomString(9)
                }
              )
            )
          );
        }
      } else {
        dispatch(
          addIngredientToOrder(
            Object.assign(
              { ...ingredient },
              {
                id: generateRandomString(9)
              }
            )
          )
        );
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
