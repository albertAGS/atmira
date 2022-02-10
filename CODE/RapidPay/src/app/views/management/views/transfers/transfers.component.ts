import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardService } from 'src/app/components/card/card.service';
import { IComponentFilter } from 'src/app/components/filter/filter.interface';
import { FilterService } from 'src/app/components/filter/filter.service';
import { ITable } from 'src/app/components/table/table.interface';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {

  public filters: IComponentFilter[]
  public infoTable: ITable;
  public cards: { title: string, number: string }[]

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
    tableInfo['CC_Destino'] = 'Cuenta Destino';
    tableInfo['CC_Origen'] = 'Cuenta Origen	';
    tableInfo['Fecha'] = 'Fecha';
    tableInfo['Id_Evento'] = 'Id Evento';
    tableInfo['Servicio'] = 'Servicio';
    tableInfo['Id_transferencia'] = 'ID Transferencia';
    tableInfo['Importe'] = 'Importe';
    tableInfo['Referencia'] = 'Referencia';
    const getData: { [key: string]: string } = {};
    const getCsv = 'transfers'

    getData['ConsoleTrans'] = 'Transferencias'
    return {
      expanded: [
        'Referencia',
        'CC_Destino',
        'CC_Origen',
        'Fecha',
        'Importe',
      ],
      header: [
        'Referencia',
        'Servicio',
        'Fecha',
        'Importe',
      ],
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
        name: 'id_servicio',
        type: 'select',
        label: 'Servicio',
        multiple:true,
        properties: this.filterService.getProperties('Servicio_List', 'Service_ID', 'Service_Desc'),

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
