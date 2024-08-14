import { BurgerConstructor } from '../../components';
import { BurgerIngredients } from '../../components';
import { FC } from 'react';
import { Preloader } from '../../components/ui';
import { getIngredients } from '../../slices/ingredientsSlice';
import styles from './constructor-page.module.css';
import { useSelector } from '../../services/store';

export const ConstructorPage: FC = () => {
  const ingredients = useSelector(getIngredients);

  if (ingredients.loading) {
    return <Preloader />;
  }

  if (!ingredients.loading && ingredients.error) {
    return (
      <p className='error'>Запрос завершился с ошибкой: {ingredients.error}</p>
    );
  }

  if (!ingredients.loading && ingredients.ingredients.length === 0) {
    return <p className='message'>Нет ни одного ингредиента</p>;
  }

  return (
    <>
      {ingredients.loading ? (
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
