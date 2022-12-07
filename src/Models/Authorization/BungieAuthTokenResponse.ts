export interface BungieAuthTokenResponse {
  access_token: string;
  expires_in: number;
  membership_id: string;
  refresh_token: string;
  refresh_expires_in: number;
}