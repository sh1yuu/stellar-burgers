import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { selectorOrders } from '../../services/orders-slice';
import { useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectorOrders);

  return <ProfileOrdersUI orders={orders} />;
};
