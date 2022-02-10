import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SigninService } from '../signin/signin.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private auth: SigninService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(sessionStorage.getItem('Authorization')) {
      const request = req.clone({
        setHeaders: this._getHeaders()
    });
      return next.handle(request);
    }
    return next.handle(req);
  }

  private _getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    }
    if (sessionStorage.getItem('Authorization')) {
      headers['Authorization'] = sessionStorage.getItem('Authorization');
  }
    return headers;
  }
}
