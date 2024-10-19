import { TIngredient } from '@utils-types';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { selectorIngredients } from '../../services/ingredients-slice';
import { getOrder } from '../../services/order-slice';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { OrderInfoUI } from '../ui/order-info';
import { Preloader } from '../ui/preloader';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const dispatch = useDispatch();
  const orderId = Number(useParams().number);

  useEffect(() => {
    dispatch(getOrder(orderId));
  });

  const orderData = useSelector((state: RootState) => state.order.data);

  const ingredients: TIngredient[] = useSelector(selectorIngredients).filter(
    (i) => orderData?.ingredients.includes(i._id)
  );

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

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
