import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LOGIN_ROUTE } from '@utils/contants';

import { StorageService } from '@services/StorageService';

const storageService = StorageService.getInstance();

const useInitialization = () => {
  const location = storageService.getItem('activeTabLC');
  const navigate = useNavigate();
  useEffect(() => {
    if (location) {
      navigate(`/${location}`);
    } else {
      navigate(LOGIN_ROUTE);
    }
  }, []);
};

export { useInitialization };
