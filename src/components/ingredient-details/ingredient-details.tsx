import {
  getIngredients,
  getIngredientsLoader
} from '../../slices/ingredientsSlice';

import { FC } from 'react';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const loader = useSelector(getIngredientsLoader);
  let id = useParams().id;

  const ingredients = useSelector(getIngredients);

  const ingredientData = ingredients.ingredients.find((i) => i._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <>
      {loader && <Preloader />}
      {ingredientData && (
        <IngredientDetailsUI ingredientData={ingredientData} />
      )}
    </>
  );
};
