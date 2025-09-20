import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectUpdateError,
  selectUser,
  updateUser
} from '../../services/slices/auth-slice';

export const Profile: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const updateError = useSelector(selectUpdateError);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.name || '',
    password: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  useEffect(() => {
    if (updateError) {
      setError('Ошибка при выполнении запроса к серверу.');
    } else {
      setError('');
    }
  }, [updateError]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!formValue.name || !formValue.email) {
      setError('Заполните все поля формы.');
      return;
    }

    dispatch(
      updateUser({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password || undefined
      })
    );

    setFormValue((prevState) => ({ ...prevState, password: '' }));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();

    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });

    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      updateUserError={error}
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
