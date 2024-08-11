import { FC, memo, useState } from 'react';
import {
  addIngredientToOrder,
  deleteIngredientInOrder,
  getOrderFullIngredients,
  getOrderIngredients
} from '../../slices/orderSlice';

import { BurgerConstructorElementProps } from './type';
import { BurgerConstructorElementUI } from '@ui';
import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    
    const [newIndex, setNewIndex] = useState(0);
    
    const handleMoveDown = () => {
      setNewIndex(index - 1)
    };

    const handleMoveUp = () => {
      setNewIndex(index + 1)
    };

    const handleClose = () => {
      dispatch(deleteIngredientInOrder(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={newIndex}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
