import { Routes } from "@angular/router";
import { GeneralRootComponent } from './general-root.component';
import { HistoryComponent } from './history/history.component';
import { TouristicOfferComponent } from './touristic-offer/touristic-offer.component';
import { TourComponent } from './service/service.component';
import { VedaComponent } from './veda/veda.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';

export const ROUTES: Routes = [
  {
    path: 'general', component: GeneralRootComponent, children: [
      {path: 'history', component: HistoryComponent},
      {path: 'veda', component: VedaComponent},
      {path: 'tours', component: TouristicOfferComponent},
      {path: 'password-recovery', component: PasswordRecoveryComponent},
      {path: 'info', component: ProjectInfoComponent},
      {path: 'tour/:id_service', component: TourComponent}
    ]
  }
];