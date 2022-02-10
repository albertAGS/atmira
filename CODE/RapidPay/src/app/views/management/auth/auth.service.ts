import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ManagementService } from '../services/management.service';

export interface IAuth {
  user: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _cachedAuth: IAuth;
  private httpRequest: Observable<any>;
  private _authSource = new BehaviorSubject<IAuth>(undefined);
  private _authStreamSource: BehaviorSubject<boolean> = new BehaviorSubject(false);


  public auth$: Observable<IAuth> = this._authSource.asObservable();
  public authStream$: Observable<boolean> = this._authStreamSource.asObservable();

  public get user() { return (this._cachedAuth) ? this._cachedAuth : undefined; }


  constructor(private _managementService: ManagementService) { }

  public getAuth(): Observable<any> {
    if (this._cachedAuth !== undefined) {
      return of(this._cachedAuth);
    } else {
      if (!this.httpRequest) {
        this.httpRequest = this._managementService.getMethod('GetRole')
          .pipe(
            map((response: any) => {
              return this.authSuccess(response);
            })
          );
      }
      return this.httpRequest;
    }
  }


  public authSuccess(auth): IAuth {
    if (auth) {
      this.setAuthResponse(auth);
      this._authSource.next(auth);
      this._authStreamSource.next(true);
    } else {
      this._authStreamSource.next(false);
    }
    return auth as IAuth;
  }

  public setAuthResponse(data: IAuth): void {
    if (data) {

      if (!this._cachedAuth) {
        this._cachedAuth = data;
      } else {
        this._cachedAuth = Object.assign({}, this._cachedAuth, data);
      }

    }
  }

}
