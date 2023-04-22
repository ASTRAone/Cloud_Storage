import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LOGIN_ROUTE } from '@utils/contants';

import { AUTH_HEADER } from '@src/utility/headers';
import { $api } from '@src/http/http';

import { StorageService } from '@services/StorageService';

const storageService = StorageService.getInstance();

const useAuth = () => {
  const token = storageService.getItem(AUTH_HEADER);
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null) {
      $api.defaults.headers.common[AUTH_HEADER] = token;
    } else {
      storageService.removeItem(AUTH_HEADER);
      navigate(LOGIN_ROUTE);
    }
  }, [token]);
};

export { useAuth };
