import React from 'react';

import { AnimatePresence, motion, AnimationProps } from 'framer-motion';

type Props = {
  isVisible?: boolean;
  children?: JSX.Element;
  animationProps?: AnimationProps;
};

export const AnimationBlock: React.FC<Props> = ({ isVisible, children, animationProps }) => {
  return (
    <AnimatePresence>
      {isVisible && <motion.div {...animationProps}>{children}</motion.div>}
    </AnimatePresence>
  );
};
