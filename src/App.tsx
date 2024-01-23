import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { useAppDispatch } from './store/hooks';
import { getTokenFromLocalStorage } from './helpers/localstorage.helper';
import { AuthService } from './services/auth.service.';
import { login, logout } from './store/user/userSlice';

import './App.css';

function App() {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();

    try {
      if (!token) return;

      const data = await AuthService.getProfile();

      if (!data) {
        dispatch(logout());

        return;
      }

      dispatch(login(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
