import { AppHeaderUI } from '@ui';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectorData } from '../../services/user-slice';

export const AppHeader: FC = () => {
  const userName = useSelector(selectorData)?.name;
  return <AppHeaderUI userName={userName} />;
};
