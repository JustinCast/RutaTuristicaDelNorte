import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HistoryComponent } from "./history/history.component";
import { RouterModule } from "@angular/router";
import { GeneralRootComponent } from "./general-root.component";
import { ROUTES } from "./general.routing";
import { TouristicOfferComponent } from "./touristic-offer/touristic-offer.component";
import { SharedModule } from "../shared.module";
import { TourComponent } from "./service/service.component";
import { SeeLocationComponent } from "./see-location/see-location.component";
import { VedaComponent } from "./veda/veda.component";
import { NgxPaginationModule } from "ngx-pagination";
import { ProjectInfoComponent } from './project-info/project-info.component';

@NgModule({
  declarations: [
    HistoryComponent,
    GeneralRootComponent,
    TouristicOfferComponent,
    TourComponent,
    SeeLocationComponent,
    VedaComponent,
    ProjectInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES),
    SharedModule,
    NgxPaginationModule
  ],
  entryComponents: [SeeLocationComponent],
  exports: [GeneralRootComponent]
})
export class GeneralModule {}
