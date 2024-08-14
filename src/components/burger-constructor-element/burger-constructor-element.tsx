import { FC, memo, useEffect } from 'react';
import {
  deleteIngredientInOrder,
  moveDownIngredientInOrder,
  moveUpIngredientInOrder
} from '../../slices/orderSlice';

import { BurgerConstructorElementProps } from './type';
import { BurgerConstructorElementUI } from '@ui';
import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    useEffect(() => {}, []);

    const handleMoveDown = () => {
      dispatch(moveDownIngredientInOrder(index));
    };

    const handleMoveUp = () => {
      dispatch(moveUpIngredientInOrder(index));
    };

    const handleClose = () => {
      dispatch(deleteIngredientInOrder(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
