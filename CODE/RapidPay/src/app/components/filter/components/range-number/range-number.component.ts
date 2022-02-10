import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IComponentFilter, IDateTimeRangeFilter } from '../../filter.interface';

import { rangeNumberValidator } from '../../../validators'

@Component({
  selector: 'app-range-number',
  templateUrl: './range-number.component.html',
  styleUrls: ['./range-number.component.scss']
})
export class RangeNumberComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() filter: IComponentFilter;

  @Output() errorEvent: EventEmitter<{[key:string]:boolean}> = new EventEmitter();

  public properties: IDateTimeRangeFilter;
  public error = '';

  ngOnInit(): void {
    this.properties = this.filter.properties as IDateTimeRangeFilter;

    setTimeout(() => {
      this.form.get(this.filter.name).setValidators(
        rangeNumberValidator([this.properties.start.name, this.properties.end.name]));
      this.error = '';
    }, 0);
  }

  public change() {
    this.error = '';
    this.errorEvent.emit({[this.filter.name]:false});
    const error = this.form?.get(this.filter.name)?.errors?.range && ((this.form?.get(this.filter.name).get(this.properties.end.name)?.dirty
    || this.form?.get(this.filter.name).get(this.properties.end.name)?.touched))
    if (error) {
      this.error = 'Error';
      this.errorEvent.emit({[this.filter.name]:true});
    }
  }
}
