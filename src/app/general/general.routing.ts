import { Routes } from "@angular/router";
import { GeneralRootComponent } from './general-root.component';
import { HistoryComponent } from './history/history.component';
import { ToursComponent } from './tours/tours.component';
import { TourComponent } from './service/service.component';
import { VedaComponent } from './veda/veda.component';

export const ROUTES: Routes = [
  {
    path: 'general', component: GeneralRootComponent, children: [
      {path: 'history', component: HistoryComponent},
      {path: 'veda', component: VedaComponent},
      {path: 'tours', component: ToursComponent},
      {path: 'tour/:id_service', component: TourComponent}
    ]
  }
];