import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TourService } from "src/app/services/tour.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { Services } from "src/app/services/services.service";
import { startWith, map } from "rxjs/operators";
import { DialogManagerService } from "src/app/services/dialog-manager.service";
import { Rates } from "src/app/models/Rates";

@Component({
  selector: "app-edit-tour",
  templateUrl: "./edit-tour.component.html",
  styleUrls: ["./edit-tour.component.scss"],
})
export class EditTourComponent implements OnInit {
  t: any;
  tourImages: Array<any>;
  addedImages: Array<any>;
  r: Rates;
  id_tour: number;
  constructor(
    private _active: ActivatedRoute,
    private _tour: TourService,
    private _service: Services,
    private _dialog: DialogManagerService
  ) {}

  ngOnInit() {
    this.id_tour = Number(this._active.snapshot.paramMap.get("id_tour"));
    if (this.id_tour)
      this._tour.getTour(this.id_tour).subscribe(
        tour => {
          this.t = tour;
          this.r = new Rates(
            this.t.header1 === null ? "Campo 1" : this.t.header1,
            this.t.header2 === null ? "Campo 2" : this.t.header2,
            this.t.values === null ? undefined : this.t.values,
            this.t.observations === null ? undefined : this.t.observations
          );
          this.getTourImages();
        },
        (err: HttpErrorResponse) => this._tour.handleError(err)
      );
  }

  getTourImages() {
    this._tour.getTourImages(this.t.id).subscribe({
      next: images => (this.tourImages = images),
      error: err => this._tour.handleError(err),
    });
  }

  catchUploadedImages(url) {
    this.addedImages = [];
    if (url) {
      this.addedImages.push({ id: undefined, url: url });
      this.tourImages.push({ id: undefined, url: url });
    }
  }

  catchSelectedServiceToLink(related) {
    this.t.related_service = related.id;
    this.t.service_name = related.name;
  }

  openImagesDialog() {
    this._dialog.openImagesDialog(
      this.tourImages.map(i => (i = i.url)),
      "tour"
    );
  }

  addPhone(phone) {
    this.t.phones.phones.unshift(phone);
  }

  onSubmit() {
    if (this.addedImages) this.t.imgs = this.addedImages.map(i => (i = i.url));
    this.t.rates = this.r;
    this._tour.updateTour(this.t).subscribe({
      next: () =>
        this._tour.openSnackBar("Tour actualizado con éxito", "Ok", 2500),
      error: err => this._tour.handleError(err),
    });
  }

  manageRates() {
    this._dialog.openRatesDialog(this.r).subscribe((rates: Rates) => {
      if (rates) {
        this.r = rates;
      }
    });
  }

  deleteRates() {
    console.log(this.id_tour);
    this._tour.deleteRates(this.id_tour)
    .subscribe({
      next: () => {
        this.r.items = [];
        this._tour.openSnackBar('Tarifas eliminadas con éxito', 'Ok', 2500);
      },
      error: (err: HttpErrorResponse) => this._tour.handleError(err)
    })
  }

  deleteRelatedService() {
    this._tour.deleteRelatedService().subscribe({
      next: () => {
        this._tour.openSnackBar("Servicio relacionado eliminado", "Ok", 2000);
        this.t.related_service = undefined;
        this.t.service_name = undefined;
      },
      error: (err: HttpErrorResponse) => this._tour.handleError(err),
    });
  }
}
