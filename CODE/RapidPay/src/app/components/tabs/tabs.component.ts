import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TableService } from '../table/table.service';


import { ITab } from './tab.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {

  @Input() optionsTabs: ITab[];
  @Input() smallWindow: boolean;

  constructor(private tableService: TableService) { }

  public changeTab() {
    this.tableService.filtersFromOperations = {
      'Fin': '50',
      'Inicio': '0',
      'Total': '50'
    };
    this.tableService.queryParams = {
      'Fin': '50',
      'Inicio': '0',
      'Total': '50'
    }
  }
}
