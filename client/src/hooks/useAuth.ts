import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CLOUD_ROUTE, LOGIN_ROUTE, START_ROUTE } from '@utils/contants';

import { AUTH_HEADER } from '@src/utility/headers';
import { $api } from '@src/http/http';

import { StorageService } from '@services/StorageService';

const storageService = StorageService.getInstance();

const useAuth = () => {
  const token = storageService.getItem(AUTH_HEADER);
  const isPreviewChecked = storageService.getItem('previewCheck');
  const activeTabLC = storageService.getItem('activeTabLC') || CLOUD_ROUTE;
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null && !isPreviewChecked) {
      navigate(START_ROUTE);
    }
    if (token !== null && isPreviewChecked) {
      $api.defaults.headers.common[AUTH_HEADER] = token;
      navigate(activeTabLC);
    }
    if (token === null && isPreviewChecked) {
      storageService.removeItem(AUTH_HEADER);
      storageService.removeItem('activeTabLC');
      navigate(LOGIN_ROUTE);
    }
  }, [token]);
};

export { useAuth };
