import { Preloader, ProfileMenuUI } from '@ui';
import { isUserLoadingSelector, logoutUserThunk } from '../../slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';

import { FC } from 'react';
import { useLocation } from 'react-router-dom';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const loading = useSelector(isUserLoadingSelector);

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  if (loading) {
    return <Preloader />;
  }

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
