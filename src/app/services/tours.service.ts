import { Injectable } from '@angular/core';
import { Service } from '../models/Service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  public tours: Array<Service> = [];
  constructor(private _http: HttpClient) { }
}
