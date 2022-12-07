import { createSlice } from '@reduxjs/toolkit';
import { getMembershipDataById, GetMembershipDataByIdParams, UserMembershipData } from 'bungie-api-ts/user';
import { BungieMembershipType } from 'bungie-api-ts/destiny2';
import { createAppAsyncThunk } from 'Store/ThunkUtilities';
import { createAuthorizedHttpClient } from 'Utilities/BungieApi/HttpClient';

const sliceName = 'account';

interface AccountState {
  info: UserMembershipData | null;
}

const initialState: AccountState = {
  info: null,
};

const loadAccounts = createAppAsyncThunk(
  `${sliceName}/loadAccounts`,
  async (_, { getState }) => {
    const bungieMembershipId = getState().authorization.info?.bungieMembershipId ?? null;
    if (bungieMembershipId === null) {
      // TODO: handle this
      throw new Error();
    }

    const httpClient = createAuthorizedHttpClient();

    const params: GetMembershipDataByIdParams = {
      membershipId: bungieMembershipId,
      membershipType: BungieMembershipType.BungieNext,
    };
    const serverResponse = await getMembershipDataById(httpClient, params);
    const response = serverResponse.Response;
    return response;
  },
);

export const ProfileSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    clear: state => {
      state.info = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadAccounts.fulfilled, (state, action) => {
      state.info = action.payload;
    });
  },
});

export const actions = {
  loadAccounts,
  ...ProfileSlice.actions,
};

export const selectors = {
};

export const reducer = ProfileSlice.reducer;
