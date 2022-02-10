import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICommonFilter } from '../../filter.interface';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor() { }

  public getValues(value: string): Observable<ICommonFilter[]> {
    return of([{value: value, description: ''},
    {value: value, description: ''},
    {value: value, description: ''},
    {value: value, description: ''}])
  }
}
