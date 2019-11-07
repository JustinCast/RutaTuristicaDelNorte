import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DialogManagerService } from "src/app/services/dialog-manager.service";
import { Tour } from "src/app/models/Tour";
import { TourService } from "src/app/services/tour.service";
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/User';

@Component({
  selector: "app-add-tour",
  templateUrl: "./add-tour.component.html",
  styleUrls: ["./add-tour.component.scss"]
})
export class AddTourComponent implements OnInit {
  tourFG: FormGroup;
  phones = { phones: [] };
  related: any = null; // servicio relacionado
  
  // Download URL
  downloadURLS: Array<string> = [];

  constructor(
    private _fb: FormBuilder,
    private _tour: TourService
  ) {
    this.tourFG = this._fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      phone: [""],
      email: ["", Validators.required]
    });
  }

  ngOnInit() {}

  addPhone(phone) {
    this.phones.phones.unshift(phone);
  }

  catchUploadedImages(downloadURLS) {
    if(downloadURLS)
      this.downloadURLS.push(downloadURLS);
  }

  catchSelectedServiceToLink(id_service) {
    this.related = id_service;
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
      this.related !== null ? this.related.id : null
    );
    this._tour.saveTour(tour);
  }
}
