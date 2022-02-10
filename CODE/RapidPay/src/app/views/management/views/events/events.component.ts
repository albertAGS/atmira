import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardService } from 'src/app/components/card/card.service';
import { IComponentFilter } from 'src/app/components/filter/filter.interface';
import { FilterService } from 'src/app/components/filter/filter.service';
import { ITable } from 'src/app/components/table/table.interface';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

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
    tableInfo['CuentaCorriente'] = 'Nº. Cuenta';
    tableInfo['Estado_Pago'] = 'Estado pago';
    tableInfo['Evento'] = 'Evento';
    tableInfo['FechaEfecto'] = 'Fecha efecto';
    tableInfo['Id_Peticion'] = 'Id peticion';
    tableInfo['Id_Servicio'] = 'Id servicio';
    tableInfo['Id_Sistema'] = 'Id sistema';
    tableInfo['Id_evento'] = 'Id evento';
    tableInfo['Importe'] = 'Importe';
    tableInfo['Referencia'] = 'Referencia';
    tableInfo['Servicio'] = 'Servicio';
    tableInfo['Sistema'] = 'Sistema';
    tableInfo['Tipo_Evento'] = 'Tipo evento';
    const getCsv = 'events'

    return {
      expanded: [
        'Referencia',
        'CuentaCorriente',
        'Estado_Pago',
        'Evento',
        'FechaEfecto',
        'Importe',
        'Servicio',
        'Sistema',
        'Tipo_Evento',],
      header: [
        'Referencia',
        'Estado_Pago',
        'Evento',
        'FechaEfecto',
        'Importe',
        'Servicio',
        'Sistema',
        'Tipo_Evento'],
      getData:  { ['ConsoleEve']: 'Eventos' },
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
        name: 'tipo_evento',
        type: 'select',
        multiple: true,
        label: 'Tipo evento',
        properties: this.filterService.getProperties('Tipo_Evento_List', 'Type_ID', 'Type_Name'),

      }, {
        name: 'id_servicio',
        type: 'select',
        label: 'Servicios',
        multiple: true,
        properties: this.filterService.getProperties('Servicio_List', 'Service_ID', 'Service_Desc'),
      }, {
        name: 'estado_pago',
        type: 'select',
        label: 'Estado de pagos',
        multiple: true,
        properties: this.filterService.getProperties('Estado_Pago_Evento_List', 'Status_ID', 'Status_Desc'),
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
