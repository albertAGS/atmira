import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardService } from 'src/app/components/card/card.service';
import { IComponentFilter } from 'src/app/components/filter/filter.interface';
import { FilterService } from 'src/app/components/filter/filter.service';

import { ITable } from 'src/app/components/table/table.interface';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})

export class AccountsComponent implements OnInit, OnDestroy {

  public filters: IComponentFilter[]
  public infoTable: ITable;
  public cards: { title: string, number: string }[];

  private _subscriptions: Subscription[] = [];

  constructor(private filterService: FilterService,
    private cardService: CardService) { }

  ngOnInit(): void {
    if (!this.filterService.dataFilter) {
      this.filters = [];
      this._subscriptions.push(
        this.filterService.dataFilters$.subscribe((data: any) => {
          this.filters = this._getFilters();
        })
      );
    } else {
      this.filters = this._getFilters();
    }
    if (!this.cardService.cardInfo){
      this.cards = [];
      this._subscriptions.push(
        this.cardService.cards$.subscribe(() => {
          this.cards = this.cardService.listsCards();
        })
      );
    } else {
      this.cards = this.cardService.listsCards();
    }
    this.infoTable = this._getTableInfo();
  }

  private _getTableInfo(): ITable {
    const tableInfo: { [key: string]: string } = {};
    tableInfo['CuentaCorriente'] = 'Nº. Cuenta';
    tableInfo['Id_Titular'] = 'ID Titular';
    tableInfo['Saldo_V'] = 'Saldo Virtual';
    tableInfo['Titular'] = 'Titular';
    tableInfo['saldo_E'] = 'Saldo Real';
    const getData: { [key: string]: string } = {};
    getData['ConsoleCCV'] = 'Cuentas'
    const getCsv = 'accounts'
    return {
      expanded: [
        'CuentaCorriente',
        'Titular',
        'Saldo_V',
        'saldo_E',
        ],
      header: [
        'CuentaCorriente',
        'Titular',
        'Saldo_V',
        'saldo_E',
      ],
      getData: getData,
      tableInfo: tableInfo,
      csv: getCsv
    }
  }


  private _getFilters(): IComponentFilter[] {
    return [
      {
        name: 'titular',
        type: 'inputText',
        label: 'Titular',
      },
      {
        name: 'saldo_e',
        type: 'rangeNumber',
        label: 'Saldo real',
        properties: {
          start: {
            name: 'saldo_e_min',
            label: 'Saldo real minimo'
          },
          end: {
            name: 'saldo_e_max',
            label: 'Saldo real maximo'
          }
        }
      },
      {
        name: 'saldo_v',
        type: 'rangeNumber',
        label: 'Saldo virtual',
        properties: {
          start: {
            name: 'saldo_v_min',
            label: 'Saldo virtual minimo'
          },
          end: {
            name: 'saldo_v_max',
            label: 'Saldo virtual maximo'
          }
        }
      },
    ];
  }

  ngOnDestroy() {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }
}
