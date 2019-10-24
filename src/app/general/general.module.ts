import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HistoryComponent } from "./history/history.component";
import { RouterModule } from "@angular/router";
import { GeneralRootComponent } from "./general-root.component";
import { ROUTES } from "./general.routing";
import { TouristicOfferComponent } from "./touristic-offer/touristic-offer.component";
import { SharedModule } from "../shared.module";
import { ServiceComponent } from "./service/service.component";
import { SeeLocationComponent } from "./see-location/see-location.component";
import { VedaComponent } from "./veda/veda.component";
import { NgxPaginationModule } from "ngx-pagination";
import { ProjectInfoComponent } from './project-info/project-info.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { AdminModule } from '../admin/admin.module';
import { TourComponent } from './tour/tour.component';

@NgModule({
  declarations: [
    HistoryComponent,
    GeneralRootComponent,
    TouristicOfferComponent,
    ServiceComponent,
    SeeLocationComponent,
    VedaComponent,
    ProjectInfoComponent,
    PasswordRecoveryComponent,
    TourComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES),
    SharedModule,
    NgxPaginationModule,
    AdminModule
  ],
  entryComponents: [SeeLocationComponent],
  exports: [GeneralRootComponent]
})
export class GeneralModule {}
