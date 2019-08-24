import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  classification: Array<string> = [
    "Servicio de Alimentación",
    "Artesanía",
    "Servicio de hospedaje",
    "Guía turístico",
    "Actividades turísticas"
  ];
  ratesIcon: string = "priority_hight";
  locationIcon: string = "priority_hight";
  constructor() { }
}
