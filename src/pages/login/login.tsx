import { FC, SyntheticEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  getUserErrorSelector,
  isAuthentificatedSelector,
  isUserLoadingSelector,
  loginUserThunk
} from '../../slices/userSlice';
import store, { useDispatch, useSelector } from '../../services/store';

import { LoginUI } from '@ui-pages';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector(isUserLoadingSelector);
  const error = useSelector(getUserErrorSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorText('Введите свои данные');
      return;
    }

    dispatch(loginUserThunk({ email, password })).then(() => {
      if (error) {
        setErrorText('Некорректный пароль');
      }
    });
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
