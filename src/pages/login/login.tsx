import { FC, SyntheticEvent, useEffect, useState } from 'react';
import {
  getUserLoginErrorSelector,
  isUserLoadingSelector,
  loginUserThunk
} from '../../slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';

import { LoginUI } from '@ui-pages';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector(isUserLoadingSelector);
  const error = useSelector(getUserLoginErrorSelector);

  useEffect(() => {
    if (error) {
      setErrorText('Некорректный e-mail или пароль');
    }
  }, [error]);

  useEffect(() => {
    setErrorText('');
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorText('Введите свои данные');
      return;
    }

    dispatch(loginUserThunk({ email, password }));
  };

  if (loading) {
    return <Preloader />;
  }

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
