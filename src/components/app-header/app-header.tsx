import { AppHeaderUI } from '@ui';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { getUserName } from '../../slices/userSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector(getUserName);

  return (
    <>
      <AppHeaderUI userName={userName} />
      <Outlet />
    </>
  );
};
