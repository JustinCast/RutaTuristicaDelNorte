import { Component, OnInit } from "@angular/core";
import { Services } from "src/app/services/services.service";
import { CommonService } from "src/app/services/common.service";
import { HttpErrorResponse } from "@angular/common/http";
import { TourService } from "src/app/services/tour.service";
import { Tour } from "src/app/models/Tour";
import { DialogManagerService } from 'src/app/services/dialog-manager.service';

@Component({
  selector: "app-tours",
  templateUrl: "./touristic-offer.component.html",
  styleUrls: ["./touristic-offer.component.scss"]
})
export class TouristicOfferComponent implements OnInit {
  filter: string = "";
  imagesList = [];
  tours: Array<Tour>;

  constructor(
    public _service: Services,
    public _common: CommonService,
    public _tour: TourService,
    public _dialog: DialogManagerService
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
        this._service.count = count;
        this._service.services = undefined;
        if (!this._service.services)
          this._service.getServices(this._service.limit, this._service.offset, this.filter);
      },
      error: (err: HttpErrorResponse) => this._service.handleError(err)
    });
  }

  getTours() {
    this._tour.getTours(this._tour.limit, this._tour.toursOffset).subscribe({
      next: tours => {
        this.tours = tours;
        this._tour.setLazyLoading(this.tours);
        this._tour.getTableToursCount();
      },
      error: (err: HttpErrorResponse) => this._tour.handleError(err)
    });
  }

  pageChanged(event) {
    this._service.page < event
      ? (this._service.offset += this._service.limit)
      : (this._service.offset -= this._service.limit);
    this._service.page = event;

    this._service.services = undefined;
    this._service.getServices(this._service.limit, this._service.offset, this.filter);
  }


  toursPageChanged(event) {
    this._tour.toursPage < event
      ? (this._tour.toursOffset += this._tour.limit)
      : (this._tour.toursOffset -= this._tour.limit);

    this._tour.toursPage = event;
    this.tours = undefined;
    this.getTours();
  }

  applyFilter() {
    this.getTableCountData("classification", this.filter);
  }

  reset() {
    this.filter = "";
    this.getTableCountData(undefined, undefined);
  }

  openTourInfo(i: number) {
    this._dialog.showTourInfo(this.tours[i])
  }
}
