import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-entities',
  templateUrl: './search-entities.component.html',
  styleUrls: ['./search-entities.component.scss']
})
export class SearchEntitiesComponent implements OnInit {

  @Input() entities;
  search: FormGroup;
  results = [];
  @Output() entityEmitter = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.search = this.formBuilder.group({
      result: new FormControl('', [])
    }, {});

    this.search.valueChanges.subscribe(data => {
      if (this.search.get('result').value === '') {
        this.results = [];
      } else {
        this.results = this.entities.filter(d => d.Name.toLowerCase().includes(data.result.toLowerCase()));
      }

    });
  }
  selectEntity(bankId) {
    this.entityEmitter.emit(bankId);
  }
}
