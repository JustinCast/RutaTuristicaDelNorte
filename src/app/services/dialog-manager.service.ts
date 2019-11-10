import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { PickLocationComponent } from "../admin/pick-location/pick-location.component";
import { ShowImagesComponent } from "../admin/add-service/show-images/show-images.component";
import { SeeLocationComponent } from "../general/see-location/see-location.component";
import { RatesComponent } from "../admin/rates/rates.component";
import { LoginDialogComponent } from "../admin/login-dialog/login-dialog.component";
import { Observable } from "rxjs";
import { Rates } from "../models/Rates";
import { Service } from "../models/Service";
import { Tour } from "../models/Tour";
import { TourComponent } from "../general/tour/tour.component";

@Injectable({
  providedIn: "root",
})
export class DialogManagerService {
  constructor(private dialog: MatDialog) {}

  public openPickLocationDialog(value: string): Observable<any> {
    let dialogRef: MatDialogRef<PickLocationComponent>;
    dialogRef = this.dialog.open(PickLocationComponent, {
      width: `${window.innerWidth < 400 ? "90%" : "50%"}`,
      height: `${window.innerHeight <= 812 ? "55%" : "50%"}`,
      panelClass: "dialog",
      data: value !== undefined ? JSON.parse(value) : null,
    });
    return dialogRef.afterClosed();
  }

  public showTourInfo(tour: Tour) {
    let dialogRef: MatDialogRef<TourComponent>;
    dialogRef = this.dialog.open(TourComponent, {
      panelClass: "custom-dialog",
      data: tour,
    });
    return dialogRef.afterClosed();
  }

  public openImagesDialog(
    images: Array<string>,
    tablename: string
  ): Observable<Array<string>> {
    let dialogRef: MatDialogRef<ShowImagesComponent>;
    dialogRef = this.dialog.open(ShowImagesComponent, {
      width: `${window.innerWidth < 400 ? "90%" : "75%"}`,
      height: `${window.innerHeight <= 812 ? "70%" : "70%"}`,
      data: { images: images, table: tablename },
      panelClass: "dialog",
    });
    return dialogRef.afterClosed();
  }

  public showTourLocation(location: any, edit: boolean) {
    this.dialog
      .open(SeeLocationComponent, {
        width: "90%",
        height: "70%",
        panelClass: "dialog",
        data: {
          location: location,
          edit: edit,
        },
      })
      .afterClosed();
  }

  public openRatesDialog(rates: Rates): Observable<Rates> {
    return this.dialog
      .open(RatesComponent, {
        width: `${window.innerWidth < 400 ? "99.99%" : "99.99%"}`,
        height: `${window.innerHeight <= 812 ? "95%" : "80%"}`,
        panelClass: "custom-dialog",
        data: { rates: rates },
      })
      .afterClosed();
  }

  public openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {}).afterClosed();
  }
}
