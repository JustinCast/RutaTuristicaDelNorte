import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { PickLocationComponent } from "../admin/pick-location/pick-location.component";
import { ShowImagesComponent } from "../admin/add-service/show-images/show-images.component";
import { SeeLocationComponent } from "../general/see-location/see-location.component";
import { RatesComponent } from "../admin/rates/rates.component";
import { LoginDialogComponent } from "../admin/login-dialog/login-dialog.component";
import { Observable } from "rxjs";
import { Rates } from "../models/Rates";
import { SearchRelatedComponent } from "../admin/search-related/search-related.component";
import { Service } from '../models/Service';

@Injectable({
  providedIn: "root"
})
export class DialogManagerService {
  constructor(private dialog: MatDialog) {}

  public openPickLocationDialog(value: string): Observable<any> {
    let dialogRef: MatDialogRef<PickLocationComponent>;
    dialogRef = this.dialog.open(PickLocationComponent, {
      width: `${window.innerWidth < 400 ? "90%" : "50%"}`,
      height: `${window.innerHeight <= 812 ? "55%" : "50%"}`,
      panelClass: "dialog",
      data: value !== undefined ? JSON.parse(value) : null
    });
    return dialogRef.afterClosed();
  }

  public openImagesDialog(images: Array<string>): Observable<Array<string>> {
    let dialogRef: MatDialogRef<ShowImagesComponent>;
    dialogRef = this.dialog.open(ShowImagesComponent, {
      width: `${window.innerWidth < 400 ? "90%" : "75%"}`,
      height: `${window.innerHeight <= 812 ? "65%" : "70%"}`,
      data: images,
      panelClass: "dialog"
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
          edit: edit
        }
      })
      .afterClosed();
  }

  public openRatesDialog(): Observable<Rates> {
    return this.dialog
      .open(RatesComponent, {
        width: `${window.innerWidth < 400 ? "99.99%" : "99.99%"}`,
        height: `${window.innerHeight <= 812 ? "95%" : "80%"}`,
        panelClass: "dialog"
      })
      .afterClosed();
  }

  public getRelated(): Observable<number> {
    return this.dialog
      .open(SearchRelatedComponent, {
        width: `${window.innerWidth < 400 ? "95%" : "95%"}`,
        height: `${window.innerHeight <= 812 ? "50%" : "80%"}`,
        panelClass: "dialog"
      })
      .afterClosed();
  }

  public openLoginDialog() {
    this.dialog
      .open(LoginDialogComponent, {
        width: `${window.innerWidth < 400 ? "90%" : "30%"}`,
        height: `${window.innerHeight <= 812 ? "55%" : "40%"}`,
        panelClass: "dialog"
      })
      .afterClosed();
  }
}
