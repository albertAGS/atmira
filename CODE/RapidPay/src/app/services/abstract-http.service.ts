import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable()
export class AbstractHttpService {
  // protected _loadingSource$: Subject<boolean> = new Subject();
  public _loadingSource$: Subject<boolean> = new Subject();
  public loading$: Observable<boolean> = this._loadingSource$.asObservable();

  constructor(protected http: HttpClient,
    private _router: Router) { }

  protected _handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    if (error.status === 401) {
      sessionStorage.removeItem('Authorization');
      this._router.navigate(['/console']);
    }
    return throwError(errorMessage);
  }
}
