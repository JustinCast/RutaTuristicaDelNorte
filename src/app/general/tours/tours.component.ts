import { Component, OnInit, OnChanges } from "@angular/core";
import { Service } from "src/app/models/Service";
import { Services } from "src/app/services/services.service";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-tours",
  templateUrl: "./tours.component.html",
  styleUrls: ["./tours.component.scss"]
})
export class ToursComponent implements OnInit {
  p: number = 1;
  filter: string = "";
  constructor(public _tours: Services, private _common: CommonService) {}

  ngOnInit() {
    //:TODO recordar primero llamar a tabla para el conteo de total e ítemenes por página 
    if (!this._tours.tours) this._tours.getServices(this.filter);
    else if(this.filter.length === 0) this._tours.getServices(this.filter);
    else {
      switch (this.filter) {
        case this._common.classification[0]: // "Servicio de Alimentación"
          
          break;
      
        default:
          break;
      }
    }
  }
}
