import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {

       
            if ([404].indexOf(err.status) !== -1) {
                this.router.navigate(['/session/404']);
            }

            if ([500].indexOf(err.status) !== -1) {
                this.router.navigate(['/session/500']);
            }

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