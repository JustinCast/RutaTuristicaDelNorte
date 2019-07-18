import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddServiceComponent } from "./add-service/add-service.component";
import { SharedModule } from "../shared.module";
import { AdminRootComponent } from "./admin-root.component";
import { RouterModule } from "@angular/router";
import { ROUTES } from "./admin.routing";
import { DropZoneDirective } from "./add-service/dropzone.directive";
import { PickLocationComponent } from "./pick-location/pick-location.component";
import { ShowImagesComponent } from "./add-service/show-images/show-images.component";
import { RatesComponent } from "./rates/rates.component";
import { LoginDialogComponent } from "./login-dialog/login-dialog.component";
import { AUTH_PROVIDERS } from '../services/auth.service';

@NgModule({
  declarations: [
    AddServiceComponent,
    AdminRootComponent,
    DropZoneDirective,
    PickLocationComponent,
    ShowImagesComponent,
    RatesComponent,
    LoginDialogComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule.forRoot(ROUTES)],
  entryComponents: [
    PickLocationComponent,
    ShowImagesComponent,
    RatesComponent,
    LoginDialogComponent
  ],
  providers: [AUTH_PROVIDERS],
  exports: [AdminRootComponent]
})
export class AdminModule {}
