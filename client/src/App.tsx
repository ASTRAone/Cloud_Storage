import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// import { useStyles } from '@hooks/useStyles';

// import { NavBar } from '@components/NavBar';
import { AppRouter } from '@components/AppRouter';

import { store } from '@store/root';

import { EnvProvider } from './EnvProvider/EnvProvider';
// import styles from './styles.module.scss';

export const App: React.FC = () => {
  // const cx = useStyles(styles);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <EnvProvider baseURL={process.env.REACT_APP_API_URL}>
          <AppRouter />
        </EnvProvider>
      </Provider>
    </BrowserRouter>
  );
};
