import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { IComponentFilter, IDateTimeRangeFilter } from '../../filter.interface';

@Component({
  selector: 'app-date-time-range',
  templateUrl: './date-time-range.component.html',
  styleUrls: ['./date-time-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DateTimeRangeComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() filter: IComponentFilter;
  @Output() errorEvent: EventEmitter<boolean> = new EventEmitter();

  public properties: IDateTimeRangeFilter

  constructor(private _adapter: DateAdapter<Date>) { }

  ngOnInit(): void {
    this._adapter.setLocale('es');
    this.properties = this.filter.properties as IDateTimeRangeFilter;
  }

  public searchError() {
    setTimeout(() => {
      if (this.form.controls[this.properties.start.name]?.errors || this.form.controls[this.properties.end.name]?.errors) {
        this.errorEvent.emit(true)
      } else {
        this.errorEvent.emit(false)
      }
    }, 0);
  }
}

