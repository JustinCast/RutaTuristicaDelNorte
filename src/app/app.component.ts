import { Component, OnInit } from '@angular/core';
import { DialogManagerService } from './services/dialog-manager.service';
import { AuthService } from './services/auth.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ruta-turistica-del-norte';
  date: Date = new Date();
  navbarOpen = false;
  localStorage = localStorage;
  loggedUser: User;

  ngOnInit() {
    this.loggedUser = JSON.parse(this.localStorage.getItem('loggedUser'));
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }


  constructor(private _dialog: DialogManagerService, private _auth: AuthService) {}

  openLoginDialog() {
    this._dialog.openLoginDialog();
  }
}
