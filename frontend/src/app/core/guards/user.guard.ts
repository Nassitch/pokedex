import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { TokenType } from 'src/app/modules/auth/models/token.type';
import { ToastService } from 'src/app/modules/toast/shared/services/toast.service';

export const userGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const decodedToken: TokenType = tokenService.getTokenFromCookiesAndDecode();
  const router = inject(Router);
  const toastService = inject(ToastService);

  if (!decodedToken) {
    router.navigate(['']);
    toastService.error("Your session is no longer valid.");
    return false;
  } else {
    return true;
  }

};
