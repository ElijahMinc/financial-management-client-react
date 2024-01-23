import React from 'react';
import { useAuth } from '../hooks/useAuth';
import protectedImg from '../assets/protected-icon.webp';

interface ProtectedRouteProps {}

export const ProtectedRoute = ({
  children,
}: React.PropsWithChildren<ProtectedRouteProps>) => {
  const isAuth = useAuth();

  return (
    <>
      {isAuth ? (
        children
      ) : (
        <div className="flex flex-col justify-center items-center mt-20 gap-10">
          <h1 className="text-2xl">To view this page you must be logged in.</h1>
          <img className="w-1/3" src={protectedImg} alt="protected img" />
        </div>
      )}
    </>
  );
};
