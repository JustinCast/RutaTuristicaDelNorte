import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from 'src/app/services/tour.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-tour',
  templateUrl: './edit-tour.component.html',
  styleUrls: ['./edit-tour.component.scss']
})
export class EditTourComponent implements OnInit {
  t: any;

  constructor(private _active: ActivatedRoute, private _tour: TourService) { }

  ngOnInit() {
    let id_tour = this._active.snapshot.paramMap.get("id_tour");
    if (id_tour)
      this._tour.getTour(Number(id_tour)).subscribe(
        tour => {
          this.t = tour;
          console.log(this.t);
        },
        (err: HttpErrorResponse) => this._tour.handleError(err)
      );
  }

  addPhone(phone) {
    this.t.phones.phones.unshift(phone);
  }

}
