import * as React from 'react';
import { unwrapResult, useAppDispatch, useAppSelector } from 'Store';
import { selectors as authorizationSelectors } from 'Store/Authorization';
import { actions as accountActions } from 'Store/Account';
import { actions as profileActions } from 'Store/Profile';

export const ProfileProvider: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const hasValidAuthorizationToken = useAppSelector(authorizationSelectors.selectHasValidAuthorizationToken);

  React.useEffect(() => {
    if (hasValidAuthorizationToken) {
      loadAccounts();
    }
  }, [hasValidAuthorizationToken]);

  const loadAccounts = async () => {
    const result = await dispatch(accountActions.loadAccounts());
    try {
      unwrapResult(result);

      await loadProfile();
    }
    catch {}
  }

  const loadProfile = async () => {
    const result = await dispatch(profileActions.loadProfile());
    try {
      unwrapResult(result);
    }
    catch {}
  }

  return null;
}