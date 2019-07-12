import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrls: ['./show-images.component.scss']
})
export class ShowImagesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public images: Array<string>) { }

  ngOnInit() {
  }

}
