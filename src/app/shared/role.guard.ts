import { RoleService } from '../shared/services/role.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService, private roleService: RoleService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.roleService.findUserRole(this.cookieService.get('sessionuser')).pipe(map(res =>{
      console.log(res);
      
      if(res['data'].role === 'admin'){
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }))
  }
}
  
