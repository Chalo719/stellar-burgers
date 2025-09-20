import { useDispatch, useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import {
  selectIngredientsLoading,
  selectIngredientsError,
  getIngredients,
  selectIngredients
} from '../../services/slices/ingredients-slice';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  const isIngredientsError = useSelector(selectIngredientsError);
  const isIngredients = ingredients.length > 0;

  useEffect(() => {
    if (!isIngredients) {
      dispatch(getIngredients());
    }
  }, [dispatch, isIngredients]);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : isIngredientsError ? (
        <h3 className={`pb-6 text text_type_main-large`}>
          Ошибка при выполнении запроса к серверу.
        </h3>
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
