import { BurgerConstructor, BurgerIngredients } from '@components';

import { ConstructorPageUIProps } from './type';
import { FC } from 'react';
import { Preloader } from '@ui';
import { getIngredientsLoader } from '../../../../slices/ingredientsSlice';
import styles from './constructor-page.module.css';
import { useSelector } from '../../../../services/store';

export const ConstructorPageUI: FC<ConstructorPageUIProps> = ({
  isIngredientsLoading
}) => {
  const isLoading = useSelector(getIngredientsLoader);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
