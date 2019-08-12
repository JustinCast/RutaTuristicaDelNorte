import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import LocationPicker from 'location-picker';

@Component({
  selector: 'app-pick-location',
  templateUrl: './pick-location.component.html',
  styleUrls: ['./pick-location.component.scss']
})
export class PickLocationComponent implements OnInit {
  lp: LocationPicker;
  constructor(public dialogRef: MatDialogRef<PickLocationComponent>){}

  ngOnInit(){
    this.lp = new LocationPicker('map');
  }
  
  setLocation() {
    this.dialogRef.close(this.lp.getMarkerPosition());
  }

}
