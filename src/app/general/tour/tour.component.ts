import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tour } from 'src/app/models/Tour';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class TourComponent implements OnInit {
  data: any;
  constructor(
    public dialogRef: MatDialogRef<TourComponent>,
    @Inject(MAT_DIALOG_DATA) public tour: Tour
  ) { }

  ngOnInit() {
    this.data = {images: this.tour._imgs_lazy, table: "tour"}
  }

}
