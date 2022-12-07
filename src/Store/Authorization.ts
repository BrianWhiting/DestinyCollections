import { createSelector, createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { AuthorizationInfo } from 'Models/Authorization/AuthorizationInfo';
import { AuthorizationToken } from 'Models/Authorization/AuthorizationToken';
import { BungieAuthTokenResponse } from 'Models/Authorization/BungieAuthTokenResponse';
import { RootState } from 'Store';
import { actions as accountActions } from 'Store/Account';
import { actions as profileActions } from 'Store/Profile';
import { createAppAsyncThunk } from 'Store/ThunkUtilities';
import { createLocalStorageHelper, createLocalStorageHelperWithSerialization } from 'Store/LocalStorageHelper';
import { EnvironmentVariables } from 'Utilities/EnvironmentVariables';

const authorizationCsrfTokenLocalStorageHelper = createLocalStorageHelper('authorization-csrf-token');
const authorizationInfoLocalStorageHelper = createLocalStorageHelperWithSerialization<AuthorizationInfo>('authorization-info');

const sliceName = 'authorization';

interface AuthorizationState {
  loading: boolean;
  csrfToken: string | null;
  info: AuthorizationInfo | null;
}

const initialState: AuthorizationState = {
  loading: true,
  csrfToken: authorizationCsrfTokenLocalStorageHelper.load(),
  info: authorizationInfoLocalStorageHelper.load(),
};

const updateAuthorizationInfoFromCode = createAppAsyncThunk(
  `${sliceName}/updateAuthorizationInfoFromCode`,
  async (code: string, { dispatch }) => {
    const authParams = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
    });

    await dispatch(updateAuthorizationInfo(authParams));
  },
);

const updateAuthorizationInfoFromRefreshToken = createAppAsyncThunk(
  `${sliceName}/updateAuthorizationInfoFromRefreshToken`,
  async (_, { getState, dispatch }) => {
    const state = getState();
    const info = state.authorization.info;
    if (info === null) {
      // TODO: handle this
      throw new Error();
    }

    const authParams = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: info.refreshToken.value,
    });

    await dispatch(updateAuthorizationInfo(authParams));
  },
);

const updateAuthorizationInfo = createAppAsyncThunk(
  `${sliceName}/updateAuthorizationInfo`,
  async (authParams: URLSearchParams) => {
    authParams.set('client_id', EnvironmentVariables.BungieClientId);
    authParams.set('client_secret', EnvironmentVariables.BungieClientSecret);
  
    const options = {
      method: 'POST',
      body: authParams,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
  
    const response = await fetch('https://www.bungie.net/platform/app/oauth/token/', options);
    if (!response.ok) {
      // TODO: handle this
      throw new Error(`${response.status} ${response.statusText}`);
    }
  
    const data = await response.json();
  
    const authorizationInfo = convertToAuthorizationInfo(data);

    return authorizationInfo;
  },
);

const convertToAuthorizationInfo = (data: BungieAuthTokenResponse | unknown) => {
  if (!data || !isBungieAuthTokenResponse(data)) {
    // TODO: handle this
    throw new Error('No data or access token in response: ' + JSON.stringify(data));
  }

  const now = Date.now();
  const info: AuthorizationInfo = {
    accessToken: {
      name: 'accessToken',
      value: data.access_token,
      created: now,
      expires: now + data.expires_in * 1000,
    },
    refreshToken: {
      name: 'refreshToken',
      value: data.refresh_token,
      created: now,
      expires: now + data.refresh_expires_in * 1000,
    },
    bungieMembershipId: data.membership_id,
  };

  return info;
};

const isBungieAuthTokenResponse = (data: unknown): data is BungieAuthTokenResponse => {
  const response = data as Partial<BungieAuthTokenResponse>;

  return (
    response.access_token !== undefined &&
    response.expires_in !== undefined &&
    response.refresh_token !== undefined &&
    response.refresh_expires_in !== undefined &&
    response.membership_id !== undefined
  );
};

const getAccessToken = createAppAsyncThunk(
  `${sliceName}/getAccessToken`,
  async (_, { getState, dispatch }) => {
    let authorizationInfo = getState().authorization.info;
    if (authorizationInfo === null) {
      // TODO: handle this
      throw new Error();
    }
  
    const accessTokenIsValid = !hasTokenExpired(authorizationInfo.accessToken);
    if (accessTokenIsValid) {
      return authorizationInfo.accessToken;
    }
  
    const refreshTokenIsValid = !hasTokenExpired(authorizationInfo.refreshToken);
    if (!refreshTokenIsValid) {
      dispatch(actions.logout());
      // TODO: handle this
      throw new Error();
    }
  
    await dispatch(updateAuthorizationInfoFromRefreshToken());
  
    authorizationInfo = getState().authorization.info;
    if (authorizationInfo === null) {
      // TODO: handle this
      throw new Error();
    }
  
    return authorizationInfo.accessToken;
  },
)

const selectRefreshToken = (state: RootState) => state.authorization.info?.refreshToken;
const selectHasValidAuthorizationToken = createSelector([selectRefreshToken], (refreshToken) => {
  const refreshTokenIsValid = !!refreshToken && !hasTokenExpired(refreshToken);
  return refreshTokenIsValid;
});

const hasTokenExpired = (token: AuthorizationToken) => {
  const expires = token.expires;
  const now = Date.now();

  return now > expires;
};

const logout = createAppAsyncThunk(
  `${sliceName}/logout`,
  (_, { dispatch }) => {
    dispatch(accountActions.clear());
    dispatch(profileActions.clear());
    dispatch(actions.generateCsrfToken());
  },
)

export const AuthorizationSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    finishLoading: state => {
      state.loading = false;
    },
    generateCsrfToken: state => {
      const value = uuid();
      state.csrfToken = value;
      authorizationCsrfTokenLocalStorageHelper.save(value);
    },
    removeCsrfToken: state => {
      state.csrfToken = null;
      authorizationCsrfTokenLocalStorageHelper.remove();
    },
  },
  extraReducers: builder => {
    builder.addCase(updateAuthorizationInfo.fulfilled, (state, action) => {
      state.info = action.payload;
      authorizationInfoLocalStorageHelper.save(action.payload);
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.info = null;
      authorizationInfoLocalStorageHelper.remove();
    });
  },
});

export const actions = {
  updateAuthorizationInfoFromCode,
  updateAuthorizationInfoFromRefreshToken,
  getAccessToken,
  logout,
  ...AuthorizationSlice.actions,
};

export const selectors = {
  selectHasValidAuthorizationToken,
};

export const reducer = AuthorizationSlice.reducer;