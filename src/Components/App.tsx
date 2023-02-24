import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ManifestProvider } from 'Components/Utilities/ManifestProvider';
import { AuthorizationProvider } from 'Components/Utilities/AuthorizationProvider';
import { ProfileProvider } from 'Components/Utilities/ProfileProvider';
import { Layout } from 'Components/Layout';
import { AppRouter } from 'Components/AppRouter';

import store from 'Store';

export const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ManifestProvider />
        <AuthorizationProvider />
        <ProfileProvider />
        <Layout>
          <AppRouter />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};
