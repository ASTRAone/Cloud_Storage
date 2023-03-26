import React, { ReactNode, useLayoutEffect } from 'react';

type Props = {
  baseURL?: string;
  children?: ReactNode;
};

const EnvProvider: React.FC<Props> = ({ baseURL, children }) => {
  useLayoutEffect(() => {
    if (baseURL) {
      // RestService.getInstance().addBaseURL(baseURL);
      // localStorage.setItem(AUTH_HEADER,)
    }
  }, []);

  return <>{children}</>;
};

EnvProvider.displayName = 'EnvProvider';

export { EnvProvider };
