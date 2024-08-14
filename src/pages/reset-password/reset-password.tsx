import { FC, SyntheticEvent, useEffect, useState } from 'react';

import { ResetPasswordUI } from '@ui-pages';
import { resetPasswordApi } from '@api';
import { useNavigate } from 'react-router-dom';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | undefined>('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');
    resetPasswordApi({ password, token })
      .then(() => {
        localStorage.removeItem('resetPassword');
        navigate('/login');
      })
      .catch((err) => {
        if (err) {
          setError('Ошибка в обновлении пароля');
        }
      });
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={error}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
