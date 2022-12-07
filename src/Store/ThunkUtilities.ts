import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from 'Store';

type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
}

export const createAppAsyncThunk =
  <TReturned, TArg = void>(typePrefix: string, payloadCreator: AsyncThunkPayloadCreator<TReturned, TArg, ThunkApiConfig>) =>
    createAsyncThunk<TReturned, TArg, ThunkApiConfig>(typePrefix, payloadCreator);