/**
 * * Title: error.interceptor.ts
 * Author: James Pinson 
 * Date: 10/3/21
 * Description: This is the error interceptor ts file which intercepts error messages and redirects the user to the appropriate pages.  
 */

//This is the import statements. 
import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable()

//Here we export the ErrorInterceptor to the rest of the application. 
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {
    }

    //This is the intercept function which catches an error. 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {

       
            //If the error has a 404 code we redirect them to the 404 page. 
            if ([404].indexOf(err.status) !== -1) {
                this.router.navigate(['/session/404']);
            }

            //If there is a 500 error code we redirect the user to the 500 error page. 
            if ([500].indexOf(err.status) !== -1) {
                this.router.navigate(['/session/500']);
            }

            //Here we create the variables so we can log our errors. 
            const error = {
                message: err.error.message || err.message,
                httpCode: err.error.httpCode || err.status,
                url: err.url
            }

            console.log(`HttpInterceptor error; origin:${error.url};message${error.message};httpCode${error.httpCode}`);

            return throwError(error);
        }));
    }
}