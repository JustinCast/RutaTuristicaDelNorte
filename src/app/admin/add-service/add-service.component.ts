import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { DialogManagerService } from "src/app/services/dialog-manager.service";
import { Service } from "src/app/models/Service";
import { Services } from "src/app/services/services.service";
import { Rates } from 'src/app/models/Rates';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: "app-add-service",
  templateUrl: "./add-service.component.html",
  styleUrls: ["./add-service.component.scss"]
})
export class AddServiceComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  classification: Array<string>;
  addServiceFG: FormGroup;

  // Download URL
  downloadURLS: Array<string> = [];

  location: JSON;
  locationIcon: string;

  rates: Rates;
  ratesIcon: string;
  phones = { phones: [] };

  constructor(
    private _fb: FormBuilder,
    private _dialog: DialogManagerService,
    private _tour: Services,
    private _common: CommonService
  ) {
    this.addServiceFG = this._fb.group({
      name: ["", Validators.required],
      classification: ["", Validators.required],
      additional_info: ["", Validators.required],
      phone: [""],
      email: ["", Validators.required],
      website: [""]
    });
  }

  openShowImages() {
    this._dialog.openImagesDialog([]);
  }

  ngOnInit() {
    this.classification = this._common.classification;
    this.locationIcon = this._common.locationIcon;
    this.ratesIcon = this._common.ratesIcon
  }

  addPhone(phone) {
    this.phones.phones.unshift(phone);
  }

  catchUploadedImages(downloadURLS) {
    if(downloadURLS)
      this.downloadURLS.push(downloadURLS);
  }

  onSubmit() {
    this.subscription = this._tour
      .saveService(
        new Service(
          JSON.stringify(this.location),
          this.addServiceFG.get("name").value,
          this.addServiceFG.get("classification").value,
          this.addServiceFG.get("additional_info").value,
          this.addServiceFG.get("email").value,
          this.addServiceFG.get("website").value,
          JSON.stringify(this.phones),
          this.downloadURLS,
          this.rates,
          undefined
        )
      )
      .subscribe(() => {
        this._tour.openSnackBar("Servicio guardado correctamente", "Ok", 2500);
      });
  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  pickLocation() {
    this._dialog.openPickLocationDialog(undefined).subscribe(location => {
      this.location = location;
      this.locationIcon = "check";
    });
  }

  /**
   * Open the Rates Dialog wich returns set rates in a 'Rates' model format
   */
  addRates() {
    this._dialog.openRatesDialog().subscribe((rates: Rates) => {
      this.rates = rates;
      this.ratesIcon = "check";
    });
  }
}
