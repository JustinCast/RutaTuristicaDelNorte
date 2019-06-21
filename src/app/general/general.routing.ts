import { Routes } from "@angular/router";
import { GeneralRootComponent } from './general-root.component';
import { HistoryComponent } from './history/history.component';

export const ROUTES: Routes = [
  {
    path: 'general', component: GeneralRootComponent, children: [
      {path: 'history', component: HistoryComponent}
    ]
  }
];