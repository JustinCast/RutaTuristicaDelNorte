import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DialogManagerService } from "src/app/services/dialog-manager.service";
import { Tour } from "src/app/models/Tour";
import { TourService } from "src/app/services/tour.service";
import { environment } from "src/environments/environment";
import { User } from "src/app/models/User";
import { Rates } from "src/app/models/Rates";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-add-tour",
  templateUrl: "./add-tour.component.html",
  styleUrls: ["./add-tour.component.scss"],
})
export class AddTourComponent implements OnInit {
  tourFG: FormGroup;
  phones = { phones: [] };
  related: any = null; // servicio relacionado

  // Download URL
  downloadURLS: Array<string> = [];

  rates: Rates = new Rates("Campo 1", "Campo 2");
  ratesIcon: string;

  serviceName: string;

  constructor(
    private _fb: FormBuilder,
    private _tour: TourService,
    private _dialog: DialogManagerService
  ) {
    this.tourFG = this._fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      phone: [""],
      email: ["", Validators.required],
    });
  }

  ngOnInit() {}

  addPhone(phone) {
    this.phones.phones.unshift(phone);
  }

  catchUploadedImages(downloadURLS) {
    if (downloadURLS) this.downloadURLS.push(downloadURLS);
  }

  catchSelectedServiceToLink(id_service) {
    this.related = id_service;
    this.serviceName = this.related.name;
  }

  onSubmit() {
    let tour = new Tour(
      this.tourFG.get("name").value,
      this.tourFG.get("description").value,
      JSON.stringify(this.phones),
      this.downloadURLS,
      this.tourFG.get("email").value,
      (JSON.parse(
        localStorage.getItem(`${environment.localstorage_key}`)
      ) as User).id,
      this.related !== null ? this.related.id : null,
      undefined,
      this.rates
    );
    this._tour.saveTour(tour).subscribe(
      () => {
        this._tour.openSnackBar("Tour guardado con éxito", "Ok", 2500);
        this.tourFG.reset();
        this.downloadURLS = [];
        this.phones = { phones: [] };
        this.rates = new Rates("Campo 1", "Campo 2");
      },
      (err: HttpErrorResponse) => this._tour.handleError(err)
    );
  }

  /**
   * Open the Rates Dialog wich returns set rates in a 'Rates' model format
   */
  addRates() {
    this._dialog.openRatesDialog(this.rates).subscribe((rates: Rates) => {
      console.log(rates);
      if (rates) {
        this.rates = rates;
        this.ratesIcon = "check";
      }
    });
  }

  deleteRelatedService() {
    this.related = null;
    this.serviceName = undefined;
  }
}
