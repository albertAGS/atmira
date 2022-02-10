import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ManagementService } from 'src/app/views/management/services/management.service';
import { isFunction } from 'util';
import { IDataTable } from './table.interface';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private dataTableSubject$: Subject<any> = new Subject();
  public dataTable$: Observable<any> = this.dataTableSubject$.asObservable();
  public url: { [key: string]: string };
  public idReference: string = '';
  public filtersFromOperations: IDataTable = {
    Fin: "50",
    Inicio: "0",
    Total: "50"
  };
  public length: number = 0;
  public backOperations: boolean = false;
  public queryParams: IDataTable = {
    Fin: "50",
    Inicio: "0",
    Total: "50"
  };

  constructor(private _managementService: ManagementService) { }

  public getValues(data: IDataTable = {
    Fin: "50",
    Inicio: "0",
    Total: "50"
  }) {
    const url = Object.keys(this.url)[0];
    if (this.idReference && url !== 'ConsoleCCV' && url !== 'ConsoleOperWithAlert') {
      data = { Id: this.idReference };
    }
    if (url === 'ConsoleOper' ) {
      this.backOperations = false
    } else if(url !== 'ConsoleOper' && this.idReference){
      this.backOperations = true
    }
    if (this.idReference === '') {
      this.backOperations = false;
    }
    this._managementService.postMethod(url, data, true, true).subscribe((data: any) => {
      this.dataTableSubject$.next(data);
    });
  }

  public exportCSV(data) {
    data.Fin = this.length;
    data.Total = this.length;
    return this._managementService.downloadMethod('ExportCSV', data, false);
  }
}


