import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Tour } from "src/app/models/Tour";
import { TourService } from "src/app/services/tour.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Rates } from "src/app/models/Rates";
@Component({
  selector: "app-tour",
  templateUrl: "./tour.component.html",
  styleUrls: ["./tour.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TourComponent implements OnInit {
  data: any;
  rates: Rates;
  constructor(
    public dialogRef: MatDialogRef<TourComponent>,
    @Inject(MAT_DIALOG_DATA) public tour: Tour,
    private _tour: TourService
  ) {}

  ngOnInit() {
    this.data = { images: this.tour._imgs_lazy, table: "tour" };
    this.getTourAdditionalInfo();
  }

  getTourAdditionalInfo() {
    this._tour.getTourAdditionalInfo((this.tour as any)._id).subscribe({
      next: result => {
        this.tour.email = result.email;
        this.tour.phones = result.phones;
        this.rates = new Rates(
          result.header1 !== null ? result.header1 : undefined,
          result.header2 !== null ? result.header2 : undefined,
          result.values !== null ? result.values : undefined,
          result.observations !== null ? result.observations : undefined
        );
      },
      error: (err: HttpErrorResponse) => this._tour.handleError(err),
    });
  }
}
