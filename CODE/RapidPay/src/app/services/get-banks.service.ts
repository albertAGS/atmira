import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetBanksService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns observable
   */
  getEntities = () => {
    return this.http.post(environment.url + 'GetBank', {}).pipe(retry(0), catchError(this.errorHandl));
  }

  errorHandl = (error) => {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
