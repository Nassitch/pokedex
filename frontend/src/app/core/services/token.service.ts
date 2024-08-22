import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { TokenType } from 'src/app/modules/auth/models/token.type';
import { CookieService } from './cookie.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
  export class TokenService implements OnInit {
    private _tokenDetailsSubject$: BehaviorSubject<TokenType | null> =
    new BehaviorSubject<TokenType | null>(null);

    private cookieService = inject(CookieService);
    private router = inject(Router);

    ngOnInit(): void {
      this._tokenDetailsSubject$ = this.getTokenFromCookiesAndDecode();
    }

    updateToken(tokenFromDB: TokenType) {
      this._clearCookiesAndThenPutNewToken(tokenFromDB);
      const decodedToken: TokenType = this._decodeToken(tokenFromDB);
      this._setTokenDetailsSubject$(decodedToken);
    }

    getTokenFromCookiesAndDecode(): any {
      const tokenId = this.cookieService.getCookie('authToken');
      if (tokenId) {
        const decodedToken: TokenType = this._decodeToken({ token: tokenId });
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
      this.cookieService.setCookie('authToken', tokenFromDB.token, 7, true, 'Strict');
    }

    private _decodeToken(tokenFromDB: TokenType): any {
      return this._getDecodedTokenResponse(tokenFromDB.token);
    }

    private _getDecodedTokenResponse(token: string): any {
      return jwtDecode(token);
    }

    private _isTokenExpired(decodedToken: any): boolean {
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp < currentTime;
    }

    private _setTokenDetailsSubject$(tokenInfos: any): void {
      this._tokenDetailsSubject$.next(tokenInfos);
    }

    _getTokenDetailsSubject$(): Observable<any> {
      return this._tokenDetailsSubject$.asObservable();
    }
  }
