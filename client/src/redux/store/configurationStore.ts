import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import initialState from "./initialState";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";
import { UserRegistrationReducer } from "../reducers/user.reducer";
import { persistStore } from "redux-persist";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { TRootState } from "../types/TRootState";

const reducer = combineReducers({
  user: UserRegistrationReducer.reducer,
});

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useSelector: TypedUseSelectorHook<TRootState> = useReduxSelector;

export const persistor = persistStore(store);

export default store;
