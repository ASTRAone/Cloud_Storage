import { useEffect, useRef } from 'react';

export const useClearTimeout = () => {
  const refTimeout = useRef<ReturnType<typeof setTimeout>>();

  const clearTm = () => refTimeout.current && clearTimeout(refTimeout.current);

  useEffect(() => {
    return clearTm;
  }, []);

  return {
    refTimeout,
    clearTm,
  };
};
