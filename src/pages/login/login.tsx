import {
  Dispatch,
  FC,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState
} from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  loginUser,
  selectLoginError,
  selectUser
} from '../../services/slices/auth-slice';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const loginError = useSelector(selectLoginError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const setEmailHandler = (value: string) => {
    setEmail(value);
    if (error) setError('');
  };

  const setPasswordHandler = (value: string) => {
    setPassword(value);
    if (error) setError('');
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Заполните все поля формы.');
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  useEffect(() => {
    if (loginError) {
      setError('Ошибка при выполнении запроса к серверу.');
    }
  }, [loginError]);

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmailHandler as Dispatch<SetStateAction<string>>}
      password={password}
      setPassword={setPasswordHandler as Dispatch<SetStateAction<string>>}
      handleSubmit={handleSubmit}
    />
  );
};
