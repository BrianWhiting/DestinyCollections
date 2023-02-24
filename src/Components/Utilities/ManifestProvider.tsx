import * as React from 'react';
import { unwrapResult, useAppDispatch } from 'Store';
import { actions } from 'Store/Manifest';

export const ManifestProvider: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    loadManifest();
  }, []);

  const loadManifest = async () => {
    const result = await dispatch(actions.loadManifest());
    unwrapResult(result);
  };

  return null;
}
