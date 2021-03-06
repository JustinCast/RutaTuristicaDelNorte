import { Component, OnInit, Inject } from "@angular/core";
import { Services } from "src/app/services/services.service";
import { HttpErrorResponse } from "@angular/common/http";
import { CommonService } from "src/app/services/common.service";
import LocationPicker from "location-picker";
import { ActivatedRoute } from "@angular/router";
import { DialogManagerService } from "src/app/services/dialog-manager.service";
import { Rates } from "src/app/models/Rates";

@Component({
  selector: "app-edit-service",
  templateUrl: "./edit-service.component.html",
  styleUrls: ["./edit-service.component.scss"],
})
export class EditServiceComponent implements OnInit {
  s: any;
  map_code: string;
  l: LocationPicker;
  serviceImages: Array<any>;
  addedImages: Array<any>;
  r: Rates;
  constructor(
    private _active: ActivatedRoute,
    private _service: Services,
    private _common: CommonService,
    private _dialog: DialogManagerService
  ) {}

  ngOnInit() {
    let id_service = this._active.snapshot.paramMap.get("id_service");
    if (id_service)
      this._service.getService(Number(id_service)).subscribe(
        service => {
          this.s = service;
          this.r = new Rates(
            this.s.header1 === null ? "Campo 1" : this.s.header1,
            this.s.header2 === null ? "Campo 2" : this.s.header2,
            this.s.values === null ? undefined : this.s.values,
            this.s.observations === null ? undefined : this.s.observations,
          );
          this.getServiceImages();
        },
        (err: HttpErrorResponse) => this._service.handleError(err)
      );
  }

  addPhone(phone) {
    this.s._phones.phones.unshift(phone);
  }

  catchUploadedImages(url) {
    this.addedImages = [];
    if (url) {
      this.addedImages.push({ id: undefined, url: url });
      this.serviceImages.push({ id: undefined, url: url });
    }
  }

  getServiceImages() {
    this._service
      .getServiceImages(
        Number(this._active.snapshot.paramMap.get("id_service"))
      )
      .subscribe({
        next: images => {
          this.serviceImages = images;
        },
        error: err => this._service.handleError(err),
      });
  }

  openImagesDialog() {
    this._dialog.openImagesDialog(
      this.serviceImages.map(i => (i = i.url)),
      "service"
    );
  }

  editLocation() {
    this._dialog.openPickLocationDialog(this.s._location).subscribe({
      next: loc => {
        if (!loc) return;
        this.s._location = JSON.stringify(loc);
        this._service.openSnackBar("Edición exitosa", "Ok", 2500);
      },
      error: err =>
        this._service.openSnackBar(`Ha ocurrido un error: ${err}`, "Ok", 2500),
    });
  }

  onSubmit() {
    if (this.addedImages) this.s.imgs = this.addedImages.map(i => (i = i.url));
    this.s.rates = this.r;
    this._service.updateService(this.s);
  }

  manageRates() {
    this._dialog.openRatesDialog(this.r).subscribe((rates: Rates) => {
      if (rates) {
        this.r = rates;
      }
    });
  }
}
