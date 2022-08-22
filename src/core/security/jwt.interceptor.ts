import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@services';
import { environment } from 'environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isLoggedIn = this.authenticationService.isLoggedIn;
    const isApiUrl = request.url.startsWith(environment.endpoint);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {Authorization: "adf" }
      });
    }
    return next.handle(request);
  }
}
