import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ErrorAlertService {
  constructor(private matDialog: MatDialog) { }


  openErrorMessage() {

  }
}