import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ICommonFilter, IComponentFilter } from '../../filter.interface';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AutocompleteService } from './autocomplete.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() filter: IComponentFilter;

  public filteredOptions: Observable<ICommonFilter[]>;
  public options: string[]

  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.form.get(this.filter.name).valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterValues(value))
      );
  }

  private _filterValues(value: string): ICommonFilter[] {
    const filterValue = value.toLowerCase();
    return (this.filter.properties as ICommonFilter[])
      .filter(value => value.description.toLowerCase()
        .includes(filterValue));
  }
}
