import { Component, OnInit } from "@angular/core";
import { Services } from "src/app/services/services.service";
import { CommonService } from "src/app/services/common.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-tours",
  templateUrl: "./tours.component.html",
  styleUrls: ["./tours.component.scss"]
})
export class ToursComponent implements OnInit {
  limit: number = 3;
  offset: number = 0;
  filter: string = "";
  imagesList = [];
  count: number;

  constructor(public _tours: Services, private _common: CommonService) {}

  ngOnInit() {
    if (!this._tours.tours) {
      this.getTableCountData(undefined, undefined);
    }
  }

  getTableCountData(columm: string, value: string) {
    this._tours.page = 1;
    this._tours.getServicesCount(columm, value).subscribe({
      next: count => {
        this.count = count;
        this._tours.tours = undefined;
        if (!this._tours.tours)
          this._tours.getServices(this.limit, this.offset, this.filter);
      },
      error: (err: HttpErrorResponse) => this._tours.handleError(err)
    });
  }

  pageChanged(event) {

    this._tours.page < event
    ? (this.offset += this.limit)
    : (this.offset -= this.limit);
    this._tours.page = event;

    this._tours.tours = undefined;
    this._tours.getServices(this.limit, this.offset, this.filter);
  }

  applyFilter() {
    this.getTableCountData("classification", this.filter);
    //this._tours.getServices(this.limit, this.offset, this.filter);
  }

  reset() {
    this.filter = "";
    //this.getTableCountData(undefined, undefined);
  }
}
