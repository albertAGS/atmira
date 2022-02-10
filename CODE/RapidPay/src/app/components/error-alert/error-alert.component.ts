import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})
export class ErrorAlertModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ErrorAlertModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    close(): void {
    this.dialogRef.close();
  }

}