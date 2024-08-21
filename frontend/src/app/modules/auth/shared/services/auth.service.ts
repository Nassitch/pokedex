import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginType } from '../../models/login.type';
import {  Observable, switchMap } from 'rxjs';
import { environment } from 'src/app/environment/environment.development';
import { TokenType } from '../../models/token.type';
import { RegisterType } from '../../models/register.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private readonly _BASE_URL: string = environment._BASE_URL;
  private readonly _AUTH: string = environment._AUTH;
  private readonly _LOGIN: string = environment._LOGIN;
  private readonly _SIGN_UP: string = environment._SIGN_UP;

  postLogin$(loginInfo : LoginType): Observable<TokenType> {
    return this.http.post<TokenType>(`${this._BASE_URL}${this._AUTH}${this._LOGIN}`, loginInfo);
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
