import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Hosts from '../pages/hosts';
import Login from '../pages/login';
import Layout from '../layout';
import { useCallback } from 'react';
import Dashboard from '../pages/dashboard';
import Inbounds from '../pages/inbounds';
import InboundConfigs from 'pages/inbounds_configs';
import Accounts from 'pages/accounts';
import config from 'config';
import Users from '../pages/users';
import PropTypes from 'prop-types';

const Routerr = () => {
  const PrivateRoute = ({ children }) => {
    var user = localStorage.getItem(`${config.appPrefix}_appData`);
    user = JSON.parse(user);
    const location = useLocation();

    return user?.value?.token ? (
      <>{children}</>
    ) : (
      <Navigate to="/login" replace state={{ from: location }} />
    );
  };
  const CheckRoute = useCallback(({ children }) => {
    var user = localStorage.getItem(`${config.appPrefix}_appData`);
    user = JSON.parse(user);
    return user?.value?.token ? <Navigate to="/patients" replace /> : <>{children}</>;
  }, []);
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <CheckRoute>
            <Login />
          </CheckRoute>
        }
      />
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="hosts"
          element={
            <PrivateRoute>
              <Hosts />
            </PrivateRoute>
          }
        />
        <Route
          path="inbounds"
          element={
            <PrivateRoute>
              <Inbounds />
            </PrivateRoute>
          }
        />
        <Route
          path="inbounds/configs"
          element={
            <PrivateRoute>
              <InboundConfigs />
            </PrivateRoute>
          }
        />
        <Route
          path="accounts"
          element={
            <PrivateRoute>
              <Accounts />
            </PrivateRoute>
          }
        />
        <Route
          path="users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};
Routerr.propTypes = {
  children: PropTypes.node
};

export default Routerr;
