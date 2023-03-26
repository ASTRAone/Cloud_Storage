import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@store/root';

import { useStyles } from '@hooks/useStyles';

import { NavBar } from '@components/NavBar';
import { AppRouter } from '@components/AppRouter';

import { EnvProvider } from './EnvProvider/EnvProvider';
import styles from './styles.module.scss';

export const App: React.FC = () => {
  const cx = useStyles(styles);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <EnvProvider baseURL={process.env.REACT_APP_API_URL}>
          <div className={cx('app')}>
            <NavBar />
            <div className={cx('container')}>
              <AppRouter />
            </div>
          </div>
        </EnvProvider>
      </Provider>
    </BrowserRouter>
  );
};
