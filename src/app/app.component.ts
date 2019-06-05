import { Component } from "@angular/core";
import { Enterprise } from "./models/Enterprise";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ruta-turistica-del-norte";
  public enterprises: Array<Enterprise> = [
    {
      location: "Los Chiles",
      enterpriseName: "Transportes Pollera",
      activity: "Tours en lancha, Observación y pesca deportiva",
      ownerFullname: "Alejandro Argüello",
      resources: "3 lanchas",
      phone: "87221306"
    },
    {
      location: "Los Chiles",
      enterpriseName: "Super Carnes del Norte",
      activity: "Carnicería",
      ownerFullname: "Belén Loría",
      resources: "1 local",
      phone: "24711559"
    },
    {
      location: "Los Chiles",
      enterpriseName: "Hotel y Restaurante Tulipán",
      activity: "Hotel y restaurante",
      ownerFullname: "Antonio Flores",
      resources: "40 habitaciones - 72 camas - 90 pax",
      phone: "24711414"
    },

  ];
}
