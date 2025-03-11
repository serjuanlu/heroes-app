import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

const checkAuthStatus = ():Observable<boolean>=>{
  const authService:AuthService=inject(AuthService);
  const router:Router=inject(Router);

  return authService.checkAuthentication()
  .pipe(
    tap(isAuthenticated => console.log('Authenticated: ',isAuthenticated)),
    tap(isAuthenticated=>{
      // Cambiamos la condicion
    if(isAuthenticated){
      // Cambiamos la ruta
      router.navigate(['/heroes/list'])
    }
  }),
  map(isAuthenticated=>!isAuthenticated)
);
}


export const publicCanActivateGuard:CanActivateFn=(
  route:ActivatedRouteSnapshot,
  state:RouterStateSnapshot
)=>{
  console.log('CanActivate');
  console.log({route,state});
  return checkAuthStatus();
}

export const publicCanMatchGuard:CanMatchFn=(
  route:Route,
  segments:UrlSegment[]
)=>{
  console.log('CanMatch');
  console.log({route,segments});
  return checkAuthStatus();
};
