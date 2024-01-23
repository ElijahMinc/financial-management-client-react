import React, { useState } from 'react';
import { AuthService } from '../services/auth.service.';
import { toast } from 'react-toastify';
import { setTokenToLocalStorage } from '../helpers/localstorage.helper';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/user/userSlice';
import { useNavigate } from 'react-router-dom';

export const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const titleText = isLogin ? 'Login' : 'Registration';

  const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const data = await AuthService.registration({
        email,
        password,
      });

      if (data) {
        toast.success('Account has been created');
        setIsLogin((prev) => !prev);
      }
    } catch (err: any) {
      const error = err.response?.data.message;

      toast.error(error.toString());
    }
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const data = await AuthService.login({
        email,
        password,
      });

      if (!data) return;

      toast.success('You are authorized');
      setIsLogin((prev) => !prev);
      setTokenToLocalStorage('ACCESS_TOKEN', data.token);
      dispatch(login(data));
      navigate('/');
    } catch (err: any) {
      const error = err.response?.data.message;

      toast.error(error.toString());
    }
  };

  return (
    <div className="mt-40 flex flex-col justify-center items-center bg-slate-900 text-white">
      <h1 className="mb-10 text-center text-xl">{titleText}</h1>

      <form
        onSubmit={isLogin ? loginHandler : registrationHandler}
        className="flex w-1/3 flex-col max-auto gap-5"
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className="input"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="input"
          placeholder="Password"
        />

        <div className="flex justify-center mt-5">
          <button className="btn btn-green max-auto">Submit</button>
        </div>
      </form>

      <button
        onClick={() => setIsLogin((isLoginPrevValue) => !isLoginPrevValue)}
        className="text-slate-300 hover:text-white mt-4"
      >
        {isLogin ? 'You dont have an account?' : 'Already have an account?'}
      </button>
    </div>
  );
};
