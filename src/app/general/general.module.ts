import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HistoryComponent } from "./history/history.component";
import { RouterModule } from "@angular/router";
import { GeneralRootComponent } from './general-root.component';
import { ROUTES } from './general.routing';

@NgModule({
  declarations: [HistoryComponent, GeneralRootComponent],
  imports: [CommonModule, RouterModule.forRoot(ROUTES)],
  exports: [GeneralRootComponent]
})
export class GeneralModule {}
