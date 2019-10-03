import { Component, OnInit } from "@angular/core";
import { Services } from "src/app/services/services.service";
import { CommonService } from "src/app/services/common.service";
import { HttpErrorResponse } from "@angular/common/http";
import { TourService } from "src/app/services/tour.service";
import { Tour } from "src/app/models/Tour";

@Component({
  selector: "app-tours",
  templateUrl: "./touristic-offer.component.html",
  styleUrls: ["./touristic-offer.component.scss"]
})
export class TouristicOfferComponent implements OnInit {
  limit: number = 6;
  offset: number = 0;
  toursOffset: number = 0;
  toursPage: number = 1;
  filter: string = "";
  imagesList = [];
  count: number;
  tours: Array<Tour>;

  constructor(
    public _service: Services,
    private _common: CommonService,
    private _tour: TourService
  ) {}

  ngOnInit() {
    if (!this._service.services) {
      this.getTableCountData(undefined, undefined);
    }

    if (!this.tours) this.getTours();
  }

  getTableCountData(columm: string, value: string) {
    this._service.page = 1;
    this._service.getServicesCount(columm, value).subscribe({
      next: count => {
        this.count = count;
        this._service.services = undefined;
        if (!this._service.services)
          this._service.getServices(this.limit, this.offset, this.filter);
      },
      error: (err: HttpErrorResponse) => this._service.handleError(err)
    });
  }

  getTours() {
    this._tour.getTours(this.limit, this.toursOffset).subscribe({
      next: tours => {
        this.tours = tours;
        console.log(this.tours);
        this._tour.setLazyLoading(this.tours);
      },
      error: (err: HttpErrorResponse) => this._tour.handleError(err)
    });
  }

  pageChanged(event) {
    this._service.page < event
      ? (this.offset += this.limit)
      : (this.offset -= this.limit);
    this._service.page = event;

    this._service.services = undefined;
    this._service.getServices(this.limit, this.offset, this.filter);
  }

  toursPageChanged(event) {
    this.toursPage < event
      ? (this.toursOffset += this.limit)
      : (this.toursOffset -= this.limit);

    this.toursPage = event;
    this.tours = undefined;
    this.getTours();
  }

  applyFilter() {
    this.getTableCountData("classification", this.filter);
    //this._tours.getServices(this.limit, this.offset, this.filter);
  }

  reset() {
    this.filter = "";
    this.getTableCountData(undefined, undefined);
  }
}
