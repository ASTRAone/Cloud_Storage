/**
 * reactjs-popup set autofocus on first focusable element while popup open
 *
 * issue:https://github.com/yjose/reactjs-popup/issues/250
 * resolve: https://github.com/yjose/reactjs-popup/issues/250#issuecomment-836783747
 */
import React from 'react';

const InputStub: React.FC = () => (
  <input
    type="radio"
    style={{ display: 'none' }}
  />
);

export { InputStub };
