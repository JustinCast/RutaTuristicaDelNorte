import { Component, OnInit, OnChanges, ViewEncapsulation } from "@angular/core";
import { Service } from "src/app/models/Service";
import { Services } from "src/app/services/services.service";
import { CommonService } from "src/app/services/common.service";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-tours",
  templateUrl: "./tours.component.html",
  styleUrls: ["./tours.component.scss"],
})
export class ToursComponent implements OnInit {
  limit: number = 0;
  offset: number = 0;
  filter: string = "";
  options: Array<number> = [];
  count: number = 0;
  imagesList = [];
  constructor(public _tours: Services, private _common: CommonService) {
  }

  ngOnInit() {
    this.getTableCountData(undefined, undefined);
  }

  getTableCountData(columm: string, value: string) {
    this._tours.getServicesCount(columm, value).subscribe({
      next: count => {
        this.count = count;
        this._tours.tours = undefined;
        this.setPaginatorOptions();
        if (!this._tours.tours) this._tours.getServices(this.limit, this.offset, this.filter);
      },
      error: (err: HttpErrorResponse) => this._tours.handleError(err)
    });
  }

  setPaginatorOptions() {
    this.options = [];
    if(this.count <= 10)
      this.limit = this.count;
    else if((this.count % 5) === 0 && this.count < 20) {
      this.limit = 5;
      this.options = [5]
    }
    else if((this.count % 10) === 0 && this.count > 20){
      this.count = 5;
      this.options = [5, 10];
    }
    else{
      this.limit = this.count;
      this.options = [this.count];
    }
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
