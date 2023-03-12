import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes } from "../../routes";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {publicRoutes.map(({path, Element}) => (
        <Route path={path} element={<Element />} key={path} />
      ))}
    </Routes>
  );
};
