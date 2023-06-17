import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useInitialization = () => {
  const location = useLocation();
  useEffect(() => {
    const body = document.body;
    if (location.pathname === '/') {
      body.style.overflowY = 'auto';
    } else body.style.overflowY = 'hidden';
  }, [location]);
};

export { useInitialization };
