import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IComponentFilter, IDateTimeRangeFilter, IFilterModel } from './filter.interface';
import * as dayjs from 'dayjs'

import { FilterService } from './filter.service';
import { TableService } from '../table/table.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges {

  public form: FormGroup;
  public listErrors: { [key: string]: boolean }[] = [];
  public error: boolean;

  private _initState: { formValues: any, filters: IFilterModel[] } = {} as any;

  @Input() filters: IComponentFilter[];

  constructor(private _fb: FormBuilder,
    private _filterService: FilterService,
    private _tableService: TableService) { }

  ngOnInit(): void {
    if (!this.filters) {
      this.filters = []
    }
    this._createForm(false);
  }

  ngOnChanges(): void {
    if (!this.filters) {
      this.filters = []
    }
    this._createForm(false);
  }

  public resetFilters() {
    this._tableService.filtersFromOperations = {
      Fin: "50",
      Inicio: "0",
      Total: "50"
    }
    this._tableService.queryParams = {
      Fin: "50",
      Inicio: "0",
      Total: "50"
    }
    this._tableService.idReference = ''
    this.form.reset();
    this._createForm();
  }

  public search() {
    const filtersActived: IFilterModel[] = [];
    let type: string[]
    Object.keys(this.form.controls).forEach((name) => {
      const filter = this.filters.find((filter: IComponentFilter) => {
        type = [];
        switch (filter.type) {
          case 'datetimerange':
            const propertiesDate: IDateTimeRangeFilter = filter.properties as IDateTimeRangeFilter;
            type = ['datetimerange'];
            return propertiesDate.start.name === name || propertiesDate.end.name === name;
          case 'matCheckbox':
            type = ['matCheckbox', filter.name];
            return filter.name === name;
          case 'select':
            if (filter.multiple) {
              type = ['multiple'];
            }
            return filter.name === name;
          case 'rangeNumber':
            const propertiesRange: IDateTimeRangeFilter = filter.properties as IDateTimeRangeFilter;
            type = ['rangeNumber'];
            return propertiesRange.start.name.match(name);
          default:
            return filter.name === name;
        }
      });
      if (filter.name === 'id_referencia') {
        this._tableService.idReference = this.form.get('id_referencia').value
      } else if (type[0] === 'multiple' && this.form.get(name).value) {
        filtersActived.push({
          name: name,
          value: this.form.get(name).value.join(','),
          type: 'multiple'
        });
      } else if (type[0] === 'datetimerange' && this.form.get(name).value) {
        filtersActived.push({
          name: name,
          value: dayjs(this.form.get(name).value).format('DD/MM/YYYY'),
          type: 'datetimerange'
        });
      } else if (type[0] === 'rangeNumber') {
        filtersActived.push({
          name: `${name}_min`,
          value: this.form.get(name).get(`${name}_min`).value,
          type: 'rangeNumber'
        });
        filtersActived.push({
          name: `${name}_max`,
          value: this.form.get(name).get(`${name}_max`).value,
          type: 'rangeNumber'
        });
      } else {
        filtersActived.push({
          name: name,
          value: this.form.get(name).value,
        });
      }
    });
    if (!this.error) {
      this._filterService.sendFilters({ filters: filtersActived, toSearch: true })
    }
  }

  public checkError(event: { [key: string]: boolean }) {
    const [key, entry] = Object.entries(event)[0]
    this.listErrors[key] = entry;
    for (const iterator in this.listErrors) {
      if (this.listErrors[iterator]) {
        return this.error = true;
      } else {
        this.error = false;
      }
    }
  }

  private _createForm(refresh: boolean = true) {
    let filtersActived: IFilterModel[] = [];
    this._initState.filters = [];
    this.form = this._fb.group({});
    this.filters.forEach((filter: IComponentFilter) => {
      if (filter.type === 'datetimerange') {
        const properties: IDateTimeRangeFilter = filter.properties as IDateTimeRangeFilter;
        this.form.addControl(properties.start.name, new FormControl());
        this.form.addControl(properties.end.name, new FormControl());
      } else if (filter.type === 'rangeNumber') {
        const properties: IDateTimeRangeFilter = filter.properties as IDateTimeRangeFilter;
        const formRange = this._fb.group({});
        formRange.addControl(properties.start.name, new FormControl());
        formRange.addControl(properties.end.name, new FormControl());
        this.form.addControl(filter.name, formRange);
        // this.form.addControl(properties.start.name, new FormControl());
        // this.form.addControl(properties.end.name, new FormControl());
        // this.form.get(properties.end.name).setValidators(
        //   rangeNumberValidator([properties.start.name, properties.end.name]))
        // this.error = false
        // this.form.get(properties.start.name).setValidators(
        //   rangeNumberValidator([properties.start.name, properties.end.name]))
        // this.error = false
      } else if (filter.type === 'select') {
        this.form.addControl(filter.name, new FormControl(filter.defaultValue?.split(',') as any));
      }
      else {
        this.form.addControl(filter.name, new FormControl(filter.defaultValue as any));
      }
    });
    if (this._tableService.idReference && this.form.get('id_referencia')) {
      this.form.get('id_referencia').setValue(this._tableService.idReference)
    };
    if (this._tableService.filtersFromOperations?.Filtros && !this._tableService.backOperations) {
      this._tableService.filtersFromOperations.Filtros.forEach(filter => {
        if (filter.name.startsWith('fecha')) {
          const [day, month, year] = filter.value.split('/')
          this.form.get(filter.name).setValue((new Date(`${year}/${month}/${day}`)));
        } else if (filter.type === 'multiple') {
          this.form.get(filter.name).setValue(filter.value.split(','));
        } else if (this.form.get(filter.name)) {
          this.form.get(filter.name).setValue(filter.value);
        } else {
          this.form.get(filter.name.split('_')[0]).get(filter.name).setValue(filter.value)
        }
        filtersActived = this._tableService.filtersFromOperations.Filtros;
      });
    }
    if (refresh) {
      setTimeout(() => {
        this._filterService.sendFilters({ filters: filtersActived, toSearch: refresh })
      }, 0);
    }
  }
}
