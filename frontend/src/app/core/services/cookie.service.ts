import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (const cookie of ca) {
      const c = cookie.trim();
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length);
      }
    }
    return null;
  }

  setCookie(
    name: string,
    value: string,
    days: number,
    secure = true,
    sameSite: 'Lax' | 'Strict' | 'None' = 'Lax',
    path = '/',
  ): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    let cookieString = `${name}=${value};${expires};path=${path};SameSite=${sameSite}`;

    if (secure) {
      cookieString += ';Secure';
    }

    document.cookie = cookieString;
  }

  deleteCookie(name: string, path = '/'): void {
    this.setCookie(name, '', -1, true, 'Lax', path);
  }
}
