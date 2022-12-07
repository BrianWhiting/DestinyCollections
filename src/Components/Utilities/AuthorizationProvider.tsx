import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { unwrapResult, useAppDispatch, useAppSelector } from 'Store';
import { actions, selectors } from 'Store/Authorization';

export const AuthorizationProvider: React.FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  const state = queryParams.get('state');

  const dispatch = useAppDispatch();

  const csrfToken = useAppSelector(state => state.authorization.csrfToken);
  const hasValidAuthorizationToken = useAppSelector(selectors.selectHasValidAuthorizationToken);

  React.useEffect(() => {
    loadAccessToken();
  }, []);

  const loadAccessToken = async () => {
    if (
      code !== null &&
      state !== null &&
      state === csrfToken
    ) {
      const result = await dispatch(actions.updateAuthorizationInfoFromCode(code));
      try {
        unwrapResult(result);
      }
      catch {}

      dispatch(actions.removeCsrfToken());

      navigate('/');
    }
    else if (!hasValidAuthorizationToken) {
      await dispatch(actions.logout());
    }

    dispatch(actions.finishLoading());
  }

  return null;
}