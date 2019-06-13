import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = "ruta-turistica-del-norte";
  date: Date = new Date();
  constructor(public _main: MainService) {}

  ngOnInit() {
    
  }

}
