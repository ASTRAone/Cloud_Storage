import { createSelector } from '@reduxjs/toolkit';

import { StateWithStatus } from './root';

const statusFlags = createSelector(
  <T extends StateWithStatus>(state: T) => state.status,
  (status) => ({
    loading: status === 'loading',
    failed: status === 'failed',
  }),
);

export { statusFlags };
