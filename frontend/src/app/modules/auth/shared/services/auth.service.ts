import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginType } from '../../models/login.type';
import {  catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/app/environment/environment.development';
import { TokenType } from '../../models/token.type';
import { RegisterType } from '../../models/register.type';
import { CookieService } from 'src/app/core/services/cookie.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserToken } from '../../models/userToken.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private cookie = inject(CookieService);
  private tokenService = inject(TokenService);

  private readonly _BASE_URL: string = environment._BASE_URL;
  private readonly _AUTH: string = environment._AUTH;
  private readonly _LOGIN: string = environment._LOGIN;
  private readonly _SIGN_UP: string = environment._SIGN_UP;

  postLogin$(loginInfo : LoginType): Observable<any> {
    return this.http.post<TokenType>(`${this._BASE_URL}${this._AUTH}${this._LOGIN}`, loginInfo).pipe(
      tap((response: TokenType) => {
        this.cookie.setCookie("authToken", response.token, 1, true, "Lax");

        const decodedToken: UserToken = this.tokenService.getTokenFromCookiesAndDecode();
        if (decodedToken) {
          const userInfo: UserToken = {
            id: decodedToken.id,
            email: decodedToken.email,
          };

        }
      }),
      map((response: TokenType) => ({
        success: true,
        token: response.token,
        message: `Bienvenue`,
      })),
      catchError((error: HttpErrorResponse) => {
        return of({ success: false, message: 'Identifiants invalides' });
      })
    );
  }

  postRegister$(registerInfo: RegisterType): Observable<TokenType> {
    const userLog: LoginType = {
      email: registerInfo.email,
      password: registerInfo.password
    }
    return this.http.post<RegisterType>(`${this._BASE_URL}${this._AUTH}${this._SIGN_UP}`, registerInfo).pipe(
      switchMap(() => this.postLogin$(userLog))
      )

  }

}
