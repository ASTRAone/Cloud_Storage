import { useEffect, useState } from 'react';

import { ANIMATION_TIME } from '@utils/contants';

type Props = {
  opened: boolean;
};

export const useMount = ({ opened }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (opened && !mounted) {
      setMounted(true);
    } else if (!opened && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, ANIMATION_TIME);
    }
  }, [opened]);

  return {
    mounted,
  };
};
