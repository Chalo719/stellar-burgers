import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getProfileOrders,
  selectOrders,
  selectOrdersError,
  selectOrdersLoading
} from '../../services/slices/profileOrders-slice';
import {
  getIngredients,
  selectIngredients
} from '../../services/slices/ingredients-slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);

  const ingredients = useSelector(selectIngredients);
  const isIngredients = ingredients.length > 0;

  useEffect(() => {
    if (!isIngredients) {
      dispatch(getIngredients());
    }
    dispatch(getProfileOrders());
  }, [dispatch, isIngredients]);

  return (
    <>
      {error ? (
        <h3 className={`pb-6 text text_type_main-large`}>
          Ошибка при выполнении запроса к серверу.
        </h3>
      ) : (
        <ProfileOrdersUI orders={orders} loading={loading} />
      )}
    </>
  );
};
