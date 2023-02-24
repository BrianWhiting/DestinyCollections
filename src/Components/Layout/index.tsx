import * as React from 'react';
import { Header } from 'Components/Layout/Header';
import { ManifestLoadingWrapper } from 'Components/Utilities/ManifestLoadingWrapper';
import { LoginBanner } from 'Components/Utilities/LoginBanner';

export const Layout: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-gray-100">
      <Header />
      <div className="flex-grow flex flex-col">
        <ManifestLoadingWrapper>
          {children}
        </ManifestLoadingWrapper>
      </div>
      <LoginBanner />
    </div>
  );
};