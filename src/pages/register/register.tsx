import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import {
  registerUser,
  selectRegisterError,
  selectUser
} from '../../services/slices/auth-slice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const registerError = useSelector(selectRegisterError);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password || !userName) {
      setError('Заполните все поля формы.');
      return;
    }

    dispatch(registerUser({ email, password, name: userName }));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  useEffect(() => {
    if (registerError) {
      setError('Ошибка при выполнении запроса к серверу.');
    } else {
      setError('');
    }
  }, [registerError]);

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
