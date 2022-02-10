import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  headers = new HttpHeaders();
  constructor(private http: HttpClient) { }


  /**
   * Metodo de envio de informacion del pago
   * @param data datos a enviar de informacion de pago
   * @param endPoind el endpoint de la API
   * @returns Observable al que subscribirte
   */
  methodPayment = (data, endPoind) => {
    return this.http.post(environment.url + endPoind, data).pipe(retry(0), catchError(this.errorHandl));
  }

  /**
   * recoge el ultimo numero de referencia
   * @returns Observable
   */
  getLastReference = () => {
    // return this.http.post(environment.url + 'GetReference', {}).pipe(retry(0), catchError(this.errorHandl));
  }

  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
