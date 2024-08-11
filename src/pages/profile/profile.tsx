import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { getUserErrorSelector, getUserInfo, isAuthentificatedSelector, isUserLoadingSelector, updateUserInfo, updateUserThunk } from '../../slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';

import { Preloader } from '@ui';
import { ProfileUI } from '@ui-pages';
import { updateUserApi } from '@api';

export const Profile: FC = () => {
  
  const userInfo = useSelector(getUserInfo);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthentificatedSelector);
  const loading = useSelector(isUserLoadingSelector);
  const userError = useSelector(getUserErrorSelector);

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

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isFormChanged) {
      if (loading) {
        return <Preloader />;
      }
      dispatch(
        updateUserThunk({
          name: formValue.name,
          email: formValue.email,
          password: formValue.password
        })
      ).then(() => {
        if (userError) {
          setError(userError);
          return;
        }
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
