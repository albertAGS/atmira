import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardService } from 'src/app/components/card/card.service';
import { IComponentFilter } from 'src/app/components/filter/filter.interface';
import { FilterService } from 'src/app/components/filter/filter.service';
import { ITable } from 'src/app/components/table/table.interface';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {

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
    tableInfo['Referencia'] = 'Referencia';
    tableInfo['Sistema'] = 'Sistema';
    tableInfo['Fecha_Operacion'] = 'Fecha';
    tableInfo['Estado'] = 'Estado pago';
    tableInfo['Evento'] = 'Evento';
    tableInfo['Moneda'] = 'Moneda';
    tableInfo['Fecha_Ultimo_Evento'] = 'Fecha último evento';
    tableInfo['Alertas'] = 'Alerta';
    tableInfo['Importe'] = 'Importe';
    tableInfo['Comprador'] = 'Comprador';
    const getData: { [key: string]: string } = {['ConsoleOper']: 'Operaciones'};
    const getCsv = 'operations'
    return {
      expanded: [
        'Evento',
        'Fecha_Ultimo_Evento',
        'Comprador',
        'Importe',
        'Estado',

      ],
      header: [
        'Referencia',
        'Sistema',
        'Fecha_Operacion',
        'Alertas',
        'Importe',
        'Evento',
        'Estado'],
      getData: getData,
      tableInfo: tableInfo,
      buttons: this._getButtons(),
      csv: getCsv,
      popUp: true
    }
  }

  private _getButtons() {
    return [
      {
        name: 'Peticiones',
        icon: 'bar_chart',
        url: 'requests',
        get: { ['ConsolePet']: 'Peticiones' }
      },
      {
        name: 'Eventos',
        icon: 'bar_chart',
        url: 'events',
        get: { ['ConsoleEve']: 'Eventos' }
      }, {
        name: 'Transferencias',
        icon: 'bar_chart',
        url: 'transfers',
        get: { ['ConsoleTrans']: 'Transferencias' }
      }
    ];
  }

  private _getFilters(): IComponentFilter[] {
    return [
      {
        name: 'id_referencia',
        type: 'inputText',
        label: 'Referencia',
      },
      {
        name: 'nombre_comprador',
        type: 'inputText',
        label: 'Nombre del comprador',
      },
      {
        name: 'nombre_vendedor',
        type: 'inputText',
        label: 'Nombre del vendedor',
      }, {
        name: 'id_estado',
        type: 'select',
        label: 'Estados',
        multiple: true,
        properties: this.filterService.getProperties('Estado_Oper_List', 'Status_Id', 'Status_Name'),
      }, {
        name: 'importe',
        type: 'rangeNumber',
        label: 'Importe',
        properties: {
          start: {
            name: 'importe_min',
            label: 'Importe minimo'
          },
          end: {
            name: 'importe_max',
            label: 'Importe maximo'
          }
        }
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
