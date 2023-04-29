import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';

import { store } from '@store/root';

import { App } from './App';
import { EnvProvider } from './EnvProvider/EnvProvider';

import './i18next';
import 'react-toastify/dist/ReactToastify.css';
import './styles.module.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <EnvProvider baseURL={process.env.REACT_APP_API_URL}>
        <App />
      </EnvProvider>
    </Provider>
  </BrowserRouter>,
);
