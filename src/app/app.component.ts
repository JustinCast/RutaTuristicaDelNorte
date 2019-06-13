import { Component } from "@angular/core";
import { Enterprise } from "./models/Enterprise";
import { MainService } from './main.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ruta-turistica-del-norte";
  date: Date = new Date();
  constructor(public _main: MainService) {}
}
