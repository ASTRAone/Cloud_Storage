import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AxiosResponse } from 'axios';
import { RestService } from '../services/RestService';
import { StorageService } from '../services/StorageService';

import { AUTH_HEADER } from '../utility/headers';
import { LOGIN_ROUTE } from '../utility/contants';

const storageService = StorageService.getInstance();
const restService = RestService.getInstance();

const useAuth = () => {
  const authToken = storageService.getItem(AUTH_HEADER);
  const navigate = useNavigate();

  const unauthorisedHandler = (response: AxiosResponse) => {
    if (response.status === 401 && window.location.pathname !== LOGIN_ROUTE) {
      navigate(LOGIN_ROUTE);
      storageService.removeItem(AUTH_HEADER);
    }
  };

  restService.addInterceptors(unauthorisedHandler);

  useEffect(() => {
    if (authToken !== null) {
      restService.addDefaultHeader(AUTH_HEADER, authToken);
    } else {
      navigate(LOGIN_ROUTE);
    }
  }, [authToken]);
};

export { useAuth };
