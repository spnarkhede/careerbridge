import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the auth token from the service
    const authToken = this.authService.getAuthToken();
    
    // Clone the request and add the authorization header if token exists
    if (authToken) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      
      // Pass the cloned request with the token to the next handler
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          // Handle 401 Unauthorized errors (expired token, etc.)
          if (error.status === 401) {
            this.authService.logout().subscribe(() => {
              this.router.navigate(['/auth/login']);
            });
          }
          return throwError(() => error);
        })
      );
    }
    
    // If no token, just pass the original request
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle other errors
        return throwError(() => error);
      })
    );
  }
}
