import { FC, SyntheticEvent, useEffect, useState } from 'react';
import {
  getUserRegistrationErrorSelector,
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
  const loading = useSelector(isUserLoadingSelector);
  const error = useSelector(getUserRegistrationErrorSelector);

  useEffect(() => {
    if (error) {
      setErrorText('Такой пользователь уже зарегистрирован');
    }
  }, [error]);

  useEffect(() => {
    setErrorText('');
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setErrorText('Введите свои данные');
      return;
    }

    dispatch(registerUserThunk({ email, password, name }));
  };

  if (loading) {
    return <Preloader />;
  }

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
