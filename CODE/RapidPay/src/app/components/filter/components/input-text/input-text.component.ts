import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IComponentFilter } from '../../filter.interface';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() filter: IComponentFilter;

  ngOnInit(): void {
  }

}
