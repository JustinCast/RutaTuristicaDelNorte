import { Component } from '@angular/core';
import { DialogManagerService } from './services/dialog-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ruta-turistica-del-norte';
  date: Date = new Date();

  constructor(private _dialog: DialogManagerService) {}

  openLoginDialog() {
    this._dialog.openLoginDialog();
  }
}
