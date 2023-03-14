import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes } from "../../routes";

import { useSelector } from "../../redux/store/configurationStore";

export const AppRouter: React.FC = () => {
  const { isAuth } = useSelector(store => store.user);

  if (isAuth) {
    return (
      <div>1</div>
    )
  }

  return (
    <Routes>
      {publicRoutes.map(({ path, Element }) => (
        <Route path={path} element={<Element />} key={path} />
      ))}
    </Routes>
  );
};
