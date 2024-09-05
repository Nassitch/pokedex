import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginType } from '../../models/login.type';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/app/environment/environment.development';
import { TokenType } from '../../models/token.type';
import { RegisterType } from '../../models/register.type';
import { CookieService } from 'src/app/core/services/cookie.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/modules/toast/shared/services/toast.service';
import { LoginResponse } from '../../models/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  private readonly _BASE_URL: string = environment._BASE_URL;
  private readonly _AUTH: string = environment._AUTH;
  private readonly _LOGIN: string = environment._LOGIN;
  private readonly _SIGN_UP: string = environment._SIGN_UP;

  postLogin$(loginInfo: LoginType): Observable<LoginResponse> {
    return this.http
      .post<TokenType>(
        `${this._BASE_URL}${this._AUTH}${this._LOGIN}`,
        loginInfo,
      )
      .pipe(
        tap((response: TokenType) => {
          this.cookieService.setCookie(
            'authToken',
            response.token,
            1,
            true,
            'Lax',
          );
        }),
        map((response: TokenType) => ({
          success: true,
          token: response.token,
          message: `Bienvenue`,
        })),
        catchError(() => {
          return of({ success: false, message: 'Identifiants invalides' });
        }),
      );
  }

  logout(): void {
    this.cookieService.deleteCookie('authToken');
    this.router.navigate(['']);
    this.toastService.success('You are now logged out.');
  }

  postRegister$(registerInfo: RegisterType): Observable<LoginResponse> {
    const userLog: LoginType = {
      email: registerInfo.email,
      password: registerInfo.password,
    };
    return this.http
      .post<RegisterType>(
        `${this._BASE_URL}${this._AUTH}${this._SIGN_UP}`,
        registerInfo,
      )
      .pipe(switchMap(() => this.postLogin$(userLog)));
  }
}
