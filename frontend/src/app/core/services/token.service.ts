import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { TokenType } from 'src/app/modules/auth/models/token.type';
import { CookieService } from './cookie.service';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/modules/auth/models/userToken.type';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _tokenDetailsSubject$: BehaviorSubject<UserToken | null> =
    new BehaviorSubject<UserToken | null>(null);

  private cookieService = inject(CookieService);
  private router = inject(Router);

  constructor() {
    const tokenDetails = this.getTokenFromCookiesAndDecode();
    this._tokenDetailsSubject$.next(tokenDetails);
  }

  updateToken(tokenFromDB: TokenType) {
    this._clearCookiesAndThenPutNewToken(tokenFromDB);
    const decodedToken: UserToken = this._decodeToken(tokenFromDB);
    this._setTokenDetailsSubject$(decodedToken);
  }

  getTokenFromCookiesAndDecode(): UserToken | null {
    const tokenId = this.cookieService.getCookie('authToken');
    if (tokenId) {
      const decodedToken: UserToken = this._decodeToken({ token: tokenId });
      if (this._isTokenExpired(decodedToken)) {
        this.resetToken();
        this.router.navigate(['/login']);
        return null;
      }
      return decodedToken;
    } else {
      this.router.navigate(['/login']);
      return null;
    }
  }

  resetToken(): void {
    this.cookieService.deleteCookie('authToken');
  }

  private _clearCookiesAndThenPutNewToken(tokenFromDB: TokenType): void {
    this.cookieService.deleteCookie('authToken');
    this.cookieService.setCookie(
      'authToken',
      tokenFromDB.token,
      7,
      true,
      'Strict',
    );
  }

  private _decodeToken(tokenFromDB: TokenType): UserToken {
    return this._getDecodedTokenResponse(tokenFromDB.token);
  }

  private _getDecodedTokenResponse(token: string): UserToken {
    return jwtDecode<UserToken>(token);
  }

  private _isTokenExpired(decodedToken: UserToken): boolean {
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp === undefined) {
      return true;
    }

    return decodedToken.exp < currentTime;
  }

  private _setTokenDetailsSubject$(tokenInfos: UserToken): void {
    this._tokenDetailsSubject$.next(tokenInfos);
  }

  _getTokenDetailsSubject$(): Observable<UserToken | null> {
    return this._tokenDetailsSubject$.asObservable();
  }
}
