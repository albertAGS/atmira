import { Component, Input, OnInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardPopupComponent } from 'src/app/components/card/card-popup/card-popup.component';
import { IComponentFilter } from 'src/app/components/filter/filter.interface';
import { FilterService } from 'src/app/components/filter/filter.service';
import { ITable } from 'src/app/components/table/table.interface';
import { TableService } from 'src/app/components/table/table.service';
import { ITab } from 'src/app/components/tabs/tab.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {

  @Input() cards: { title: string, number: string }[]
  @Input() infoTable: ITable
  @Input() filters: IComponentFilter[]

  public listTabs: ITab[] = []
  public selectedOption: string;
  public filtersOpened = false;
  public smallWindow = false;
  public height = 0;

  constructor(public tableService: TableService,
    private filterService: FilterService,
    private _router: Router,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this._getTabs()
    this.windowResize(1000)
  }

  public downloadCSV() {
    const data = {
      Route: this.infoTable.csv,
      Filtros: this.filterService.filters || [],
      Id: this.tableService.idReference || '',
      Inicio: "0",
      Fin: "20",
      Total: "0",
    };
    this.tableService.exportCSV(data).subscribe((blob: any) => {
      const downloadLink = document.createElement("a");
      const url  = URL.createObjectURL(blob) as any;
      downloadLink.href = url;
      downloadLink.download = this._getName(data.Route);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }

  public backOperations() {
    this.tableService.backOperations = false;
    this.tableService.idReference = null;
    this._router.navigate(['/console/operations']);
  }

  public windowResize(time = 55) {
    setTimeout(() => {
      let event = (document.querySelector('#tableSize') as any).offsetWidth;
      event <= 1050 ? this.smallWindow = true : this.smallWindow = false
      this.height = (document.querySelector('#tableSize') as any).offsetHeight - 130
    }, time);
  }

  public filterClick() {
    this.filtersOpened = !this.filtersOpened;
    this.windowResize()
  }

  public openTransactions() {
    this.dialog.open(CardPopupComponent);
  }

  private _getTabs() {
    this.listTabs = [
      {
        name: 'Operaciones',
        icon: 'operations',
        url: 'operations',
      }, {
        name: 'Peticiones',
        icon: 'requests',
        url: 'requests',
      },
      {
        name: 'Eventos',
        icon: 'events',
        url: 'events',
      }, {
        name: 'Transferencias',
        icon: 'transfers',
        url: 'transfers',
      }, {
        name: 'Cuentas',
        icon: 'accounts',
        url: 'accounts',
      }, {
        name: 'Alertas',
        icon: 'alerts',
        url: 'alerts',
      }];
  }


  private _getName(name: string){
    switch (name) {
      case 'accounts':
        return 'Cuentas'
      case 'operations':
        return 'Operaciones'
      case 'requests':
        return 'Peticiones'
      case 'alerts':
        return 'Alertas'
      case 'events':
        return 'Eventos'
      case 'transfers':
        return 'Transferencias'
    }
  }
}
