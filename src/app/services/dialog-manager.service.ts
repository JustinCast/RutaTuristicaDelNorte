import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material";
import { PickLocationComponent } from '../admin/pick-location/pick-location.component';
import { ShowImagesComponent } from '../admin/add-service/show-images/show-images.component';
import { SeeLocationComponent } from '../general/see-location/see-location.component';
import { RatesComponent } from '../admin/rates/rates.component';
import { LoginDialogComponent } from '../admin/login-dialog/login-dialog.component';

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

  public openImagesDialog(images: Array<string>) {
    let dialogRef: MatDialogRef<ShowImagesComponent>;
    console.log(window.innerHeight)
    dialogRef = this.dialog.open(ShowImagesComponent, {
      width: `${window.innerWidth < 400 ? '90%' : '50%'}`,
      height: `${window.innerHeight <= 812 ? '65%' : '60%'}`,
      data: images,
      panelClass: "dialog"
    });
    return dialogRef.afterClosed();
  }

  public showTourLocation(location: any, edit: boolean) {
    return this.dialog
      .open(SeeLocationComponent, {
        width: "90%",
        height: "70%",
        panelClass: "dialog",
        data: {
          location: location,
          edit: edit
        }
      })
      .afterClosed();
  }

  public openRatesDialog() {
    return this.dialog
      .open(RatesComponent, {
        width: "90%",
        height: "70%",
        panelClass: "dialog",
      })
      .afterClosed();
  }

  public openLoginDialog() {
    return this.dialog
      .open(LoginDialogComponent, {
        width: `${window.innerWidth < 400 ? '90%' : '30%'}`,
      height: `${window.innerHeight <= 812 ? '55%' : '40%'}`,
        panelClass: "dialog",
      })
      .afterClosed();
  }
}
