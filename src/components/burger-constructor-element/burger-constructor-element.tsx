import { FC, memo, useEffect, useRef, useState } from 'react';
import {
  addIngredientToOrder,
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

    const [newIndex, setNewIndex] = useState(index);

    useEffect(() => {}, []);

    const handleMoveDown = () => {
      dispatch(moveDownIngredientInOrder(newIndex));
    };

    const handleMoveUp = () => {
      // dispatch(moveUpIngredientInOrder(newIndex));
      // // setNewIndex((newIndex) => newIndex - 1);
      // console.log(newIndex)
      // debugger
    };

    const handleClose = () => {
      dispatch(deleteIngredientInOrder(ingredient));
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
