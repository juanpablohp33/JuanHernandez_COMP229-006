import {JwtHelperService} from '@auth0/angular-jwt';

export class SessionStorage {

  displayName: string;
  username: string;
  email: string;
  source: string;

  constructor(source?: string) {
    if (source) {
      const tokenClaims = new JwtHelperService().decodeToken(source);
      this.displayName = tokenClaims.displayName;
      this.username = tokenClaims.username;
      this.email = tokenClaims.email;
      this.source = source;
    }

  }


}
