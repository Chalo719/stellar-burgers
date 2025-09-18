import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getFeeds,
  selectFeedsError,
  selectFeedsLoading,
  selectFeedsOrders
} from '../../services/slices/feeds-slice';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredients,
  selectIngredients
} from '../../services/slices/ingredients-slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectFeedsOrders);
  const isFeedsLoading = useSelector(selectFeedsLoading);
  const isFeedsError = useSelector(selectFeedsError);

  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
    dispatch(getFeeds());
  }, [dispatch]);

  return (
    <>
      {isFeedsLoading ? (
        <Preloader />
      ) : isFeedsError ? (
        <h3 className={`pb-6 text text_type_main-large`}>
          Ошибка при выполнении запроса к серверу.
        </h3>
      ) : (
        <FeedUI
          orders={orders}
          handleGetFeeds={() => {
            dispatch(getFeeds());
          }}
        />
      )}
    </>
  );
};
