export interface AuthorizationToken {
  name: 'accessToken' | 'refreshToken';
  value: string;
  created: number;
  expires: number;
}