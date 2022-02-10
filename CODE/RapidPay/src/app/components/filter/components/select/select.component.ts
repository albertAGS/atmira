import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IComponentFilter } from '../../filter.interface';

@Component({
  selector: 'app-select-filter',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {


  @Input() form: FormGroup;
  @Input() filter: IComponentFilter;
  @Output() private changeEvent: EventEmitter<void> = new EventEmitter();

}
