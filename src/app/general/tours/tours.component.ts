import { Component, OnInit, OnChanges } from "@angular/core";
import { Service } from "src/app/models/Service";
import { Services } from "src/app/services/services.service";
import { CommonService } from "src/app/services/common.service";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-tours",
  templateUrl: "./tours.component.html",
  styleUrls: ["./tours.component.scss"]
})
export class ToursComponent implements OnInit {
  limit: number = 0;
  offset: number = 0;
  filter: string = "";
  options: Array<number> = [];
  count: number = 0;
  imagesList = [];
  constructor(public _tours: Services, private _common: CommonService) {
    for (let i = 0; i < 50; i++) {
      const url = 'https://loremflickr.com/640/480?random=' + (i +1);
      this.imagesList[i] = {
        url: url,
        show: false
    };
  }
  }

  ngOnInit() {
    //:TODO recordar primero llamar a tabla para el conteo de total e ítemenes por página 
    this._tours.getServicesCount().subscribe({
      next: count => {
        this.count = count;
        this.setPaginatorOptions();
        if (!this._tours.tours) this._tours.getServices(this.limit, this.offset, this.filter);
      },
      error: (err: HttpErrorResponse) => this._tours.handleError(err)
    });

    //if (!this._tours.tours) this._tours.getServices(this.limit, this.offset, this.filter);
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
    this._tours.getServices(this.limit, this.offset, this.filter);
  }
}
