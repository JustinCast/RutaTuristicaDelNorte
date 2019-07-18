import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RatesComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    return this.dialogRef.close();
  }

}
