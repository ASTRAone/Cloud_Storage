import React from 'react';

type Props = {
  children?: JSX.Element;
  value?: string;
  currentValue?: string;
};

export const TabPanel: React.FC<Props> = ({ value, currentValue, children }) => {
  return value === currentValue ? <>{children}</> : null;
};
