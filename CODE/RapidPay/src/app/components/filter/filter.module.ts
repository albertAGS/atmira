import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from "src/app/material-modules";


import { FilterComponent } from './filter.component';
import { SelectComponent } from './components/select/select.component';
import { DateTimeRangeComponent } from './components/date-time-range/date-time-range.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { RangeNumberComponent } from './components/range-number/range-number.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { InputTextComponent } from './components/input-text/input-text.component';

@NgModule({
  declarations: [
    FilterComponent,
    SelectComponent,
    DateTimeRangeComponent,
    RadioButtonComponent,
    RangeNumberComponent,
    AutocompleteComponent,
    InputTextComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModules,
    FormsModule
  ],
  exports: [
    FilterComponent
  ]
})
export class FilterModule { }
