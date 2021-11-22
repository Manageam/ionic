import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { GlobalService } from '../services/global/global.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(
    private global: GlobalService,
    public auth: AuthenticationService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const methods = ['POST', 'PUT', 'DELETE'];

    if (
      (methods.includes(req.method) &&
        req.urlWithParams.search('silent=true') == -1) ||
      req.urlWithParams.search('show-loader=true') >= 0
    ) {
      !req.reportProgress ? this.global.showLoader() : null;
    }

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`,
      },
    });
    let hideLoader = true;

    if (
      req.urlWithParams.search('silent=true') != -1 ||
      (!methods.includes(req.method) &&
        req.urlWithParams.search('show-loader=true') == -1)
    )
      hideLoader = false;

    // @ts-ignore
    return next.handle(req).pipe(
      finalize(() => hideLoader && this.global.hideLoader()),
      catchError(async (error) => {
        if (error.status === 401) {
          await this.auth.logout();
        }
        const message = error.error;
        if (message) await this.global.alert('', message, ['Okay']);
        return error;
      })
    );
  }
}
