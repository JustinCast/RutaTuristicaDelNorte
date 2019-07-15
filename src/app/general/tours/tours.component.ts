import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/Service';
import { ToursService } from 'src/app/services/tours.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {
  p: number = 1;
  constructor(public _tours: ToursService) { }

  ngOnInit() {
    this._tours.getServices();
  }

}
