import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ManagementService } from 'src/app/views/management/services/management.service';
import { TableService } from '../table/table.service';
import { IFilterModel } from './filter.interface';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private dataFiltersSubject$: Subject<any> = new Subject();
  public dataFilters$: Observable<any> = this.dataFiltersSubject$.asObservable();
  public dataFilter;

  private filtersSubject$: Subject<any> = new Subject();
  public filters$: Observable<any> = this.filtersSubject$.asObservable();
  public filters: { value: string, name: string }[] = [] ;

  constructor(private _managementService: ManagementService,
    private _tableService:  TableService) {}

  public sendFilters(event:{filters:IFilterModel[], toSearch: boolean}) {
    const filtersToSend: IFilterModel[] = [];
    event.filters?.forEach((filter: IFilterModel) => {
      if (filter.value && (filter.value as string).length !== 0) {
        filtersToSend.push(filter);
      }
    });
    this.filters = []
    this._tableService.filtersFromOperations.Filtros = []
    filtersToSend?.forEach(element => {
      this.filters.push({ value: element.value.toString(), name: element.name });
      this._tableService.filtersFromOperations.Filtros.push({ value: element.value.toString(), name: element.name , type: element.type });
    });
    this.filtersSubject$.next(this.filters)
  }


  public getFiltersValues(url: string): void {
    this._managementService.getMethod(url).subscribe(filters => {
      this.dataFilter = filters;
      this.dataFiltersSubject$.next(filters)
    });
  }

  public getProperties(propertyName: string, valueInfo: string, descriptionInfo: string  | string [], type = 'default') {
    const properties = [];
    this.dataFilter[propertyName].forEach((act: { value: string, description: string }, i: number = 0) => {
      switch (type) {
        case 'select':
          if (i == 0) {
            properties.push({ value: '', description: null });
          }
        default:
          properties.push({ value: act[valueInfo].toString(), description: typeof(descriptionInfo) === 'string' ? act[descriptionInfo] : `${act[descriptionInfo[0]]}: ${act[descriptionInfo[1]]}` });
          break;
      }
    });
    return properties;
  }
}
