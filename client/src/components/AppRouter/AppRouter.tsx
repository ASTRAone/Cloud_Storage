import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../../routes";
import { getUserData } from "../../store/auth/data";

import { useAppSelector } from "../../store/hooks";

import { DISK_ROUTE, LOGIN_ROUTE } from "../../utility/contants";

export const AppRouter: React.FC = () => {
  const { user } = useAppSelector(getUserData);

  if (user?.isAuth) {
    return (
      <Routes>
        {privateRoutes.map(({ path, Element }) => (
          <Route path={path} element={<Element />} key={path} />
        ))}
        <Route path="*" element={<Navigate to={DISK_ROUTE} />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {publicRoutes.map(({ path, Element }) => (
        <Route path={path} element={<Element />} key={path} />
      ))}
      <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
    </Routes>
  );
};
