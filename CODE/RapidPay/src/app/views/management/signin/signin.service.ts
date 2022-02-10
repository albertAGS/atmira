import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ManagementService } from '../services/management.service';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  public token: string = null;
  public redirectUrl: string = null;

  constructor(private _managementService: ManagementService) { }

  public login(enpoint: string, data: {Code: string, Key: string}) {
    return this._managementService.postMethod(enpoint, data).pipe(
      tap((user: any) => sessionStorage.setItem('Authorization', user.Token))
    )
  }

  public logout() {
    sessionStorage.removeItem('Authorization');
  }
}
