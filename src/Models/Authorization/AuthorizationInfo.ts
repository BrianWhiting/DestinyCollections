import { AuthorizationToken } from 'Models/Authorization/AuthorizationToken';

export interface AuthorizationInfo {
  accessToken: AuthorizationToken;
  refreshToken: AuthorizationToken;
  bungieMembershipId: string;
}