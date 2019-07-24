import { Component, OnInit, OnChanges  } from "@angular/core";
import { Service } from "src/app/models/Service";
import { Services } from 'src/app/services/services.service';


@Component({
  selector: "app-tours",
  templateUrl: "./tours.component.html",
  styleUrls: ["./tours.component.scss"]
})
export class ToursComponent implements OnInit {
  p: number = 1;
  constructor(public _tours: Services) {}

  ngOnInit() {
    if (!this._tours.tours) this._tours.getServices();
  }
}
