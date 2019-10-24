import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  classification: Array<string> = [
    "Servicio de Alimentación",
    "Artesanía",
    "Tour",
    "Servicio de hospedaje",
    "Guía turístico",
    "Actividades turísticas"
  ];
  ratesIcon: string = "priority_hight";
  locationIcon: string = "priority_hight";
  constructor(private _snackbar: MatSnackBar) { }

  public setImgsLazyLoading(imgs): Array<any> {
    let aux = [];
    imgs.forEach(img => {
      aux.unshift({ img: img, show: false });
    });
    return aux;
  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackbar.open(message, action, {
      duration: duration
    });
  }
}
