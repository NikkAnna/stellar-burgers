import { FC, SyntheticEvent, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {
  checkUserAuth,
  getUser,
  getUserErrorSelector,
  isAuthentificatedSelector,
  isUserLoadingSelector,
  registerUserThunk
} from '../../slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';

import { Preloader } from '@ui';
import { RegisterUI } from '@ui-pages';

export const Register: FC = () => {
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthentificatedSelector);
  const loading = useSelector(isUserLoadingSelector);
  const location = useLocation();
  const error = useSelector(getUserErrorSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setErrorText('Введите свои данные');
      return;
    }

    if (loading) {
      return <Preloader />;
    }

    dispatch(registerUserThunk({ email, password, name }))
    .then(() => {
      if (error) {
        setErrorText('Такой пользователь уже зарегистрирован');
      }
    })

  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
