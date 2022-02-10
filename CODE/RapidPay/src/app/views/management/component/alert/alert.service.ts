import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { IAlert } from './alert.interface';

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  private alertSubject$ = new Subject<any>();
  public message(alert: IAlert) {
    this._next(alert);
    setTimeout(() => {
      this.clear();
    }, 5000);
  }

  public getMessage(): Observable<any> {
    return this.alertSubject$.asObservable();
  }

  public clear() {
    this.alertSubject$.next();
  }

  private _next(alert: IAlert) {
    this.alertSubject$.next({
      title:alert.title, text: alert.text, type: alert.type, icon: alert.icon,
    });
  }
}
