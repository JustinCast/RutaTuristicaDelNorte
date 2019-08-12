import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DialogManagerService } from "src/app/services/dialog-manager.service";
import { Tour } from "src/app/models/Tour";
import { TourService } from "src/app/services/tour.service";

@Component({
  selector: "app-add-tour",
  templateUrl: "./add-tour.component.html",
  styleUrls: ["./add-tour.component.scss"]
})
export class AddTourComponent implements OnInit {
  tourFG: FormGroup;
  phones = { phones: [] };
  related: any; // servicio relacionado

  constructor(
    private _fb: FormBuilder,
    private _dialog: DialogManagerService,
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

  onSubmit() {
    let tour = new Tour(
      this.tourFG.get("name").value,
      this.tourFG.get("description").value,
      JSON.stringify(this.phones),
      this.tourFG.get("email").value,
      this.related !== undefined ? this.related.id : null
    );
    this._tour.saveTour(tour);
  }

  getRelated() {
    this._dialog.getRelated().subscribe(related => (this.related = related));
  }
}
