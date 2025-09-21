import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import {
  getIngredients,
  selectIngredients,
  selectIngredientsError,
  selectIngredientsLoading
} from '../../services/slices/ingredients-slice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const ingredients = useSelector(selectIngredients);
  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  const isIngredientsError = useSelector(selectIngredientsError);

  const ingredientData = ingredients.find((item) => item._id === id);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch]);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : isIngredientsError || !ingredientData ? (
        <h3 className={`pb-6 text text_type_main-large`}>
          Ошибка при выполнении запроса к серверу.
        </h3>
      ) : (
        <IngredientDetailsUI ingredientData={ingredientData} />
      )}
    </>
  );
};
