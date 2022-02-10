import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardService } from 'src/app/components/card/card.service';
import { IComponentFilter } from 'src/app/components/filter/filter.interface';
import { FilterService } from 'src/app/components/filter/filter.service';
import { ITable } from 'src/app/components/table/table.interface';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

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
    tableInfo['Id_Operacion'] = 'Id de operación';
    tableInfo['Referencia'] = 'Referencia';
    tableInfo['Id_Sistema'] = 'Id de sistema';
    tableInfo['Fecha_Operacion'] = 'Fecha de operación';
    tableInfo['Id_Estado'] = 'Id de estado';
    tableInfo['Estado'] = 'Estado';
    tableInfo['Evento'] = 'Evento';
    tableInfo['Alertas'] = 'Alertas';
    tableInfo['Custodia'] = 'Custodia';
    tableInfo['Importe'] = 'Importe';
    tableInfo['Moneda'] = 'Moneda';
    tableInfo['Fecha_Ultimo_Evento'] = 'Fecha del último evento';
    tableInfo['Id_Status_Tran'] = 'Id del estatus de transacción';
    tableInfo['Desc_Status_Tran'] = 'Descripción del estatus de transacción';
    tableInfo['Beneficiario'] = 'Beneficiario';
    tableInfo['Comprador'] = 'Comprador';
    tableInfo['Alert_Id'] = 'Código de alerta';
    tableInfo['Alert_Description'] = 'Descripción de alerta';
    const getData: { [key: string]: string } = { ['ConsoleOperWithAlert']: 'Operaciones' };
    const getCsv = 'alerts'
    return {
      expanded: [
        'Referencia',
        'Evento',
        'Custodia',
        'Importe',
        'Beneficiario'
      ],
      header: [
        'Referencia',
        'Evento',
        'Custodia',
        'Importe',
        'Alert_Description',
        'Alert_Id',
        'Estado'
      ],
      getData: getData,
      tableInfo: tableInfo,
      searchRef: false,
      csv: getCsv
    }
  }

  private _getFilters(): IComponentFilter[] {
    return [
      {
        name: 'alert_id',
        type: 'select',
        multiple: true,
        label: 'ID de alertas',
        properties: this.filterService.getProperties('Tipo_Alerta_List', 'Alert_ID', 'Description'),
      }
    ];
  }
}
