import { FC, SyntheticEvent, useEffect, useState } from 'react';
import {
  getUpdateUserErrorSelector,
  getUserInfo,
  isUserLoadingSelector,
  updateUserThunk
} from '../../slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';

import { Preloader } from '@ui';
import { ProfileUI } from '@ui-pages';

export const Profile: FC = () => {
  const userInfo = useSelector(getUserInfo);
  const dispatch = useDispatch();
  const loading = useSelector(isUserLoadingSelector);
  const userError = useSelector(getUpdateUserErrorSelector);

  const user = {
    name: userInfo?.name || '',
    email: userInfo?.email || ''
  };

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (userError) {
      setError('Ошибка в обновлении данных');
    }
  }, [userError]);

  useEffect(() => {
    setError('');
  }, []);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isFormChanged) {
      dispatch(
        updateUserThunk({
          name: formValue.name,
          email: formValue.email,
          password: formValue.password
        })
      ).then(() => {
        setFormValue({
          name: formValue.name,
          email: formValue.email,
          password: ''
        });
      });
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(isFormChanged);
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={error}
    />
  );
};
