import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';




@Component({
  selector: 'LoginErrorDialogComponenet',
  templateUrl: './loginErrorDialog.html'
})
export class LoginErrorDialogComponenet {
  message: string = ""
  errorText = "Error"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<LoginErrorDialogComponenet>) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.errorText = data.buttonText.cancel || this.errorText;
      }
    }
    this.dialogRef.updateSize('300vw','300vw')
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}