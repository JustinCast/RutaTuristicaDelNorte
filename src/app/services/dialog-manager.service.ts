import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material";
import { PickLocationComponent } from '../admin/pick-location/pick-location.component';

@Injectable({
  providedIn: 'root'
})
export class DialogManagerService {

  constructor(private dialog: MatDialog) { }

  public openPickLocationDialog() {
    let dialogRef: MatDialogRef<PickLocationComponent>;
    console.log(window.innerHeight)
    dialogRef = this.dialog.open(PickLocationComponent, {
      width: `${window.innerWidth < 400 ? '90%' : '50%'}`,
      height: `${window.innerHeight <= 812 ? '55%' : '50%'}`,
      panelClass: "dialog"
    });
    return dialogRef.afterClosed();
  }
}
