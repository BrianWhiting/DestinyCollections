import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
  DestinyCollectibleComponent,
  DestinyCollectibleState,
  DestinyComponentType,
  DestinyProfileResponse,
  getProfile,
  GetProfileParams,
} from 'bungie-api-ts/destiny2';
import { AcquiredItem } from 'Models/AcquiredItem';
import { RootState } from 'Store';
import { createAppAsyncThunk } from 'Store/ThunkUtilities';
import { createAuthorizedHttpClient } from 'Utilities/BungieApi/HttpClient';

const sliceName = 'profile';

interface ProfileState {
  info: DestinyProfileResponse | null;
}

const initialState: ProfileState = {
  info: null,
};

const loadProfile = createAppAsyncThunk(
  `${sliceName}/loadProfile`,
  async (_, { getState }) => {
    const httpClient = createAuthorizedHttpClient();

    const accountInfo = getState().account.info;
    if (accountInfo === null) {
      // TODO: handle this
      throw new Error();
    }

    const destinyMembershipId = accountInfo.destinyMemberships[0].membershipId;
    const destinyMembershipType = accountInfo.destinyMemberships[0].membershipType;

    const profileParams: GetProfileParams = {
      destinyMembershipId: destinyMembershipId,
      membershipType: destinyMembershipType,
      components: [
        DestinyComponentType.Characters,
        DestinyComponentType.CharacterEquipment,
        DestinyComponentType.CharacterInventories,
        DestinyComponentType.ProfileInventories,
        DestinyComponentType.Collectibles,
        DestinyComponentType.ItemSockets,
      ],
    };
    const profileServerResponse = await getProfile(httpClient, profileParams);
    const profileResponse = profileServerResponse.Response;

    return profileResponse;
  },
);

const selectAcquiredItemsFromCollectibles = createSelector(
  [
    (state: RootState) => state.profile.info,
    (state: RootState) => state.manifest.components?.DestinyCollectibleDefinition ?? null,
  ],
  (info, collectibleDefs) => {
    if (!info || !collectibleDefs) return [];

    let collectibles: Record<number, DestinyCollectibleComponent> = {};

    const profileCollectibles = info.profileCollectibles.data?.collectibles;
    if (profileCollectibles) {
      collectibles = {
        ...profileCollectibles,
      };
    }

    const characters = info.characterCollectibles.data;
    if (characters) {
      Object.values(characters)
        .forEach(character => {
          const characterCollectibles = character.collectibles;
          collectibles = {
            ...collectibles,
            ...characterCollectibles,
          };
        });
    }

    const result = Object.entries(collectibles)
      .map(([collectibleHash, { state }]) => {
        const collectible = collectibleDefs[Number(collectibleHash)];

        if (!collectible || !collectible.itemHash) {
          return null;
        }

        if (state & DestinyCollectibleState.NotAcquired) {
          return null;
        }

        return collectible.itemHash;
      })
      .filter(x => x !== null);

    return result as number[];
  },
);

const selectAcquiredItemsFromProfilePlugSets = createSelector(
  [(state: RootState) => state.profile.info?.profilePlugSets.data],
  (profilePlugSets) => {
    if (!profilePlugSets) return [];

    const result = Object.values(profilePlugSets.plugs)
      .flatMap(x => x)
      .filter(x => x.canInsert)
      .map(x => x.plugItemHash);

    return result;
  },
);

const selectAcquiredItems = createSelector(
  [
    selectAcquiredItemsFromCollectibles,
    selectAcquiredItemsFromProfilePlugSets,
  ],
  (
    fromCollectibles,
    fromProfilePlugSets,
  ) => {
    const sources = [
      { items: fromCollectibles, source: 'collectibles' },
      { items: fromProfilePlugSets, source: 'profilePlugSets' },
    ];

    const result = sources
      .reduce(
        (acc, { items, source }) => {
          items.forEach(
            itemHash => {
              if (!acc[itemHash]) {
                acc[itemHash] = {
                  itemHash,
                  instances: [],
                };
              }

              acc[itemHash].instances.push({ source });
            }
          );

          return acc;
        },
        {} as Record<number, AcquiredItem>,
      );

    return result;
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
    builder.addCase(loadProfile.fulfilled, (state, action) => {
      state.info = action.payload;
    });
  },
});

export const actions = {
  loadProfile,
  ...ProfileSlice.actions,
};

export const selectors = {
  selectAcquiredItems,
};

export const reducer = ProfileSlice.reducer;
