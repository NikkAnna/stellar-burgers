import { FC, SyntheticEvent, useState } from 'react';

import { ForgotPasswordUI } from '@ui-pages';
import { forgotPasswordApi } from '@api';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>('');

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setError('');
    forgotPasswordApi({ email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => {
        if (err) {
          setError('Некорректный e-mail');
        }
      });
  };

  return (
    <ForgotPasswordUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
