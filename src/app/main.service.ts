import { Injectable } from '@angular/core';
import { Enterprise } from './models/Enterprise';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public enterprises: Array<Enterprise> = [
    {
      id: 0,
      location: "Los Chiles",
      enterpriseName: "Transportes Pollera",
      activity: "Tours en lancha, Observación y pesca deportiva",
      ownerFullname: "Alejandro Argüello",
      resources: "3 lanchas",
      phone: "87221306",
      email: "main@mail.com"
    },
    {
      id: 1,
      location: "Los Chiles",
      enterpriseName: "Super Carnes del Norte",
      activity: "Carnicería",
      ownerFullname: "Belén Loría",
      resources: "1 local",
      phone: "24711559",
      email: "main@mail.com"
    },
    {
      id: 2,
      location: "Los Chiles",
      enterpriseName: "Hotel y Restaurante Tulipán",
      activity: "Hotel y restaurante",
      ownerFullname: "Antonio Flores",
      resources: "40 habitaciones - 72 camas - 90 pax",
      phone: "24711414",
      email: "main@mail.com"
    },

  ];
  constructor() { }
}
