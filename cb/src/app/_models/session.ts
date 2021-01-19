export class Session {
  userId?: number;
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
  tokenType: string;
  expiresIn: number;
  access_token: string;
  refreshToken: string;
}
