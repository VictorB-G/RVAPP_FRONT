import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { LOCAL_STORAGE } from '../utils/constants';
import { Strings } from '../utils/utils';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem(LOCAL_STORAGE.USUARIO_TOKEN) ?? '';
    let request = req;
    if (Strings.isNotEmpty(token)) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }

    //Ñapilla con el 403 ya que si el token ha expirado, no considera que es un error 401, así que lo manejo como 403 solo si es en auth/user para que no se mezcle con otros 403 de permisos
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if ((err.status === 401) || (err.status === 403 && request.url.includes('auth/user'))) {
          this.authService.logout();
          this.router.navigateByUrl('/login');
        }
        return throwError(() => err);
      })
    );
  }
}
