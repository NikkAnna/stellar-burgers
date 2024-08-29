import { BurgerIngredient } from '@components';
import { TIngredientsCategoryUIProps } from './type';
import { forwardRef } from 'react';
import styles from './ingredients-category.module.css';

export const IngredientsCategoryUI = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryUIProps
>(({ title, titleRef, ingredients, ingredientsCounters, ...rest }, ref) => (
  <>
    <h3 className='text text_type_main-medium mt-10 mb-6' ref={titleRef}>
      {title}
    </h3>
    <ul className={styles.items} ref={ref} {...rest}>
      {ingredients.map((ingredient) => (
        <BurgerIngredient
          ingredient={ingredient}
          key={ingredient._id}
          count={ingredientsCounters[ingredient._id]}
        />
      ))}
    </ul>
  </>
));
