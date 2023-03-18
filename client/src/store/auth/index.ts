import { combineReducers } from '@reduxjs/toolkit';

import data from './data';

const user = combineReducers({ data });

export default user;
