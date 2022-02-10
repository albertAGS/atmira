import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { ITable } from './table.interface';
import { TableService } from './table.service';
import { Subscription } from 'rxjs';
import { ManagementService } from 'src/app/views/management/services/management.service';
import { Router } from '@angular/router';
import { ITab } from '../tabs/tab.interface';
import { FilterService } from '../filter/filter.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpTableComponent } from './pop-up-table/pop-up-table.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AlertService } from 'src/app/views/management/component/alert/alert.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('250ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TableComponent implements OnInit {


  @Input() infoTable: ITable;
  @Input() height: number = 0;

  // public dataToDisplay: MatTableDataSource<any> = null;
  public loading = true;

  private pageIndex: number = 0;
  private pageSize: number;

  public dataToDisplay = [];
  // public dataSource = new TableDataSource(this.dataToDisplay);
  public dataSource;

  private _bottom = true;
  private _subscriptions: Array<Subscription> = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public tableService: TableService,
    private managementService: ManagementService,
    private _filterService: FilterService,
    private _alertService: AlertService,
    private _router: Router,
    private dialog: MatDialog
  ) { }

  // @HostListener('window:scroll', ['$event'])
  // private handleScroll($event: Event) {
  //   const docElement = document.documentElement;
  //   const docHeight = docElement.scrollHeight - docElement.clientHeight;
  //   const height = ($event.target as HTMLElement).children[0].scrollTop;
  //   if (docHeight - height < 10 && this._bottom === true && this.tableService.length > this.pageIndex * 10 + 9) {
  //     this._bottom = false
  //     this.pageIndex += 1;
  //     this.tableService.queryParams = {
  //       Inicio: `${this.pageIndex * 10}`,
  //       Fin: `${this.pageIndex * 10 + this.pageSize}`,
  //       Total: `${this.pageSize}`,
  //       Filtros: this._filterService.filters
  //     };
  //     this._getData();
  //   }
  // }

  ngOnInit() {
    this.tableService.url = this.infoTable.getData;
    this._getData();
    this._subscriptions.push(
      this.managementService.loading$.subscribe(load => {
        this.loading = load;
      })
    );
    this._subscriptions.push(
      this._filterService.filters$.subscribe(() => {
        this.tableService.queryParams = {
          Fin: "50",
          Inicio: "0",
          Total: "50",
          Filtros: this._filterService.filters
        };
        this.dataToDisplay = [];
        this.pageIndex = 0;
        this._getData()
      })
    );
    const route = Object.keys(this.tableService.url)[0];
    this._subscriptions.push(
      this.tableService.dataTable$.subscribe((data: any) => {
        // this.dataToDisplay.push(...data[`${this.tableService.url[route]}`]);
        // this.dataSource.setData(this.dataToDisplay);
        this.dataSource = data[`${this.tableService.url[route]}`]
        setTimeout(() => {
          if (this.tableService.queryParams?.Inicio === '0' && this.tableService.length > 0) {
            this.paginator.pageIndex = 0;
          }
          this.tableService.length = Number(data['Total_Registros']);
        }, 0);
      })
    );
  }

  public pageEve(event: PageEvent) {
    this.tableService.queryParams = {
      Inicio: `${event.pageIndex * 50}`,
      Fin: `${event.pageIndex * 50 + event.pageSize}`,
      Total: `${event.pageSize}`,
      Filtros: this._filterService.filters
    };
    this._getData();
  }

  public searcRefTable(button: ITab, element: any) {
    this.tableService.backOperations = true;
    this.tableService.idReference = element.Referencia;
    this._router.navigate(['/console', button.url]);
  }

  public openPopUp(element: any, functionality: string) {
    let dialogRef;
    if (element.Modal) {
      dialogRef = this.dialog.open(PopUpTableComponent, {
        data: { element, functionality, window: 'IBAN' }
      });
    } else {
      dialogRef = this.dialog.open(PopUpTableComponent, {
        data: { element, functionality, window: 'SCA' }
      });
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.managementService.postMethod('IBAN',
        { Reference: element.Referencia, IBAN: result }).subscribe(data => {
          if(functionality === 'release') {
            element.Estado = 'Liberando'
          } else {
            element.Estado = 'Reembolsando'
          }
        });
      }
    });
  }

  private _getData() {
    if (this.tableService.url) {
      this.tableService.getValues(this.tableService.queryParams);
    }
  }

  ngOnDestroy() {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }
}

// class TableDataSource extends DataSource<any> {
//   private _dataStream = new ReplaySubject<any[]>();
//   constructor(initialData: any[]) {
//     super();
//     this.setData(initialData);
//   }

//   connect(): Observable<any[]> {
//     return this._dataStream;
//   }

//   disconnect() { }

//   setData(data: any[]) {
//     this._dataStream.next(data);
//   }
// }
