import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getOrders, selectorOrders } from '../../services/orders-slice';
import { useDispatch, useSelector } from '../../services/store';
import { selectorData } from '../../services/user-slice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectorOrders);
  const dispatch = useDispatch();
  const user = useSelector(selectorData);

  useEffect(() => {
    if (user) {
      dispatch(getOrders());
    }
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
