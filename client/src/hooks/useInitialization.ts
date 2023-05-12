// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { LOGIN_ROUTE } from '@utils/contants';
// import { AUTH_HEADER } from '@utils/headers';

// import { StorageService } from '@services/StorageService';

// const storageService = StorageService.getInstance();

const useInitialization = () => {
  // const navigate = useNavigate();
  // const activeLocationTab = storageService.getItem('activeTabLC');
  // useEffect(() => {
  //   if (activeLocationTab) {
  //     navigate(`/${activeLocationTab}`);
  //   } else {
  //     navigate(LOGIN_ROUTE);
  //     storageService.removeItem(AUTH_HEADER);
  //   }
  // }, []);
};

export { useInitialization };
