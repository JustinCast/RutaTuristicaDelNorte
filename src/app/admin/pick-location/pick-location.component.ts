import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import LocationPicker from 'location-picker';

@Component({
  selector: 'app-pick-location',
  templateUrl: './pick-location.component.html',
  styleUrls: ['./pick-location.component.scss']
})
export class PickLocationComponent implements OnInit {
  lp: LocationPicker;
  constructor(
    public dialogRef: MatDialogRef<PickLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public location: any
  ){}

  ngOnInit(){
    if(!this.location)
      this.lp = new LocationPicker('map');
    else {
      this.lp = new LocationPicker('map', {
            lat: this.location.lat,
            lng: this.location.lng
          });
    }
  }
  
  setLocation() {
    this.dialogRef.close(this.lp.getMarkerPosition());
  }

}
