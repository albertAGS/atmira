import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, finalize, retry, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractHttpService } from 'src/app/services/abstract-http.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementService extends AbstractHttpService {

  /**
   *
   * @param endPoint nombre del servicio que se llama
   * @returns observable
   */
  getMethod = (endPoint) => {
    return this.http.get(environment.url + endPoint).pipe(
      tap((user: any) => sessionStorage.setItem('Authorization', user.Token)),
      retry(0),
      catchError((xhr: HttpErrorResponse) => {
        return this._handleError(xhr);
      }),
      finalize(() => {
      })
    );
  }

  /**
   * metodo post
   * @param endPoint nombre del servicio que se llama
   * @param data objeto que se envia mediante post
   * @returns observable
   */
  postMethod = (endPoint: string, data?: any, loading = false, getToken = false) => {
    if (loading) {
      this._loadingSource$.next(true);
    }
    return this.http.post(environment.url + endPoint, data).pipe(
      tap((user: any) => getToken ? sessionStorage.setItem('Authorization', user.Token) : ''),
      retry(0),
      catchError((xhr: HttpErrorResponse) => {
        return this._handleError(xhr);
      }),
      finalize(() => {
        if (loading) {
          setTimeout(() => {
            this._loadingSource$.next(false);
          }, 0);
        }
      })
    );
  }

  downloadMethod = (endPoint: string, data?, loading = false) => {
    if (loading) {
      this._loadingSource$.next(true);
    }
    return this.http.post(environment.url + endPoint, data, { responseType: "blob" as 'json' }).pipe(retry(0),
      catchError((xhr: HttpErrorResponse) => {
        return this._handleError(xhr);
      }),
      finalize(() => {
        // this._loadingSource$.next(false);
      })
    );
  }
}
