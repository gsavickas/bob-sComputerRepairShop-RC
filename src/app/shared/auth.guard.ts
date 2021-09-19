/**
 * Title: auth.guard.ts
 * Modified By: Larry Ohaka
 * Date: 19 September 2021
 * Description: This sets the main application file for our node.js server. 
 */



import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate{
    constructor( private router: Router, private cookieService: CookieService ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isAuthenticated = this.cookieService.get('sessionuser');

        if(isAuthenticated){
            return true;
    }else{
        this.router.navigate(['/session/signin']);
        return false;
    }
    }
}