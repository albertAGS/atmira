import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IComponentFilter } from '../../filter.interface';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent {

  @Input() form: FormGroup;
  @Input() filter: IComponentFilter;
  @Output() private changeEvent: EventEmitter<void> = new EventEmitter();

  public onChange() {
    this.changeEvent.emit();
  }
}
