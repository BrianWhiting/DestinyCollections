import { createSlice } from '@reduxjs/toolkit';
import { AllDestinyManifestComponents, DestinyManifest, getDestinyManifest } from 'bungie-api-ts/destiny2';
import deepEqual from 'deep-equal';
import { unwrapResult } from 'Store';
import { createAppAsyncThunk } from 'Store/ThunkUtilities';
import { createLocalStorageHelper, createLocalStorageHelperWithSerialization } from 'Store/LocalStorageHelper';
import { createIndexedDbHelper } from 'Store/IndexedDbHelper';
import { createUnauthenticatedHttpClient } from 'Utilities/BungieApi/HttpClient';

const sliceName = 'manifest';
const tableList = [
  'InventoryItem',
  'Class',
  'DamageType',
  'BreakerType',
  'Collectible',
];

type ManifestComponentPathsType = DestinyManifest['jsonWorldComponentContentPaths']['en'];

const manifestVersionLocalStorageHelper = createLocalStorageHelper('d2-manifest-version');
const manifestTableListLocalStorageHelper = createLocalStorageHelperWithSerialization<string[]>('d2-manifest-table-list');
const manifestIndexedDbHelper = createIndexedDbHelper<AllDestinyManifestComponents>('d2-manifest');

interface ManifestState {
  loading: boolean;
  components: AllDestinyManifestComponents | null;
}

const initialState: ManifestState = {
  loading: true,
  components: null,
};

const loadManifest = createAppAsyncThunk(
  `${sliceName}/loadManifest`,
  async (_, { dispatch }) => {
    let version: string | null;
    let componentPaths: ManifestComponentPathsType;
    try {
      const httpClient = createUnauthenticatedHttpClient();
      const response = await getDestinyManifest(httpClient);
      const manifest = response.Response;
      version = manifest.jsonWorldContentPaths['en'];
      componentPaths = manifest.jsonWorldComponentContentPaths['en'];
    }
    catch (e) {
      version = manifestVersionLocalStorageHelper.load();
      if (version) {
        const result = await dispatch(loadManifestFromCache(version));
        const manifest = unwrapResult(result);
        return manifest;
      }
      else {
        throw e;
      }
    }

    try {
      const result = await dispatch(loadManifestFromCache(version));
      const manifest = unwrapResult(result);
      return manifest;
    }
    catch (e) {
      const result = await dispatch(loadManifestFromRemote({ version, componentPaths }));
      const manifest = unwrapResult(result);
      return manifest;
    }
  },
);

const loadManifestFromCache = createAppAsyncThunk(
  `${sliceName}/loadManifestFromCache`,
  async (version: string) => {
    const cachedManifestVersion = manifestVersionLocalStorageHelper.load();
    const cachedTableList = manifestTableListLocalStorageHelper.load() ?? [];
    if (cachedManifestVersion === version && deepEqual(cachedTableList, tableList)) {
      const manifest = await manifestIndexedDbHelper.load();
      if (manifest === null) {
        await removeManifest();
        throw new Error('Empty cached manifest');
      }

      return manifest;
    }
    else {
      await removeManifest();
      throw new Error(`Manifest version mismatch: ${version} ${cachedManifestVersion}`);
    }
  },
);

const loadManifestFromRemote = createAppAsyncThunk(
  `${sliceName}/loadManifestFromRemote`,
  async (arg: { version: string, componentPaths: ManifestComponentPathsType }) => {
    const version = arg.version;
    const componentPaths = arg.componentPaths;

    const manifest = await downloadManifestComponents(componentPaths);
    saveManifest(version, manifest);
    return manifest;
  },
);

const downloadManifestComponents = async (componentPaths: ManifestComponentPathsType) => {
  const cacheBusterStrings = [
    '',
    '?source=d2-collections',
    `?source=d2-collections&time=${Date.now()}`,
  ];

  const manifest: Record<string, unknown> = {};

  const tasks = tableList
    .map(x => `Destiny${x}Definition`)
    .map(async (table) => {
      let response: Response | null = null;
      let error = null;
      let body = null;

      for (const query of cacheBusterStrings) {
        try {
          response = await fetch(`https://www.bungie.net${componentPaths[table]}${query}`);
          if (response.ok) {
            body = await response.json();
            break;
          }
          error ??= response;
        } catch (e) {
          error ??= e;
        }
      }
      if (!body && error) {
        throw error;
      }
      manifest[table] = body;
    });

  await Promise.all(tasks);

  return manifest as unknown as AllDestinyManifestComponents;
};

const saveManifest = async (version: string, manifest: AllDestinyManifestComponents) => {
  await manifestIndexedDbHelper.save(manifest);
  manifestVersionLocalStorageHelper.save(version);
  manifestTableListLocalStorageHelper.save(tableList);
};

const removeManifest = async () => {
  await manifestIndexedDbHelper.remove();
  manifestVersionLocalStorageHelper.remove();
  manifestTableListLocalStorageHelper.remove();
};

export const ManifestSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(loadManifest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadManifest.fulfilled, (state, action) => {
      state.loading = false;
      state.components = action.payload;
    });
    builder.addCase(loadManifest.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const actions = {
  loadManifest,
  ...ManifestSlice.actions,
};

export const selectors = {
};

export const reducer = ManifestSlice.reducer;