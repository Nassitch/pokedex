import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === '')
        c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  setCookie(name: string, value: string, date: number, secure: boolean = true, sameSite: "Lax" | "Strict" | "None" = "Lax", path: string = '/'): void {
    const dated = new Date();
    dated.setTime(dated.getTime() + date * 24 * 60 * 60 * 1000);
    const expire = 'exprires=' + dated.toUTCString();
    let cookieString = `${name}=${value};${expire};"path=${path};SameSite=${sameSite}`;
    if (secure) {
      cookieString += ';Secure';
    }
    document.cookie = cookieString;
  }

  deleteCookie(name: string, path: string = "/"): void {
    this.setCookie(name, '', -1, true, "Lax", path);
  }
}
