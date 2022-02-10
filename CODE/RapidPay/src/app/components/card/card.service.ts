import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ManagementService } from 'src/app/views/management/services/management.service';
import { ICard } from './card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private cardsSubject$: Subject<any> = new Subject();
  public cards$: Observable<any> = this.cardsSubject$.asObservable();
  public cardInfo;
  public statsTransactions: any = {}

  private totalTransactions = 0;

  constructor(private _managementService: ManagementService) { }

  public getCardsValues(url: string): void {
    this._managementService.getMethod(url).subscribe(cards => {
      this.cardInfo = cards;
      this.cardsSubject$.next(cards)
    });
  }

  public listsCards():ICard[] {
    return [{
      number: this.cardInfo['amountsStats']['total'],
      title: 'Importe total'
    }, {
      number: this.cardInfo['amountsStats']['average'],
      title: 'Importe medio'
    }, {
      number: this.cardInfo['amountsStats']['maximun'],
      title: 'Importe Max.'
    }, {
      number: this.cardInfo['amountsStats']['minimun'],
      title: 'Importe Min.'
    }, {
      number: this.cardInfo['amountsStats']['inCustody'],
      title: 'Saldo en custodia'
    }, {
      number: this.getTransactions(),
      title: 'Transacciones',
      button: 'Ver detalles'
    }, {
      number: this.cardInfo['alerts'],
      title: 'Alertas',
      icon: 'alerts',
    }]
  }

  public getTransactions() {
    this.statsTransactions
    if (this.totalTransactions === 0) {
      const changekey =(stats: any) =>{
        switch (stats) {
          case 'iniciada':
            return 'Iniciada'
          case 'conAlerta':
            return 'Alerta'
          case 'error':
            return 'Error'
          case 'esperandoFondos':
            return 'Esperando-fondos'
          case 'completada':
            return 'Completada'
          case 'liberandoSaldo':
            return 'Liberando-saldos'
          case 'reembolsada':
            return 'Reembolsada'
          case 'reembolsando':
            return 'Reembolsando'
          case 'saldoRepartido':
            return 'Saldo-repartido'
        }
      }
      for (const key in this.cardInfo['operationStats']) {
        if (Object.prototype.hasOwnProperty.call(this.cardInfo['operationStats'], key)) {
          this.statsTransactions[changekey(key)] = Number(this.cardInfo['operationStats'][key])
          this.totalTransactions += Number(this.cardInfo['operationStats'][key]);
        }
      }
    }
    return this.totalTransactions.toString();
  }
}
