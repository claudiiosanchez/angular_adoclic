import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const currentmenu = route.url[0].path;
  const authservice = inject(AuthService);
  if(authservice.isloggedin() && currentmenu=="login")
  {
    return false;
  }
  else
  {
    return true;
  }
};
