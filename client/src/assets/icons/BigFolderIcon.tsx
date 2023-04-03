import React from 'react';

type propsColor = {
  color?: string;
};

export const BigFolderIcon: React.FC<propsColor> = ({ color }) => {
  return (
    <svg
      width="34"
      height="29"
      viewBox="0 0 34 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.666687 27.1667C0.666687 27.9951 1.33826 28.6667 2.16669 28.6667H32.5C33.3285 28.6667 34 27.9951 34 27.1667V6.83334C34 6.00492 33.3284 5.33334 32.5 5.33334H14L9.43936 0.772684C9.15806 0.491379 8.77653 0.333344 8.3787 0.333344H2.16669C1.33826 0.333344 0.666687 1.00492 0.666687 1.83334V27.1667Z"
        fill={color}
      />
    </svg>
  );
};
