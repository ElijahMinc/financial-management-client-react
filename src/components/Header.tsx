import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBtc, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/user/userSlice';
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper';
import { toast } from 'react-toastify';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage('ACCESS_TOKEN');
    toast.success('You logged out.');
    navigate('/auth');
  };

  return (
    <header className="flex items-center justify-between px-4 py-4 shadow-sm bg-slate-800 backdrop:blur-sm">
      <Link to="/">
        <FaBtc size={20} />
      </Link>

      {/* Menu */}
      {isAuth && (
        <nav className="ml-auto mr-10">
          <ul className="flex items-center gap-5">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'text-white' : 'text-white/50'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  isActive ? 'text-white' : 'text-white/50'
                }
              >
                Transaction
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  isActive ? 'text-white' : 'text-white/50'
                }
              >
                Categories
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {/* Actions */}
      {isAuth ? (
        <button className="btn btn-red" onClick={logoutHandler}>
          <span>Log Out</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link to="auth" className="py-2 text-white/50 hover:text-white ml-auto">
          Log in / Sign in
        </Link>
      )}
    </header>
  );
};
