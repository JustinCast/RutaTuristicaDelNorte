import { Injectable } from '@angular/core';
import { Service } from '../models/Service';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  public tours: Array<Service> = [
    /*{
      id: 0,
      location: "Los Chiles",
      name: "Hotel y Restaurante Tulipán",
      clasification: "Hotel y restaurante",
      additionalInfo: "40 habitaciones - 72 camas - 90 pax",
      phone: "24711414",
      email: "main@mail.com"
    },
    {
      id: 1,
      location: "Los Chiles",
      name: "Hotel y Restaurante Tulipán",
      clasification: "Hotel y restaurante",
      additionalInfo: "40 habitaciones - 72 camas - 90 pax",
      phone: "24711414",
      email: "main@mail.com"
    },
    {
      id: 2,
      location: "Los Chiles",
      name: "Hotel y Restaurante Tulipán",
      clasification: "Hotel y restaurante",
      additionalInfo: "40 habitaciones - 72 camas - 90 pax",
      phone: "24711414",
      email: "main@mail.com"
    },
    {
      id: 2,
      location: "Los Chiles",
      name: "Hotel y Restaurante Tulipán",
      clasification: "Hotel y restaurante",
      additionalInfo: "40 habitaciones - 72 camas - 90 pax",
      phone: "24711414",
      email: "main@mail.com"
    },
    {
      id: 3,
      location: "Los Chiles",
      name: "Hotel y Restaurante Tulipán",
      clasification: "Hotel y restaurante",
      additionalInfo: "40 habitaciones - 72 camas - 90 pax",
      phone: "24711414",
      email: "main@mail.com"
    },
    {
      id: 4,
      location: "Los Chiles",
      name: "Hotel y Restaurante Tulipán",
      clasification: "Hotel y restaurante",
      additionalInfo: "40 habitaciones - 72 camas - 90 pax",
      phone: "24711414",
      email: "main@mail.com"
    },
    {
      id: 5,
      location: "Los Chiles",
      name: "Hotel y Restaurante Tulipán",
      clasification: "Hotel y restaurante",
      additionalInfo: "40 habitaciones - 72 camas - 90 pax",
      phone: "24711414",
      email: "main@mail.com"
    },
    {
      id: 6,
      location: "Los Chiles",
      name: "Hotel y Restaurante Tulipán",
      clasification: "Hotel y restaurante",
      additionalInfo: "40 habitaciones - 72 camas - 90 pax",
      phone: "24711414",
      email: "main@mail.com"
    },*/

  ];
  constructor() { }
}
