import { Component, OnInit, Inject } from "@angular/core";
import { Services } from "src/app/services/services.service";
import { HttpErrorResponse } from "@angular/common/http";
import { CommonService } from "src/app/services/common.service";
import LocationPicker from "location-picker";
import { ActivatedRoute } from "@angular/router";
import { DialogManagerService } from "src/app/services/dialog-manager.service";
import { Service } from "src/app/models/Service";

@Component({
  selector: "app-edit-service",
  templateUrl: "./edit-service.component.html",
  styleUrls: ["./edit-service.component.scss"]
})
export class EditServiceComponent implements OnInit {
  s: Service;
  map_code: string;
  l: LocationPicker;
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
        },
        (err: HttpErrorResponse) => this._service.handleError(err)
      );
  }

  onNoClick(): void {
    //return this.Ref.close();
  }

  editLocation() {
    this._dialog.openPickLocationDialog(this.s._location).subscribe({
      next: loc => {
        if(!loc)
          return;
        this.s._location = JSON.stringify(loc);
        this._service.openSnackBar("Edición exitosa", "Ok", 2500);
      },
      error: err =>
        this._service.openSnackBar(`Ha ocurrido un error: ${err}`, "Ok", 2500)
    });
  }

  onSubmit() {
    //return this.Ref.close(this.s);
  }
}
