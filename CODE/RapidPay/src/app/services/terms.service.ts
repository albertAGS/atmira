
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TermsService {
  headers = new HttpHeaders();
  constructor(private http: HttpClient) { }


  /**
   * Metodo de envio de recuperacion de datos del pago
   * @param data referencia para recuperar informacion
   * @returns Observable al que subscribirte
   */
  post = (data) => {
    return this.http.post(environment.url + 'TyC', data).pipe(retry(0), catchError(this.errorHandl));
  }

  errorHandl(error) {
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