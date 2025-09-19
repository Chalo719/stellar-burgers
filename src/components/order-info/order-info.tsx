import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredients,
  selectIngredients
} from '../../services/slices/ingredients-slice';
import { useParams } from 'react-router-dom';
import {
  clearOrder,
  getOrderByNumber,
  selectOrderByNumber,
  selectOrderByNumberError,
  selectOrderByNumberLoading
} from '../../services/slices/order-slice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const ingredients = useSelector(selectIngredients);

  const orderData = useSelector(selectOrderByNumber);
  const isOrderLoading = useSelector(selectOrderByNumberLoading);
  const isOrderError = useSelector(selectOrderByNumberError);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
    dispatch(getOrderByNumber(Number(number)));

    return () => {
      dispatch(clearOrder());
    };
  }, [dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  return (
    <>
      {isOrderLoading || !orderInfo ? (
        <Preloader />
      ) : isOrderError || !orderInfo ? (
        <h3 className={`pb-6 text text_type_main-large`}>
          Ошибка при выполнении запроса к серверу.
        </h3>
      ) : (
        <OrderInfoUI orderInfo={orderInfo} />
      )}
    </>
  );
};
