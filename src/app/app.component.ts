import { Component } from '@angular/core';
import { DialogManagerService } from './services/dialog-manager.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ruta-turistica-del-norte';
  date: Date = new Date();
  navbarOpen = false;
  localStorage = localStorage;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }


  constructor(private _dialog: DialogManagerService, private _auth: AuthService) {}

  openLoginDialog() {
    this._dialog.openLoginDialog();
  }
}
