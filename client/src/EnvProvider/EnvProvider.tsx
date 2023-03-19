import React, { ReactNode, useLayoutEffect } from 'react';

import { RestService } from '../services/RestService';

type Props = {
  baseURL?: string;
  children?: ReactNode;
};

const EnvProvider: React.FC<Props> = ({ baseURL, children }) => {
  useLayoutEffect(() => {
    if (baseURL) RestService.getInstance().addBaseURL(baseURL);
  }, []);

  return <>{children}</>;
};

EnvProvider.displayName = 'EnvProvider';

export { EnvProvider };
