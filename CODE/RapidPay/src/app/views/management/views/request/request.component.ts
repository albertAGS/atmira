import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardService } from 'src/app/components/card/card.service';
import { IComponentFilter } from 'src/app/components/filter/filter.interface';
import { FilterService } from 'src/app/components/filter/filter.service';
import { ITable } from 'src/app/components/table/table.interface';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  public infoTable: ITable;
  public cards: { title: string, number: string }[]
  public filters: IComponentFilter[]

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

  private _getTableInfo() {
    const tableInfo: { [key: string]: string } = {};
    tableInfo['Access_Toke'] = 'Access token';
    tableInfo['App_Name'] = 'App name';
    tableInfo['Fecha_Transaccion'] = 'Fecha transacción';
    tableInfo['Id_Peticion'] = 'Id petición';
    tableInfo['Payment_Id'] = 'Id pago';
    tableInfo['Referencia'] = 'Referencia';
    tableInfo['SRC_Operacion_ID'] = 'SRC operación ID';
    tableInfo['Servicio'] = 'Servicio';
    const getData: { [key: string]: string } = {};
    const getCsv = 'requests'
    getData['ConsolePet'] = 'Peticiones'
    return {
      expanded: [
        'Referencia',
        'App_Name',
        'Fecha_Transaccion',
        'Servicio'],
      header: [
        'Referencia',
        'App_Name',
        'Fecha_Transaccion',
        'Servicio'],
      getData: getData,
      tableInfo: tableInfo,
      csv: getCsv
      // searchRef: true
    }
  }

  private _getFilters(): IComponentFilter[] {
    return [
      {
        name: 'id_referencia',
        type: 'inputText',
        label: 'Referencia',
      },
      {
        name: 'estado',
        type: 'select',
        label: 'Estados',
        properties: this.filterService.getProperties('Estado_Peticion_List', 'Status_Id', ['Status_Name', 'Status_Desc' ], 'select'),
      }, {
        name: 'fechaRange',
        type: 'datetimerange',
        properties: {
          start: {
            name: 'fecha_ini',
            label: 'Fecha inicio'
          },
          end: {
            name: 'fecha_fin',
            label: 'Fecha fin'
          }
        }
      }
    ];
  }
}
