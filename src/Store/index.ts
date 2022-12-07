import { AnyAction, combineReducers, configureStore, ThunkAction, unwrapResult as reduxUnwrapResult } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import * as Authorization from 'Store/Authorization';
import * as Manifest from 'Store/Manifest';
import * as Account from 'Store/Account';
import * as Profile from 'Store/Profile';

const reducers = {
  authorization: Authorization.reducer,
  manifest: Manifest.reducer,
  account: Account.reducer,
  profile: Profile.reducer,
};

const rootReducer = combineReducers({
  ...reducers,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: false,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunkAction<TReturnType = void> = ThunkAction<TReturnType, RootState, unknown, AnyAction>;

export const useAppDispatch = useDispatch<typeof store.dispatch>;

export type AppDispatch = ReturnType<typeof useAppDispatch>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const unwrapResult = reduxUnwrapResult;
