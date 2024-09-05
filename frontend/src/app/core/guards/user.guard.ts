import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { ToastService } from 'src/app/modules/toast/shared/services/toast.service';
import { UserToken } from 'src/app/modules/auth/models/userToken.type';

export const userGuard: CanActivateFn = (route) => {
  const tokenService = inject(TokenService);
  const decodedToken: UserToken | null =
    tokenService.getTokenFromCookiesAndDecode();
  const router = inject(Router);
  const toastService = inject(ToastService);

  if (!decodedToken) {
    if (route.routeConfig?.path?.includes('')) {
      router.navigate(['/auth/login']);
    } else {
      router.navigate(['']);
      toastService.error('Your session is not valid, please log in.');
    }
    return false;
  }
  return true;
};
