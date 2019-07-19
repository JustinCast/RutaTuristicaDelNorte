import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HistoryComponent } from "./history/history.component";
import { RouterModule } from "@angular/router";
import { GeneralRootComponent } from "./general-root.component";
import { ROUTES } from "./general.routing";
import { ToursComponent } from "./tours/tours.component";
import { SharedModule } from "../shared.module";
import { TourComponent } from "./service/service.component";
import { SeeLocationComponent } from "./see-location/see-location.component";
import { VedaComponent } from './veda/veda.component';

@NgModule({
  declarations: [
    HistoryComponent,
    GeneralRootComponent,
    ToursComponent,
    TourComponent,
    SeeLocationComponent,
    VedaComponent
  ],
  imports: [CommonModule, RouterModule.forRoot(ROUTES), SharedModule],
  entryComponents: [SeeLocationComponent],
  exports: [GeneralRootComponent]
})
export class GeneralModule {}
