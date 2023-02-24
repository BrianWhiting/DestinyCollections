import * as React from 'react';
import { useAppSelector } from 'Store';
import { selectors } from 'Store/Authorization';

export const HiddenWhenUnauthorized: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
  const hasValidAuthorizationToken = useAppSelector(selectors.selectHasValidAuthorizationToken);

  return (
    <>
      {hasValidAuthorizationToken
        ? children
        : null
      }
    </>
  )
}