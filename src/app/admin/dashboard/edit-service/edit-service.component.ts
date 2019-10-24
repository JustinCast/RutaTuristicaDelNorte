import { Component, OnInit, Inject } from "@angular/core";
import { Services } from "src/app/services/services.service";
import { HttpErrorResponse } from "@angular/common/http";
import { CommonService } from "src/app/services/common.service";
import LocationPicker from "location-picker";
import { ActivatedRoute } from "@angular/router";
import { DialogManagerService } from "src/app/services/dialog-manager.service";
import { Service } from "src/app/models/Service";
import { nextTick } from "q";

@Component({
  selector: "app-edit-service",
  templateUrl: "./edit-service.component.html",
  styleUrls: ["./edit-service.component.scss"]
})
export class EditServiceComponent implements OnInit {
  s: any;
  map_code: string;
  l: LocationPicker;
  serviceImages: Array<any>;
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
          console.log(this.s);
          this.getServiceImages();
        },
        (err: HttpErrorResponse) => this._service.handleError(err)
      );
  }

  addPhone(phone) {
    this.s.phones.phones.unshift(phone);
  }

  getServiceImages() {
    this._service.getServiceImages(this.s.id).subscribe({
      next: images => {
        this.serviceImages = images;
        console.log(this.serviceImages);
      },
      error: err => this._service.handleError(err)
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
        this._service.openSnackBar(`Ha ocurrido un error: ${err}`, "Ok", 2500)
    });
  }

  onSubmit() {
    this._service.updateService(this.s);
  }
}
