import * as React from 'react';
import { useAppSelector } from 'Store';
import { EnvironmentVariables } from 'Utilities/EnvironmentVariables';

export interface LoginLinkProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  text: string;
}

export const LoginLink: React.FunctionComponent<LoginLinkProps> = (props) => {
  const {
    text,
    ...rest
  } = props;

  const csrfToken = useAppSelector(state => state.authorization.csrfToken);

  const authorizationQueryParams = new URLSearchParams({
    client_id: EnvironmentVariables.BungieClientId,
    response_type: 'code',
    state: csrfToken ?? '',
  });
  const authorizationUrl = `https://www.bungie.net/en/oauth/authorize?${authorizationQueryParams}`;

  return (
    <a href={authorizationUrl} {...rest}>
      {text}
    </a>
  );
}