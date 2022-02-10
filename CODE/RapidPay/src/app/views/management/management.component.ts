import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardService } from 'src/app/components/card/card.service';
import { FilterService } from 'src/app/components/filter/filter.service';
import { AuthService } from './auth/auth.service';
import { DeleteUserComponent } from './views/delete-user/delete-user.component';
import { LogOutComponent } from './views/log-out/log-out.component';
import { NewUserComponent } from './views/new-user/new-user.component';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent {

  constructor(
    private filterService: FilterService,
    private cardService: CardService,
    private dialog: MatDialog,
    private router: Router,
    public auth: AuthService,
  ) {
    this.filterService.getFiltersValues('GetMasters')
    this.cardService.getCardsValues('ConsoleStats')
  }

  public logout() {
    const dialogRef = this.dialog.open(LogOutComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterService.dataFilter = null;
        this.cardService.cardInfo = null;
        this.router.navigate(['console']);
      }
    });
  }


  public newUser() {
    const dialogRef = this.dialog.open(NewUserComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }
  public deleteUser() {
    const dialogRef = this.dialog.open(DeleteUserComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

}
