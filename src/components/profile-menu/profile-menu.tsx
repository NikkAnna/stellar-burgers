import { FC, useDebugValue } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader, ProfileMenuUI } from '@ui';
import { getUserInfo, isAuthentificatedSelector, isUserLoadingSelector, logoutUserThunk } from '../../slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const loading = useSelector(isUserLoadingSelector);
  
  const handleLogout = () => {
    dispatch(logoutUserThunk());

    if (loading) {
      return <Preloader />
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
