import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LOGIN_ROUTE } from '@utils/contants';

const useInitialization = () => {
  const location = localStorage.getItem('activeTabLC');
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
