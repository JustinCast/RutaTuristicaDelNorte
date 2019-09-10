import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  siteInfo: any;
  constructor(private _http: HttpClient) { }

  ngOnInit() {
  }

  getSiteInfo() {
    if(!this.siteInfo)
      this._http.get('http://localhost:4200/assets/site-info.json')
                 .subscribe(data => {this.siteInfo = data; console.log(data)});
  }

}
