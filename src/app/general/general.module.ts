import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HistoryComponent } from "./history/history.component";
import { RouterModule } from "@angular/router";
import { GeneralRootComponent } from "./general-root.component";
import { ROUTES } from "./general.routing";
import { ToursComponent } from "./tours/tours.component";
import { SharedModule } from "../shared.module";
import { TourComponent } from './tour/tour.component';

@NgModule({
  declarations: [HistoryComponent, GeneralRootComponent, ToursComponent, TourComponent],
  imports: [CommonModule, RouterModule.forRoot(ROUTES), SharedModule],
  exports: [GeneralRootComponent]
})
export class GeneralModule {}
