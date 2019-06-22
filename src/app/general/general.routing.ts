import { Routes } from "@angular/router";
import { GeneralRootComponent } from './general-root.component';
import { HistoryComponent } from './history/history.component';
import { ToursComponent } from './tours/tours.component';
import { TourComponent } from './tour/tour.component';

export const ROUTES: Routes = [
  {
    path: 'general', component: GeneralRootComponent, children: [
      {path: 'history', component: HistoryComponent},
      {path: 'tours', component: ToursComponent},
      {path: 'tour/:id', component: TourComponent}
    ]
  }
];