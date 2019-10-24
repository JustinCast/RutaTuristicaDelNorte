import { Component, OnInit, Inject } from '@angular/core';
import LocationPicker from 'location-picker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-see-location',
  templateUrl: './see-location.component.html',
  styleUrls: ['./see-location.component.scss']
})
export class SeeLocationComponent implements OnInit {

  lp: LocationPicker;
  constructor(
    public dialogRef: MatDialogRef<SeeLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.lp = new LocationPicker("see-loc", {
      lat: this.data.location.lat,
      lng: this.data.location.lng
    });
  }

  editLoc() {
    this.dialogRef.close(this.lp.getMarkerPosition());
  }

}
