import * as React from 'react';
import { useAppSelector } from 'Store';

export const ManifestLoadingWrapper: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
  const loading = useAppSelector(state => state.manifest.loading);

  return (
    <>
      {loading
        ? <div className="flex-grow flex flex-col justify-center items-center text-3xl">
            Loading Destiny Database...
          </div>
        : children
      }
    </>
  );
};