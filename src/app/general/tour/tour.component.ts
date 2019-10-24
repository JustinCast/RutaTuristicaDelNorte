import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tour } from 'src/app/models/Tour';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  data: any;
  constructor(
    public dialogRef: MatDialogRef<TourComponent>,
    @Inject(MAT_DIALOG_DATA) public tour: Tour
  ) { }

  ngOnInit() {
    console.log(this.tour);
    this.data = {images: this.tour.imgs, table: "tour"}
  }

}
